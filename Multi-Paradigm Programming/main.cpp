#include <iostream>
#include <memory>
#include <string>
#include "Enums.h"
#include "PinochleGame.h"
#include "HoldEmGame.h"
#include "UnoCard.h"
#include "T_GoFishGame.h"

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description:
 *  - Runs Pinochle or Texas Hold Em depending on the user's input
 */

// Create game shared ptr based on the input
std::shared_ptr<Game> create(int argc, const char *argv[])
{
    // TODO: set default as nullptr?
    std::shared_ptr<Game> gamePtr = nullptr;

    if (std::string(argv[GAME_NAME_STRING]) == "Pinochle")
    {
        gamePtr = std::make_shared<PinochleGame>(argc, argv);
    }
    else if (std::string(argv[GAME_NAME_STRING]) == "GoFish")
    {
        if (std::string(argv[DECK_TYPE_STRING]) == "HoldEm")
        {
            try
            {
                // TODO START TESTING change back constructor to not take deck as parameter, just doing this to get a concrete implementation defined on the custom testing deck
                // TODO change message when its only two players: who do you want to fish from not needed
                // TODO end game prematurely
                // TODO when a hand is empty the player must GO FISH on their turn. if no cards left, they are out of the game
                HoldEmDeck test_deck;
                test_deck.cardSetVector.clear();
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::clubs));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::diamonds));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::spades));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::clubs));

                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::diamonds));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::clubs));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::diamonds));

                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::spades));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::clubs));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::diamonds));
                test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::spades));

                // fill in the rest of the cards
                Card<HoldEmRank, Suit> cardToInsert = Card<HoldEmRank, Suit>(HoldEmRank::two, Suit::clubs);
                // do
                // {
                //     do
                //     {
                //         if(std::find_if(test_deck.cardSetVector.begin(), test_deck.cardSetVector.end(), [cardToInsert](Card<HoldEmRank, Suit> c){return c.rank == cardToInsert.rank && c.suit==cardToInsert.suit;}) == test_deck.cardSetVector.end()){
                //            test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(),cardToInsert);
                //         }

                //         ++cardToInsert.suit;
                //     } while (cardToInsert.suit != Suit::undefined);
                //     ++cardToInsert.rank;
                //     cardToInsert.suit = Suit::clubs;
                // } while (cardToInsert.rank != HoldEmRank::undefined);
                gamePtr = std::make_shared<GoFishGame<HoldEmRank, Suit, HoldEmDeck>>(GoFishGame<HoldEmRank, Suit, HoldEmDeck>(argc, argv, test_deck));
                // TODO END TESTING
            }
            catch (std::exception &e)
            {
                std::cerr << e.what() << std::endl;
            }
        }
        else if (std::string(argv[DECK_TYPE_STRING]) == "Pinochle")
        {
            try
            {
                // TODO START TESTING change back constructor to not take deck as parameter, just doing this to get a concrete implementation defined on the custom testing deck
                PinochleDeck test_deck;
                test_deck.cardSetVector.clear();
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::clubs));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::diamonds));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::spades));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::clubs));

                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::diamonds));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::spades));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::clubs));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::hearts));

                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::diamonds));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::spades));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::clubs));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::spades));

                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::clubs));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::hearts));
                test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::diamonds));

                // Card<PinochleRank, Suit> cardToInsert = Card<PinochleRank, Suit>(PinochleRank::nine, Suit::clubs);
                // do
                // {
                //     do
                //     {
                //         if (std::find_if(test_deck.cardSetVector.begin(), test_deck.cardSetVector.end(), [cardToInsert](Card<PinochleRank, Suit> c)
                //                          { return c.rank == cardToInsert.rank && c.suit == cardToInsert.suit; }) == test_deck.cardSetVector.end())
                //         {
                //             test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), cardToInsert);
                //             test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), cardToInsert);
                //         }
                //         ++cardToInsert.suit;
                //     } while (cardToInsert.suit != Suit::undefined);
                //     ++cardToInsert.rank;
                //     cardToInsert.suit = Suit::clubs;
                // } while (cardToInsert.rank != PinochleRank::undefined);

                gamePtr = std::make_shared<GoFishGame<PinochleRank, Suit, PinochleDeck>>(GoFishGame<PinochleRank, Suit, PinochleDeck>(argc, argv, test_deck));
                // TODO END TESTING
            }
            catch (const std::exception &e)
            {
                std::cerr << e.what() << '\n';
            }
        }
        else if (std::string(argv[DECK_TYPE_STRING]) == "Uno")
        {
            try
            {
                // TODO START TESTING change back constructor to not take deck as parameter, just doing this to get a concrete implementation defined on the custom testing deck
                UnoDeck test_deck;
                test_deck.cardSetVector.clear();


                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::blue));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::green));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::green));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::one, UnoColor::red));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::red));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::blue));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::green));

                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::one, UnoColor::blue));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::one, UnoColor::green));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::four, UnoColor::red));
                test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::four, UnoColor::blue));

                test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::eight, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::nine, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::two, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::three, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::four, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::five, UnoColor::yellow));
                test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::six, UnoColor::yellow));

                // test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::wild, UnoColor::black));
                // test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::skip, UnoColor::black));
                // test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::reverse, UnoColor::black));
                // test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::two, UnoColor::black));
                // test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::one, UnoColor::black));
                // test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::five, UnoColor::black));
                // test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::three, UnoColor::black));

                // for (UnoColor c = UnoColor::red; c != UnoColor::black; ++c)
                // {
                //     if (std::find_if(test_deck.cardSetVector.begin(), test_deck.cardSetVector.end(), [c](Card<UnoRank, UnoColor> cl)
                //                      { return cl.rank == UnoRank::zero && cl.suit == c; }) == test_deck.cardSetVector.end())
                //     {
                //         test_deck.cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::zero, c));
                //     }
                // }

                // // two red, two blue, two green, and two yellow cards of rank one through nine
                // for (UnoColor c = UnoColor::red; c != UnoColor::black; ++c)
                // {
                //     for (UnoRank r = UnoRank::one; r != UnoRank::drawfour; ++r)
                //     {
                //         if (std::find_if(test_deck.cardSetVector.begin(), test_deck.cardSetVector.end(), [c, r](Card<UnoRank, UnoColor> cl)
                //                          { return cl.rank == r && cl.suit == c; }) == test_deck.cardSetVector.end())
                //         {
                //             test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), Card<UnoRank, UnoColor>(r, c));
                //             test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), Card<UnoRank, UnoColor>(r, c));
                //         }
                //     }
                // }

                // // four black cards for drawfour through blank
                // for (UnoRank r = UnoRank::drawfour; r != UnoRank::undefined; ++r)
                // {
                //     test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), Card<UnoRank, UnoColor>(r, UnoColor::black));
                //     test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), Card<UnoRank, UnoColor>(r, UnoColor::black));
                //     test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), Card<UnoRank, UnoColor>(r, UnoColor::black));
                //     test_deck.cardSetVector.insert(test_deck.cardSetVector.begin(), Card<UnoRank, UnoColor>(r, UnoColor::black));
                // }

                gamePtr = std::make_shared<GoFishGame<UnoRank, UnoColor, UnoDeck>>(GoFishGame<UnoRank, UnoColor, UnoDeck>(argc, argv, test_deck));
                // TODO END TESTING
            }
            catch (const std::exception &e)
            {
                std::cerr << e.what() << '\n';
            }
        }
    }
    else
    {
        gamePtr = std::make_shared<HoldEmGame>(HoldEmGame(argc, argv));
    }

    return gamePtr;
}

