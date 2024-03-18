#include <iostream>
#include "T_Deck.h"
#include "T_Card.h"

/*
 * Authors: Jeevan Sivomohan, Davis Davis, Ryan Wu
 * Date:    12/1/23
 *
 * Description:
 * Header file for Uno type cards
 *
 */

enum class UnoColor
{
    red,
    blue,
    green,
    yellow,
    black,
    undefined
};

enum class UnoRank
{
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    skip,
    reverse,
    drawtwo,
    drawfour,
    wild,
    blank,
    undefined
};

std::ostream &operator<<(std::ostream &os, const UnoRank &card);
UnoRank &operator++(UnoRank &ur);
bool convert(UnoRank &h, std::string s);

std::ostream &operator<<(std::ostream &os, const UnoColor &card);
UnoColor &operator++(UnoColor &uc);

/**
 * @brief Class declaration for UnoDeck derived from Deck parameterized by UnoRank, UnoColor
 *
 */
class UnoDeck : public Deck<UnoRank, UnoColor>
{
public:
    UnoDeck();
};