#pragma once
#include "T_Deck.h"
#include "Suit.h"
#include "T_Card.h"
#include <iostream>
#include <vector>

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description: 
 * Header file for HoldEm Hold'Em Deck
 * 
 *  - HoldEm Hold'Em enum containing specific ranks
 *  - HoldEm Hold'Em overload operators 
 *  - HoldEm Hold'Em class declaration
 */

// HoldEm ranking enum
enum class HoldEmRank {
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    jack,
    queen,
    king,
    ace,
    undefined
};

// overload operators
std::ostream &operator<<(std::ostream &os, const HoldEmRank &rank);
HoldEmRank &operator++(HoldEmRank &rank);
bool convert(HoldEmRank& h, std::string s);//method to take in a holdemrank obejct by reference and return whether it could be converted or not 

// HoldEmDeck class declaration
class HoldEmDeck : public Deck<HoldEmRank, Suit> {
public:
    HoldEmDeck();
}; 