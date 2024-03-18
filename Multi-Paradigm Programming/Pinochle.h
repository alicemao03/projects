#pragma once
#include "T_Card.h"
#include "T_Deck.h"
#include "Suit.h"
#include <iostream>
#include <vector>

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description: 
 * Header file for Pinochle
 * 
 *  - Pinochle specific enum containing specific ranks
 *  - Pinochle overload operators 
 *  - Pinochle class declaration
 */

// Pinochle ranking enum
enum class PinochleRank {
    nine,
    jack,
    queen,
    king,
    ten,
    ace,
    undefined
};

// overload operators
std::ostream &operator<<(std::ostream &os, const PinochleRank &rank);
PinochleRank &operator++(PinochleRank &rank);
bool convert(PinochleRank& h, std::string s);

// PinochleDeck class declaration
class PinochleDeck : public Deck<PinochleRank, Suit> {
public:
    PinochleDeck();
}; 