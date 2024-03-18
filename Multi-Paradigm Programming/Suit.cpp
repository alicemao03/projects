#include "Suit.h"
#include <iostream>

/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/7/23
 *
 * Description: 
 * Source file for Suit
 * 
 *  - Suit definitions for function overloads
 */

/**
 * @brief Inserts the suit of a card onto the ostream
 * 
 * @param os 
 * @param card 
 * @return std::ostream& 
 */
std::ostream &operator<<(std::ostream &os, const Suit &card) {
    switch (card)
    {
    case Suit::clubs:
        os << "C";
        break;
    case Suit::diamonds:
        os << "D";
        break;
    case Suit::hearts:
        os << "H";
        break;
    case Suit::spades:
        os << "S";
        break;
    case Suit::undefined:
        os << "?";
        break;
    }
    return os;
}

/**
 * @brief Prefix increment operator to increment the suit of a given card
 * 
 * @param card 
 * @return Suit& 
 */
Suit &operator++(Suit &card) {
    switch (card) {
        case Suit::clubs:
            card = Suit::diamonds;
            break;
        case Suit::diamonds:
            card = Suit::hearts;
            break;
        case Suit::hearts:
            card = Suit::spades;
            break;
        case Suit::spades:
            card = Suit::undefined;
            break;
        case Suit::undefined:
            card = Suit::undefined;
            break;
    }
    return card;
}