std::string usage_error_message =
    "Usage: ./lab3 <game_name> [Deck type (for GoFish)] <player1, player2,...,playern>\n" // TODO in real branch change lab1 to lab3
    "game_name \"Pinochle\" requires exactly 4 players\n"
    "game_name \"HoldEm\" requires 2-9 players\n"
    "game_name \"GoFish\" requires 2-5 players";

int main(int argc, const char *argv[])
{
    if (argc < PLAYER_LIST_START_INDEX)
    {
        std::cout << usage_error_message << std::endl;
        return INVALID_ARGS;
    }

    if (std::string(argv[GAME_NAME_STRING]) == "Pinochle")
    {
        if (argc - PLAYER_LIST_START_INDEX == PINOCHLE_PLAYERS)
        {
            std::shared_ptr<Game> gamePointer = create(argc, argv);
            if (gamePointer != nullptr)
            {
                return gamePointer->play();
            }
            else
            {
                std::cout << "FAILED TO CREATE SHARED POINTER" << std::endl;
                return FAILED_TO_CREATE_SHARED_POINTER;
            }
        }
        else
        {
            std::cout << "Incorrect numer of players for Pinochle game" << std::endl;
            std::cout << usage_error_message << std::endl;
            return NOT_ENOGUH_PLAYERS;
        }
    }
    else if (std::string(argv[GAME_NAME_STRING]) == "HoldEm")
    {
        if (argc - PLAYER_LIST_START_INDEX >= HOLDEM_MIN_PLAYERS && argc - PLAYER_LIST_START_INDEX <= HOLDEM_MAX_PLAYERS)
        {
            std::shared_ptr<Game> gamePointer = create(argc, argv);
            if (gamePointer != nullptr)
            {
                return gamePointer->play();
            }
            else
            {
                std::cout << "Error: failed to create shared pointer, restart game" << std::endl;
                std::cout << usage_error_message << std::endl;
                return FAILED_TO_CREATE_SHARED_POINTER;
            }
        }
        else
        {
            std::cout << "Not Enough Players" << std::endl;
            std::cout << usage_error_message << std::endl;
            return NOT_ENOGUH_PLAYERS;
        }
    }
    else if (std::string(argv[GAME_NAME_STRING]) == "GoFish")
    {
        if ((argc - GOFISH_PLAYER_LIST_START_INDEX >= GOFISH_MIN_PLAYERS) && (argc - GOFISH_PLAYER_LIST_START_INDEX <= GOFISH_MAX_PLAYERS))
        {
            std::shared_ptr<Game> gamePointer = create(argc, argv);
            if (gamePointer != nullptr)
            {
                // TODO: DEBUG
                return gamePointer->play();
            }
            else
            {
                std::cout << "Error: failed to create shared pointer, restart game" << std::endl;
                std::cout << usage_error_message << std::endl;
                return FAILED_TO_CREATE_SHARED_POINTER;
            }
        }
        else
        {
            std::cout << "Bad Number of players" << std::endl;
            std::cout << usage_error_message << std::endl;
            return NOT_ENOGUH_PLAYERS;
        }
    }
    else
    {
        std::cout << "WRONG GAME NAME" << std::endl;
        std::cout << usage_error_message << std::endl;
        std::cout << argv[GAME_NAME_STRING];
        return WRONG_NAME;
    }

    return SUCCESS;
}