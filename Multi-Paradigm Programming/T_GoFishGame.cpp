#pragma once
#include "T_GoFishGame.h"
#include "Enums.h"
#include <sstream>
#include <iostream>
#include <string>

/**
 * @brief Construct a new Go Fish Game< R, S, D>:: Go Fish Game object
 * * checks if fDeck <D> is valid deck, throwing error if not
 *
 * @tparam R
 * @tparam S
 * @tparam D
 * @param num_players
 * @param names
 */
template <typename R, typename S, typename D>
GoFishGame<R, S, D>::GoFishGame(int argc, const char *argv[], D deck) : Game(argc, argv)
{
    // TODO START TESTING changing the deck to be custom set
    //  for (typename std::vector<Card<R,S>>::const_iterator it = fDeck.getBegin(); it != fDeck.getEnd(); ++it){
    //      if (std::count_if(fDeck.getBegin(), fDeck.getEnd(), [it](Card<R,S> cardToCheck) {return cardToCheck.rank == (*it).rank;}) < CARDS_PER_BOOK){
    //          throw std::runtime_error("Invalid deck");
    //      }
    //  }
    fDeck = deck;
    // TODO END TESTING
    //  TODO: FIX UNO DECK
    //  TODO: DEBUG show deck
    for (typename std::vector<Card<R, S>>::const_iterator it = fDeck.getBegin(); it != fDeck.getEnd(); ++it)
    {
        std::cout << *it << std::endl;
    }
    // TODO: END DEBUG
    // IF VALID DECK
    for (int it = GOFISH_PLAYER_LIST_START_INDEX; it < argc; ++it)
    {
        p_hands.emplace_back(CardSet<R, S>());
        p_books.emplace_back(CardSet<R, S>());
    }

    // adjust for player list start index
    playerNames.erase(playerNames.begin(), playerNames.begin() + START_IT_ONE);
}

/**
 * @brief Checks if 4 of a kind (rank) exists in player's hand and moves them to player's book
 *
 * @tparam R
 * @tparam S
 * @tparam D
 * @param player
 * @return true
 * @return false
 */
template <typename R, typename S, typename D>
bool GoFishGame<R, S, D>::collect_books(int player)
{
    for (typename std::vector<Card<R, S>>::const_iterator it = p_hands.at(player).getBegin(); it != p_hands.at(player).getEnd(); ++it)
    {
        R ur = (*it).rank;
        int count = std::count_if(p_hands.at(player).getBegin(), p_hands.at(player).getEnd(), [ur](Card<R, S> x)
                                  { return x.rank == ur; });
        if (count >= FOUR_OF_A_KIND)
        {
            // int count_cards = 0;
            std::function<bool(const Card<R, S> &)> predicate = [ur, count_cards=0](Card<R, S> x) mutable
            { 
                if(x.rank == ur && count_cards < FOUR_OF_A_KIND){
                    count_cards++;
                    return true;
                }
                return false; 
            };
            p_books.at(player).collect_if(p_hands.at(player), predicate, count, *it);
            return true;
        }
    }
    

    return false;
}

/**
 * @brief Implements turns for each player
 * * if player is eliminated, skip turn
 * * prints out player's hand and books
 * * prompts player for rank and player to ask
 * * requests card from player
 * * if successful request, collect books
 *
 * @tparam R
 * @tparam S
 * @tparam D
 * @param playerNumber
 * @return true successfully finds card requested either from player or from deck
 * @return false does not find card
 */
