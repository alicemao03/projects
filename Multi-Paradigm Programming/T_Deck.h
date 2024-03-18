#pragma once
#include <iostream>
#include "T_CardSet.h"

/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/7/23
 *
 * Description: 
 * Header file for abstract base class Deck of cards
 * 
 */

template <typename R, typename S>
class Deck : public CardSet<R, S> {
public:
    void shuffle();
    //void collect (CardSet<R, S> &refCardSet);     // ! DEPRECATED collect in Lab3 Step 10
};

#ifdef TEMPLATE_HEADERS_INCLUDE_SOURCE
#include "T_Deck.cpp"
#endif