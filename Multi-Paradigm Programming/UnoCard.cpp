#include "UnoCard.h"

/*
 * Authors: Jeevan Sivomohan, Davis Davis, Ryan Wu
 * Date:    12/1/23
 *
 * Description:
 * Source file for Uno type cards
 *
 */

/**
 * @brief Inserts the rank of a card onto the ostream from the UnoRank enum
 * * //zero, one, two, three, four, five, six, seven, eight, nine, skip, reverse, drawtwo, drawfour, wild, blank, and undefined
 * @param os
 * @param card
 * @return std::ostream&
 */
std::ostream &operator<<(std::ostream &os, const UnoRank &card)
{
    switch (card)
    {
    case UnoRank::zero:
        os << "0";
        break;
    case UnoRank::one:
        os << "1";
        break;
    case UnoRank::two:
        os << "2";
        break;
    case UnoRank::three:
        os << "3";
        break;
    case UnoRank::four:
        os << "4";
        break;
    case UnoRank::five:
        os << "5";
        break;
    case UnoRank::six:
        os << "6";
        break;
    case UnoRank::seven:
        os << "7";
        break;
    case UnoRank::eight:
        os << "8";
        break;
    case UnoRank::nine:
        os << "9";
        break;
    case UnoRank::skip:
        os << "skip";
        break;
    case UnoRank::reverse:
        os << "reverse";
        break;
    case UnoRank::drawtwo:
        os << "draw_2";
        break;
    case UnoRank::drawfour:
        os << "draw_4";
        break;
    case UnoRank::wild:
        os << "wild";
        break;
    case UnoRank::blank:
        os << "blank";
        break;
    case UnoRank::undefined:
        os << "undef";
        break;

    default:
        std::cout << "DEFAULT UNO RANK" << std::endl;
        break;
    }
    return os;
}

/**
 * @brief Increments the UnoRank enum
 *
 * @param ur
 * @return UnoRank&
 */
UnoRank &operator++(UnoRank &ur)
{
    switch (ur)
    {
    case UnoRank::zero:
        ur = UnoRank::one;
        break;
    case UnoRank::one:
        ur = UnoRank::two;
        break;
    case UnoRank::two:
        ur = UnoRank::three;
        break;
    case UnoRank::three:
        ur = UnoRank::four;
        break;
    case UnoRank::four:
        ur = UnoRank::five;
        break;
    case UnoRank::five:
        ur = UnoRank::six;
        break;
    case UnoRank::six:
        ur = UnoRank::seven;
        break;
    case UnoRank::seven:
        ur = UnoRank::eight;
        break;
    case UnoRank::eight:
        ur = UnoRank::nine;
        break;
    case UnoRank::nine:
        ur = UnoRank::skip;
        break;
    case UnoRank::skip:
        ur = UnoRank::reverse;
        break;
    case UnoRank::reverse:
        ur = UnoRank::drawtwo;
        break;
    case UnoRank::drawtwo:
        ur = UnoRank::drawfour;
        break;
    case UnoRank::drawfour:
        ur = UnoRank::wild;
        break;
    case UnoRank::wild:
        ur = UnoRank::blank;
        break;
    case UnoRank::blank:
        ur = UnoRank::undefined;
        break;
    case UnoRank::undefined:
        break;

    default:
        std::cout << "DEFAULT RANK++" << std::endl;
        break;
    }
    return ur;
}

/**
 * @brief Inserts the color of a card onto the ostream from the UnoColor enum
 *
 * @param os
 * @param card
 * @return std::ostream&
 */
std::ostream &operator<<(std::ostream &os, const UnoColor &card)
{
    switch (card)
    {
    case UnoColor::red:
        os << "RED";
        break;
    case UnoColor::blue:
        os << "BLU";
        break;
    case UnoColor::green:
        os << "GRE";
        break;
    case UnoColor::yellow:
        os << "YEL";
        break;
    case UnoColor::black:
        os << "BLK";
        break;
    case UnoColor::undefined:
        os << "UND";
        break;

    default:
        std::cout << "default unocolor <<" << std::endl;
        break;
    }
    return os;
}

