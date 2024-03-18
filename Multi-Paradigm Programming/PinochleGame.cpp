#include "PinochleGame.h"
#include "Enums.h"
#include "T_Card.h"
#include <string>
#include <array>
#include <iostream>
#include <algorithm>

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description:
 * Source file for Pinochle Game
 *
 *  Contains the PinochleGame Construcotr, deal(), and play()
 */

/**
 * @brief Construct a new Pinochle Game:: Pinochle Game object
 *
 * @param argc
 * @param argv
 */
PinochleGame::PinochleGame(int argc, const char *argv[]) : Game(argc, argv)
{
    CardSet<PinochleRank, Suit> handToPush;
    for (int it = GAME_IT_POS; it < argc; it++)
    {
        playerHands.push_back(handToPush);
    }
}

/**
 * @brief shifts 3 cards to each player until deck is empty
 *
 */
void PinochleGame::deal()
{  
    int it = START_IT_ZERO;

    while (!pDeck.is_empty())
    {
        try
        {
            pDeck >> playerHands[it % playerHands.size()];
            pDeck >> playerHands[it % playerHands.size()];
            pDeck >> playerHands[it % playerHands.size()];
            it++;
        }
        catch (const std::runtime_error &error)
        {
            // If error was thrown while shifting
            throw error;
        }
    }
}

/**
 * @brief Shuffles, deals, and collects the Pinochle cards to players. Returns error enum value if 
 * error is caught
 *
 * @return int
 */

int PinochleGame::play()
{
    std::string response = "";

    while (response != "yes")
    {
        pDeck.shuffle();
        // Try to deal cards, return error enum if error is returned
        try {
            deal();
        }
        catch (const std::runtime_error &error) {
            std::cout << "ERROR: " << error.what() << std::endl;
            return ERROR_DEALING_PLAYER_HAND;
        }

        //*******************************************************
        // SUCCESSFULLY print each player's name, hand, and melds
        //*******************************************************
        for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerNames.size(); ++it) {
            std::cout << playerNames[it] << ": ";
            playerHands[it].print(std::cout, (TOTAL_PINOCHLE_CARDS / playerNames.size()));

            // generate and print melds
            std::cout << "Melds: ";
            std::vector<PinochleMelds> melds;
            suit_independent_evaluation(playerHands[it], melds);
            if (melds.size() == CMP_ZERO) {
                std::cout << "NO MELDS";
            }
            else {
                for (size_t jt = START_IT_ZERO; jt < melds.size(); ++jt) {
                    std::cout << melds[jt];
                }
            }
            std::cout << std::endl;
        }
        std::cout << std::endl;

        //******************************************************************
        // collect each player's hand, return error value if error is thrown
        //******************************************************************
        for (std::vector<std::string>::size_type it = START_IT_ZERO; it < playerNames.size(); ++it) {
            try {
                pDeck.collect(playerHands[it]);
            }
            catch (const std::runtime_error &error) {
                std::cout << "ERROR: " << error.what() << std::endl;
                return ERROR_COLLECTING_PLAYER_HAND;
            }
        }

        std::cout << "Do you want to end the game? (yes/no): ";
        std::cin >> response;
    }

    return SUCCESS;
}

/**
 * @brief point values for each meld
 *
 */
const std::vector<unsigned int> pointValues = {
    10, // dix
    20, // offsuitmarriage
    40, // fortyjacks
    40, // pinochle
    60, // insuitmarriage
    60, // sixtyqueens
    80, // eightykings
    100, // hundredaces
    150, // insuitrun
    300, // doublepinochle
    400, // fourhundredjacks
    600, // sixhundredqueens
    800, // eighthundredkings
    1000, // thousandaces
    1500 // insuitdoublerun
};

/**
 * @brief insertion operator overload for PinochleMelds
 * 
 * @param os 
 * @param meld 
 * @return std::ostream& 
 */
