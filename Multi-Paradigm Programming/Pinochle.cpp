#include "Pinochle.h"
#include "Enums.h"

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description: 
 * Header file for Pinochle Deck
 * 
 *  - Pinochle Deck enum
 *  - Pinochle Deck overload operators 
 */

/**
 * @brief "shift" operator to insert the rank of a given card into the ostream
 * 
 * @param os 
 * @param rank 
 * @return std::ostream& 
 */
std::ostream &operator<<(std::ostream &os, const PinochleRank &rank) {
    switch (rank) {
        case PinochleRank::nine:
            os << "9";
            break;
        case PinochleRank::jack:
            os << "J";
            break;
        case PinochleRank::queen:
            os << "Q";
            break;
        case PinochleRank::king:
            os << "K";
            break;
        case PinochleRank::ten:
            os << "10";
            break;
        case PinochleRank::ace:
            os << "A";
            break;
        case PinochleRank::undefined:
            os << "?";
            break;
    }
    return os;
}

/**
 * @brief Prefix increment operator to increment the rank of a given card
 * 
 * @param rank 
 * @return PinochleRank& 
 */
PinochleRank &operator++(PinochleRank &rank) {
    switch (rank) {
        case PinochleRank::nine:
            rank = PinochleRank::jack;
            break;
        case PinochleRank::jack:
            rank = PinochleRank::queen;
            break;
        case PinochleRank::queen:
            rank = PinochleRank::king;
            break;
        case PinochleRank::king:
            rank = PinochleRank::ten;
            break;
        case PinochleRank::ten:
            rank = PinochleRank::ace;
            break;
        case PinochleRank::ace:
            rank = PinochleRank::undefined;
            break;
        case PinochleRank::undefined:
            rank = PinochleRank::undefined;
            break;
    }
    return rank;
}

bool convert(PinochleRank& h, std::string s){
    if(!s.compare("9")){
        h = PinochleRank::nine;
        return true;
    }
    else if(!s.compare("10")){
        h = PinochleRank::ten;
        return true;
    }
    else if(!s.compare("J")){
        h = PinochleRank::jack;
        return true;
    }
        else if(!s.compare("Q")){
        h = PinochleRank::queen;
        return true;
    }
        else if(!s.compare("K")){
        h = PinochleRank::king;
        return true;
    }
        else if(!s.compare("A")){
        h = PinochleRank::ace;
        return true;
    }
    else{
        std::cout << "could not convert pinochle" << std::endl;
        return false;
    }

}

/**
 * @brief Construct a new Pinochle Deck:: Pinochle Deck object
 * 
 */
PinochleDeck::PinochleDeck() {

    // created base card to be pushed into vector
    Card<PinochleRank, Suit> cardToInsert = Card<PinochleRank, Suit>(PinochleRank::nine, Suit::clubs);
    do {
        do {
            cardSetVector.push_back(cardToInsert);
            cardSetVector.push_back(cardToInsert);
            ++cardToInsert.suit;
        } while (cardToInsert.suit != Suit::undefined);
        ++cardToInsert.rank;
        cardToInsert.suit = Suit::clubs;
    } while (cardToInsert.rank != PinochleRank::undefined);
}
