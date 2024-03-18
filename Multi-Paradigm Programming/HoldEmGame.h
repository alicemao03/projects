#pragma once
#include <vector>
#include <map>
#include "A_Game.h"
#include "HoldEm.h"
/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description: 
 * Header file for HoldEm Game
 * 
 */

enum class HoldEmState {
    preflop,
    flop,
    turn,
    river,
    undefined
};

enum class HoldEmHandRank {
    xhigh = 0, 
    pair, 
    twopair, 
    threeofakind, 
    straight, 
    flush, 
    fullhouse, 
    fourofakind, 
    straightflush,
    undefined
};

class HoldEmGame : public Game 
{
public:
    HoldEmGame(int argc, const char *argv[]);
    virtual int play();

    struct HoldEmGameStruct 
    {
        CardSet<HoldEmRank, Suit> cardSetHand;
        std::string name;
        HoldEmHandRank structRank;
        HoldEmGameStruct(const CardSet<HoldEmRank, Suit> &cardSetHand_, const std::string &name_, HoldEmHandRank structRank_);
    };

protected:
    HoldEmState hState;
    HoldEmDeck hDeck;
    std::vector< CardSet<HoldEmRank, Suit> > playerHands;
    CardSet<HoldEmRank, Suit> board;
    virtual void deal();
public:
    HoldEmHandRank holdem_hand_evaluation(CardSet<HoldEmRank, Suit>& hand);
};

std::ostream& operator<<(std::ostream& os, const HoldEmHandRank& rank); 
bool operator<(HoldEmGame::HoldEmGameStruct& lhs, HoldEmGame::HoldEmGameStruct& rhs);

template <typename R, typename S>
bool hasStraight(std::vector < Card <R, S> > cards);

template <typename R, typename S>
bool hasFlush(std::vector < Card <R, S> > cards);

template <typename R, typename S>
bool hasStraightFlush(std::vector < Card <R, S> > cards);

bool hasFourOfAKind(std::map<HoldEmRank, int> cntPerRank);

template <typename R, typename S>
std::map<HoldEmRank, int> countEachRank(std::vector < Card <R, S> >& cards);

bool hasThreeOfAKind(std::map<HoldEmRank, int> cntPerRank);

bool hasTwoPairs(std::map<HoldEmRank, int> cntPerRank);

bool hasPair(std::map<HoldEmRank, int> cntPerRank);

bool hasFullHouse(std::map<HoldEmRank, int> cntPerRank);