std::ostream& operator<<(std::ostream& os, const PinochleMelds& meld) {
    const unsigned int meld_index = static_cast<unsigned int>(meld);
    switch (meld) {
        case PinochleMelds::dix:
            os << "dix " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::offsuitmarriage:
            os << "offsuitmarriage " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::fortyjacks:
            os << "fortyjacks " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::pinochle:
            os << "pinochle " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::insuitmarriage:
            os << "insuitmarriage " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::sixtyqueens:
            os << "sixtyqueens " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::eightykings:
            os << "eightykings " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::hundredaces:
            os << "hundredaces " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::insuitrun:
            os << "insuitrun " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::doublepinochle:
            os << "doublepinochle " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::fourhundredjacks:
            os << "fourhundredjacks " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::sixhundredqueens:
            os << "sixhundredqueens " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::eighthundredkings:
            os << "eighthundredkings " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::thousandaces:
            os << "thousandaces " << pointValues.at(meld_index) << " ";
            break;
        case PinochleMelds::insuitdoublerun:
            os << "insuitdoublerun " << pointValues.at(meld_index) << " ";
            break;
        default:
            os << "Unknown Meld" << 0 << " ";
            break;
    }
    return os;
}

/**
 * @brief Checks to see if all cards have unique ranks and are not empty
 * * Uses double for loop because we have a small number of cards
 * 
 * * Helper function for suit_independent_evaluations
 * 
 * @tparam R 
 * @tparam S 
 * @param cards 
 * @param card 
 * @return true if all cards have unique ranks
 * @return false if card ranks not unique AND/OR empty cards
 */
template<typename R, typename S>
bool uniqueRanksHelper(std::vector < Card <R, S> > cards) {
    int diamondCnt = START_IT_ZERO;
    int clubCnt = START_IT_ZERO;
    int heartCnt = START_IT_ZERO;
    int spadeCnt = START_IT_ZERO;
    for (size_t it = CMP_ZERO; it < cards.size(); it++) {
        if (cards[it].suit == Suit::diamonds) {
            diamondCnt++;
        }
        else if (cards[it].suit == Suit::clubs) {
            clubCnt++;
        }
        else if (cards[it].suit == Suit::hearts) {
            heartCnt++;
        }
        else if (cards[it].suit == Suit::spades) {
            spadeCnt++;
        }
    }
    if ((diamondCnt > CMP_ZERO) && (clubCnt > CMP_ZERO) && (heartCnt > CMP_ZERO) && (spadeCnt > CMP_ZERO)) {
        return true;
    }
    else {
        return false;
    }
}


/**
 * @brief Checks for ace related melds
 * 
 * * Helper function for suit_independent_evaluation
 * 
 * @tparam R  
 * @tparam S 
 * @param cards 
 * @param melds 
 */
template <typename R, typename S>
void checkAces (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds) {
    if (cards.size() == THOUSAND_ACES_CARDS) {
        melds.push_back(PinochleMelds::thousandaces);
    }
    else if ((cards.size() >= HUNDRED_ACES_CARDS) && (cards.size() < THOUSAND_ACES_CARDS)) {
        if (uniqueRanksHelper(cards)) {
            melds.push_back(PinochleMelds::hundredaces);
        }
    }
}

/**
 * @brief Checks for king related melds
 * 
 * * Helper function for suit_independent_evaluation
 * 
 * @tparam R 
 * @tparam S 
 * @param cards 
 * @param melds 
 */
template <typename R, typename S>
void checkKings (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds) {
    if (cards.size() == EIGHT_HUNDRED_KINGS_CARDS) {
        melds.push_back(PinochleMelds::eighthundredkings);
    }
    else if ((cards.size() >= EIGHTY_KINGS_CARDS) && (cards.size() < EIGHT_HUNDRED_KINGS_CARDS)) {
        if (uniqueRanksHelper(cards)) {
            melds.push_back(PinochleMelds::eightykings);
        }
    }
}

/**
 * @brief Checks for queen related melds
 * 
 * * Helper function for suit_independent_evaluation
 * 
 * @tparam R 
 * @tparam S 
 * @param cards 
 * @param melds 
 */
template <typename R, typename S>
void checkQueens (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds) {
    if (cards.size() == SIX_HUNDRED_QUEENS_CARDS) {
        melds.push_back(PinochleMelds::sixhundredqueens);
    }
    else if ((cards.size() >= SIXTY_QUEENS_CARDS) && (cards.size() < SIX_HUNDRED_QUEENS_CARDS)) {
        if (uniqueRanksHelper(cards)) {
            melds.push_back(PinochleMelds::sixtyqueens);
        }
    }
}