UnoColor &operator++(UnoColor &uc)
{
    switch (uc)
    {
    case UnoColor::red:
        uc = UnoColor::blue;
        break;
    case UnoColor::blue:
        uc = UnoColor::green;
        break;
    case UnoColor::green:
        uc = UnoColor::yellow;
        break;
    case UnoColor::yellow:
        uc = UnoColor::black;
        break;
    case UnoColor::black:
        uc = UnoColor::undefined;
        break;
    case UnoColor::undefined:
        break;

    default:
        std::cout << "default unocolor <<" << std::endl;
        break;
    }
    return uc;
}
// zero, one, two, three, four, five, six, seven, eight, nine, skip, reverse, drawtwo, drawfour, wild, blank, and undefined
bool convert(UnoRank &h, std::string s)
{
    if (!s.compare("0"))
    {
        h = UnoRank::zero;
        return true;
    }
    else if (!s.compare("1"))
    {
        h = UnoRank::one;
        return true;
    }
    else if (!s.compare("2"))
    {
        h = UnoRank::two;
        return true;
    }
    else if (!s.compare("3"))
    {
        h = UnoRank::three;
        return true;
    }
    else if (!s.compare("4"))
    {
        h = UnoRank::four;
        return true;
    }
    else if (!s.compare("5"))
    {
        h = UnoRank::five;
        return true;
    }
    else if (!s.compare("6"))
    {
        h = UnoRank::six;
        return true;
    }
    else if (!s.compare("7"))
    {
        h = UnoRank::seven;
        return true;
    }
    else if (!s.compare("8"))
    {
        h = UnoRank::eight;
        return true;
    }
    else if (!s.compare("9"))
    {
        h = UnoRank::nine;
        return true;
    }
    else if (!s.compare("skip"))
    {
        h = UnoRank::skip;
        return true;
    }
    else if (!s.compare("reverse"))
    {
        h = UnoRank::reverse;
        return true;
    }
    else if (!s.compare("draw_2"))
    {
        h = UnoRank::drawtwo;
        return true;
    }
    else if (!s.compare("draw_4"))
    {
        h = UnoRank::drawfour;
        return true;
    }
    else if (!s.compare("wild"))
    {
        h = UnoRank::wild;
        return true;
    }
    else if (!s.compare("blank"))
    {
        h = UnoRank::blank;
        return true;
    }
    else
    {
        std::cout << "could not convert Uno" << std::endl;  //TODO : I want to take this out 
        return false;
    }
}

/**
 * @brief UnoDeck constructor. Creates a deck of UnoCards
 * * 112 total cards
 * * one red, one blue, one green, and one yellow card of rank zero
 * * two red, two blue, two green, and two yellow cards of rank one through nine
 * * four black cards for drawfour through blank
 */
UnoDeck::UnoDeck()
{
    // one red, one blue, one green, and one yellow card of rank zero
    for (UnoColor c = UnoColor::red; c != UnoColor::black; ++c)
    {
        cardSetVector.push_back(Card<UnoRank, UnoColor>(UnoRank::zero, c));
    }

    // two red, two blue, two green, and two yellow cards of rank one through nine
    for (UnoColor c = UnoColor::red; c != UnoColor::black; ++c)
    {
        for (UnoRank r = UnoRank::one; r != UnoRank::drawfour; ++r)
        {
            cardSetVector.push_back(Card<UnoRank, UnoColor>(r, c));
            cardSetVector.push_back(Card<UnoRank, UnoColor>(r, c));
        }
    }

    // four black cards for drawfour through blank
    for (UnoRank r = UnoRank::drawfour; r != UnoRank::undefined; ++r)
    {
        cardSetVector.push_back(Card<UnoRank, UnoColor>(r, UnoColor::black));
        cardSetVector.push_back(Card<UnoRank, UnoColor>(r, UnoColor::black));
        cardSetVector.push_back(Card<UnoRank, UnoColor>(r, UnoColor::black));
        cardSetVector.push_back(Card<UnoRank, UnoColor>(r, UnoColor::black));
    }
}