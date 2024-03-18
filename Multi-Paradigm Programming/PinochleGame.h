#pragma once
#include <cstddef>
#include <vector>
#include "A_Game.h"
#include "Pinochle.h"
/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/25/23
 *
 * Description: 
 * Header file for Pinochle Game
 * 
 *  - 
 */

enum class PinochleMelds {
    dix = 0,
    offsuitmarriage,
    fortyjacks,
    pinochle,
    insuitmarriage,
    sixtyqueens,
    eightykings,
    hundredaces,
    insuitrun,
    doublepinochle,
    fourhundredjacks,
    sixhundredqueens,
    eighthundredkings,
    thousandaces,
    insuitdoublerun,
    PINOCHLE_MELDS_SIZE
};

class PinochleGame : public Game {
public:
    PinochleGame(int argc, const char* argv[]);
    virtual int play();
    static const std::vector<unsigned int> pointValues;

protected:
    PinochleDeck pDeck;
    std::vector< CardSet<PinochleRank, Suit> > playerHands;
    virtual void deal();
private:
    void suit_independent_evaluation(CardSet<PinochleRank, Suit>& hand, std::vector<PinochleMelds>& melds);
};

std::ostream& operator<<(std::ostream& os, const PinochleMelds& meld);
template <typename R, typename S>
bool uniqueRanksHelper(std::vector < Card <R, S> > cards);

template <typename R, typename S>
void checkAces (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds);

template <typename R, typename S>
void checkKings (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds);

template <typename R, typename S>
void checkQueens (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds);

template <typename R, typename S>
void checkJack (std::vector < Card <R,S> > cards, std::vector <PinochleMelds>& melds);

template <typename R, typename S>
void checkPinochle (std::vector < Card <R,S> > queenCards, std::vector < Card <R,S> > jackCards, std::vector <PinochleMelds>& melds);