template <typename R, typename S, typename D>
bool GoFishGame<R, S, D>::turn(int playerNumber)
{

    if (std::count(eliminated_players.begin(), eliminated_players.end(), playerNumber) > CMP_ZERO)
    {
        return false;
    }

    // PRINTS PLAYER HAND AND BOOKS (WITH CASES)
    for (typename std::vector<CardSet<R, S>>::iterator it = p_hands.begin(); it != p_hands.end(); ++it)
    {
        std::cout << "-----------------------------------" << std::endl;
        std::cout << "Player " << playerNames.at(it - p_hands.begin()) << std::endl;
        std::cout << "Hand: ";
        if (count(eliminated_players.begin(), eliminated_players.end(), it - p_hands.begin()) > CMP_ZERO)
        {
            std::cout << "ELIMINATED" << std::endl;
            continue;
        }
        else
        {
            (*it).print(std::cout, p_hands.at(it - p_hands.begin()).get_size());
        }
        if (p_books.at(it - p_hands.begin()).get_size() > CMP_ZERO)
        {
            std::cout << "Books: ";
            p_books.at(it - p_hands.begin()).print(std::cout, p_books.at(it - p_hands.begin()).get_size());
        }
        else
        {
            std::cout << "None" << std::endl;
        }
    }
    // then prompt to ask card rank and which player to ask
    std::cout << "-----------------------------------" << std::endl;
    std::cout << "Player " << playerNames.at(playerNumber) << " turn:" << std::endl;
    R inputRank; // TODO: may have to just check string
    std::string strInputRank;
    std::string strInputPlayer;
    int mappedPlayerNumber = DEFAULT_MAPPED_VALUE; // set default to an invalid index
    bool requestResult = false;
    size_t handSize = p_hands.at(playerNumber).get_size();
    do
    {
        if (handSize == CMP_ZERO)
        {
            break;
        }

        std::cout << "Which player would you like to fish from?" << std::endl;
        std::cin >> strInputPlayer;
        // Check if the entered player entered is valid
        for (size_t it = START_IT_ZERO; it < playerNames.size(); ++it)
        {
            if ((playerNames.at(it) == strInputPlayer) && (it != playerNumber))
            { // TODO: size_t vs int cmp
                if (std::count(eliminated_players.begin(), eliminated_players.end(), it) > CMP_ZERO)
                {
                    continue;
                }
                else 
                {
                    mappedPlayerNumber = it;
                break;
                }
            }
        }
        if (mappedPlayerNumber == DEFAULT_MAPPED_VALUE)
        {
            std::cout << "Invalid player. Please enter a valid player." << std::endl;
            continue;
        }
        else
        {
            // valid player, break out of the loop
            break;
        }
    } while (true);

    do
    {
        if (handSize == 0)
        {
            break;
        }
        std::cout << "What rank would you like to fish for? (enter rank)" << std::endl;
        std::cin >> strInputRank;
        if (!convert(inputRank, strInputRank))
        {
            std::cout << "Invalid input, not a rank!" << std::endl;
            continue;
        }

        // Check if the entered rank is valid
        int countValidRank = std::count_if(
            p_hands.at(playerNumber).getBegin(),
            p_hands.at(playerNumber).getEnd(),
            [inputRank](Card<R, S> x)
            { return x.rank == inputRank; });
        if (countValidRank > CMP_ZERO)
        {
            // Valid rank, break out of the loop
            break;
        }
        else
        {
            std::cout << "Invalid rank! Please enter a valid rank from your hand." << std::endl;
        }
    } while (true);

    // request
    if (handSize > 0)
    {
        requestResult = p_hands.at(playerNumber).request(p_hands.at(mappedPlayerNumber), inputRank);
    }
    else
    {
        requestResult = false;
    }

    if (requestResult)
    {
        
        std::copy(p_hands.at(playerNumber).getBegin(), p_hands.at(playerNumber).getEnd(), std::ostream_iterator<Card<R, S>>(std::cout, " "));
        std::cout << std::endl;
        std::cout << "===Player " << playerNames.at(playerNumber) << " fished a " << inputRank << " from Player " << playerNames.at(mappedPlayerNumber) << "===" << std::endl;
        while (collect_books(playerNumber))
        {
        }
        return true;
    }
    // go fish
    else
    {
        try
        {
            fDeck >> p_hands.at(playerNumber);
            // TODO: Debug going fish
            std::cout << "Going fishing!" << std::endl;
            // TODO: Debug card found
            if (handSize != 0)
            {
                R foundRank = R::undefined;
                auto it = p_hands.at(playerNumber).getBegin();
                while (true)
                {
                    if (++it == p_hands.at(playerNumber).getEnd())
                    {
                        foundRank = (*(--it)).rank;
                        break;
                    }
                }
                if (foundRank == inputRank)
                {
                
                while (collect_books(playerNumber))
                {
        
                }
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        catch (std::runtime_error &e)
        {
    
            std::cout << "Player " << playerNames.at(playerNumber) << " has been ELIMINATED!" << std::endl;
            eliminated_players.emplace_back(playerNumber);
    
            if (handSize != 0)
            {
                fDeck.collect(p_hands.at(playerNumber));
    
            }
            return false;
        }
        // UNCAUGHT CASE RETURNS FALSE FOR TURN
        return false;
    }
}

/**
 * @brief Deal cards to players depending on the number of players for GoFishGame
 *
 * @tparam R
 * @tparam S
 * @tparam D
 */
template <typename R, typename S, typename D>
void GoFishGame<R, S, D>::deal()
{
    if (p_hands.size() < 2)
    {
        throw std::runtime_error("Not enough players");
    }
    else
    {
        typename std::vector<CardSet<R, S>>::iterator itToHand = p_hands.begin();
        int numberToDeal;
        // deal seven cards to two players
        if (p_hands.size() == 2)
        {
            numberToDeal = DEAL_SEVEN;
        }
        // deal five cards to > 2 players
        else if (p_hands.size() > 2)
        {
            numberToDeal = DEAL_FIVE;
        }
        for (; itToHand != p_hands.end(); ++itToHand)
        {
            for (int i = START_IT_ZERO; i < numberToDeal; ++i)
            {
                fDeck >> *itToHand;
            }
        }
    }
}

/**
 * @brief Method that plays the game
 *
 * @tparam R
 * @tparam S
 * @tparam D
 * @return int
 */
template <typename R, typename S, typename D>
int GoFishGame<R, S, D>::play()
{

    try
    {
        deal();
    }
    catch (std::runtime_error &e)
    {
        std::cerr << e.what() << std::endl;
        return NOT_ENOGUH_PLAYERS;
    }
    // *****************************************
    // SUCCESSFULLY DEAL
    // *****************************************
    // reset eliminated players vector
    eliminated_players.clear();




    // collect_books for all players
    for (size_t p_number = START_IT_ZERO; p_number < p_hands.size(); ++p_number)
    {
       
        while (collect_books(p_number))
        {
    
        }
    }

    // playing rounds
    bool playRound = true;
    int roundsPlayed = START_IT_ZERO;
   
    while (playRound)
    {
       
        roundsPlayed++;
        // call turn until false on each player
        for (size_t p_number = START_IT_ZERO; p_number < p_hands.size(); ++p_number)
        {
            // CHECKING END OF GAME CONDITIONS
            // one or zero players left before each turn
            // std::cout << "DEBUG: eliminated_players.size()" << eliminated_players.size() << " | p_hands.size()" << p_hands.size() << std::endl;
            if ((eliminated_players.size() == p_hands.size()) || (eliminated_players.size() + ADJUST_INDEX_BY_ONE == p_hands.size()))
            {
                playRound = false;
                break;
            }
            else
            {
                std::cout << "-----GAME CONTINUES-----" << std::endl;
                while (turn(p_number))
                {
                }
            }
            

        }

        // END OF ROUND PROCEDURES
        // print each player's book count
        std::cout << "===================================" << std::endl;
        std::cout << "End of round " << roundsPlayed << std::endl;
        for (size_t p_number = START_IT_ZERO; p_number < p_books.size(); ++p_number)
        {
            std::cout << "Player " << playerNames.at(p_number) << " books: " << p_books.at(p_number).get_size() / CARDS_PER_BOOK << std::endl;
        }

        if (fDeck.is_empty()) 
        {
            for (size_t it = START_IT_ZERO; it < p_hands.size(); ++it)
            {
                if (p_hands.at(it).get_size() > CMP_ZERO)
                {
                    break;
                }
                else
                {
                    playRound = false;
                }
            }
        }
    }

    // END OF GAME PROCEDURES
    // output highest player(s) with highest book count
    std::cout << "===================================" << std::endl;
    std::cout << "Game over!" << std::endl;
    std::cout << "There were " << roundsPlayed << " rounds played." << std::endl;
    std::vector<std::pair<int, int>> playerBookCount;
    size_t maxBookCount = START_IT_ZERO;
    for (size_t it = START_IT_ZERO; it < p_books.size(); ++it)
    {
        if (p_books.at(it).get_size() > maxBookCount)
        {
            maxBookCount = p_books.at(it).get_size();
            playerBookCount.clear();
            playerBookCount.emplace_back(std::make_pair(it, p_books.at(it).get_size()));
        }
        else if (p_books.at(it).get_size() == maxBookCount)
        {
            playerBookCount.emplace_back(std::make_pair(it, p_books.at(it).get_size()));
        }
    }
    
    std::cout << "Player(s) with the most books: " << std::endl;
    for (size_t it = START_IT_ZERO; it < playerBookCount.size(); ++it)
    {
        std::cout << "Player " << playerNames.at(playerBookCount.at(it).first) << ": " << playerBookCount.at(it).second / CARDS_PER_BOOK << " book(s)" << std::endl;
    }
    return INVALID_FISH_PLAY;
}
