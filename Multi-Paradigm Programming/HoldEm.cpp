#include "HoldEm.h"
#include "Enums.h"

/*
 * Authors: Davis Davis, Jeevan Sivamohan, Ryan Wu
 * Date:    10/25/23
 *
 * Description:
 * Source file for HoldEm Hold'Em Deck
 *
 *  - HoldEm Hold'Em Deck print function
 *  - HoldEm Hold'Em Deck overload operators
 */

/**
 * @brief "shift" operator to insert the rank of a given card into the ostream
 *
 * @param os
 * @param rank
 * @return std::ostream&
 */
std::ostream &operator<<(std::ostream &os, const HoldEmRank &rank)
{
    switch (rank)
    {
    case HoldEmRank::two:
        os << "2";
        break;
    case HoldEmRank::three:
        os << "3";
        break;
    case HoldEmRank::four:
        os << "4";
        break;
    case HoldEmRank::five:
        os << "5";
        break;
    case HoldEmRank::six:
        os << "6";
        break;
    case HoldEmRank::seven:
        os << "7";
        break;
    case HoldEmRank::eight:
        os << "8";
        break;
    case HoldEmRank::nine:
        os << "9";
        break;
    case HoldEmRank::ten:
        os << "10";
        break;
    case HoldEmRank::jack:
        os << "J";
        break;
    case HoldEmRank::queen:
        os << "Q";
        break;
    case HoldEmRank::king:
        os << "K";
        break;
    case HoldEmRank::ace:
        os << "A";
        break;
    case HoldEmRank::undefined:
        os << "?";
        break;
    }
    return os;
}

/**
 * @brief Prefix increment operator to increment the rank of a given card
 *
 * @param rank
 * @return HoldEmRank&
 */
HoldEmRank &operator++(HoldEmRank &rank)
{
    switch (rank)
    {
    case HoldEmRank::two:
        rank = HoldEmRank::three;
        break;
    case HoldEmRank::three:
        rank = HoldEmRank::four;
        break;
    case HoldEmRank::four:
        rank = HoldEmRank::five;
        break;
    case HoldEmRank::five:
        rank = HoldEmRank::six;
        break;
    case HoldEmRank::six:
        rank = HoldEmRank::seven;
        break;
    case HoldEmRank::seven:
        rank = HoldEmRank::eight;
        break;
    case HoldEmRank::eight:
        rank = HoldEmRank::nine;
        break;
    case HoldEmRank::nine:
        rank = HoldEmRank::ten;
        break;
    case HoldEmRank::ten:
        rank = HoldEmRank::jack;
        break;
    case HoldEmRank::jack:
        rank = HoldEmRank::queen;
        break;
    case HoldEmRank::queen:
        rank = HoldEmRank::king;
        break;
    case HoldEmRank::king:
        rank = HoldEmRank::ace;
        break;
    case HoldEmRank::ace:
        rank = HoldEmRank::undefined;
        break;
    case HoldEmRank::undefined:
        rank = HoldEmRank::undefined;
        break;
    }
    return rank;
}

bool convert(HoldEmRank &h, std::string s)
{
    if (!s.compare("2"))
    {
        h = HoldEmRank::two;
        return true;
    }
    else if (!s.compare("3"))
    {
        h = HoldEmRank::three;
        return true;
    }
    else if (!s.compare("4"))
    {
        h = HoldEmRank::four;
        return true;
    }
    else if (!s.compare("5"))
    {
        h = HoldEmRank::five;
        return true;
    }
    else if (!s.compare("6"))
    {
        h = HoldEmRank::six;
        return true;
    }
    else if (!s.compare("7"))
    {
        h = HoldEmRank::seven;
        return true;
    }
    else if (!s.compare("8"))
    {
        h = HoldEmRank::eight;
        return true;
    }
    else if (!s.compare("9"))
    {
        h = HoldEmRank::nine;
        return true;
    }
    else if (!s.compare("10"))
    {
        h = HoldEmRank::ten;
        return true;
    }
    else if (!s.compare("J"))
    {
        h = HoldEmRank::jack;
        return true;
    }
    else if (!s.compare("Q"))
    {
        h = HoldEmRank::queen;
        return true;
    }
    else if (!s.compare("K"))
    {
        h = HoldEmRank::king;
        return true;
    }
    else if (!s.compare("A"))
    {
        h = HoldEmRank::ace;
        return true;
    }
    else
    {
        std::cout << "could not convert holdem" << std::endl; //TODO: do we want this here??? I like the program without it
        return false;
    }
}

/**
 * @brief Construct a new HoldEm Deck::HoldEm Deck object.
 *
 */
HoldEmDeck::HoldEmDeck()
{
    Card<HoldEmRank, Suit> cardToInsert = Card<HoldEmRank, Suit>(HoldEmRank::two, Suit::clubs);
    do
    {
        do
        {
            cardSetVector.push_back(cardToInsert);
            ++cardToInsert.suit;
        } while (cardToInsert.suit != Suit::undefined);
        ++cardToInsert.rank;
        cardToInsert.suit = Suit::clubs;
    } while (cardToInsert.rank != HoldEmRank::undefined);
}