/**
 * @brief Checks for jack related melds
 * 
 * * Helper function for suit_independent_evaluation
 * 
 * @tparam R 
 * @tparam S 
 * @param cards 
 * @param melds 
 */
template <typename R, typename S>
void checkJacks (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds) {
    if (cards.size() == FOUR_HUNDRED_JACKS_CARDS) {
        melds.push_back(PinochleMelds::fourhundredjacks);
    }
    else if ((cards.size() >= FORTY_JACKS_CARDS) && (cards.size() < FOUR_HUNDRED_JACKS_CARDS)) {
        if (uniqueRanksHelper(cards)) {
            melds.push_back(PinochleMelds::fortyjacks);
        }
    }
}

/**
 * @brief Checks for Pinochle related melds, needs queen vector first then jack vector second
 * 
 * * Helper function for suit_independent_evaluation
 * 
 * @tparam R 
 * @tparam S 
 * @param cards 
 * @param melds 
 */
template <typename R, typename S>
void checkPinochle (std::vector < Card <R,S> > queenCards, std::vector < Card <R,S> > jackCards, std::vector <PinochleMelds>& melds) {
    int queenOfSpadesCnt = START_IT_ZERO;
    for (size_t it = START_IT_ZERO; it < queenCards.size(); it++) {
        if (queenCards[it].suit == Suit::spades) {
            queenOfSpadesCnt++;
        }
    }

    int jackOfDiamondsCnt = START_IT_ZERO;
    for (size_t it = START_IT_ZERO; it < jackCards.size(); it++) {
        if (jackCards[it].suit == Suit::diamonds) {
            jackOfDiamondsCnt++;
        }
    }

    if ((queenOfSpadesCnt == QUEEN_OF_SPADES_CARDS) && (jackOfDiamondsCnt == JACK_OF_DIAMONDS_CARDS)) {
        melds.push_back(PinochleMelds::doublepinochle);
    }
    else if ((queenOfSpadesCnt == PINOCHLE_MELD) && (jackOfDiamondsCnt == PINOCHLE_MELD)) {
        melds.push_back(PinochleMelds::pinochle);
    }

}

/**
 * @brief 
 * 
 * @param hand 
 * @param melds 
 */
void PinochleGame::suit_independent_evaluation(CardSet<PinochleRank, Suit>& hand, std::vector<PinochleMelds>& melds) {
    CardSet<PinochleRank, Suit> localCopy(hand);
    //==================================================================================================
    // ! DEPRECATED getVector() IN LAB3 STEP 7
    // const std::vector < Card < PinochleRank, Suit> > CardSet<PinochleRank, Suit>::*ptrToCardset = CardSet<PinochleRank, Suit>::getVector();
    // std::vector < Card <PinochleRank, Suit> > localVector = localCopy.*(ptrToCardset);
    // ! DEPRECATED getVector() IN LAB3 STEP 7
    //==================================================================================================
    std::vector < Card <PinochleRank, Suit> > localVector;
    for(typename std::vector<Card<PinochleRank, Suit>>::iterator it = hand.getBegin(); it != hand.getEnd(); it++){
        localVector.push_back(*it);
    }

    // ******************************************************
    // Check for Combinations
    // ******************************************************
    
    // vectors for Ace, King, Queen, Jack, rank
    std::vector < Card <PinochleRank, Suit> > acesVector;
    std::vector < Card <PinochleRank, Suit> > kingsVector;
    std::vector < Card <PinochleRank, Suit> > queensVector;
    std::vector < Card <PinochleRank, Suit> > jacksVector;

    for (size_t it = START_IT_ONE; it < localVector.size(); ++it) {
        if (localVector[it].rank == PinochleRank::ace) {
            acesVector.push_back(localVector[it]);
        }
        else if (localVector[it].rank == PinochleRank::king) {
            kingsVector.push_back(localVector[it]);
        }
        else if (localVector[it].rank == PinochleRank::queen) {
            queensVector.push_back(localVector[it]);
        }
        else if (localVector[it].rank == PinochleRank::jack) {
            jacksVector.push_back(localVector[it]);
        }
    }

    // call check combination helpers
    checkAces(acesVector, melds);
    checkKings(kingsVector, melds);
    checkQueens(queensVector, melds);
    checkJacks(jacksVector, melds);
    checkPinochle(queensVector, jacksVector, melds);


}