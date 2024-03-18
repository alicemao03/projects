#pragma once
#include "Suit.h"
#include <iostream>
 
/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/7/23
 *
 * Description: 
 * Header file for Card template 
 * 
 *  - Card template struct constructor declaration
 *  - Card template overload functions
 */

/**
 * @brief Card template struct constructor declaration
 * 
 * @tparam R 
 * @tparam S 
 */
template<typename R, typename S>
struct Card {
    R rank;
    S suit;
    Card(R rank_, S suit_);
};

/**
 * @brief "shift" operator overload declaration
 * 
 * @tparam R 
 * @tparam S 
 * @param os 
 * @param card 
 * @return std::ostream& 
 */
template<typename R, typename S>
std::ostream &operator<<(std::ostream &os, const Card<R, S> &card);

/**
 * @brief returns true or false depending on card1 vs card2 rank
 * 
 * @tparam R rank
 * @tparam S suit
 * @param card1 
 * @param card2 
 * @return true if card1's rank is less than card2's rank
 * @return false if card1's rank is greater than card2's rank
 */
template<typename R, typename S>
bool compareRankSuit(const Card<R,S>& card1, const Card<R,S>& card2);

/**
 * @brief returns true or false depending on card1 vs card2 suit
 * 
 * @tparam R rank
 * @tparam S suit
 * @param card1 
 * @param card2 
 * @return true if card1's suit is less than card2's suit
 * @return false if card1's suit is greater than card2's suit
 */
template<typename R, typename S>
bool compareSuitRank(const Card<R,S>& card1, const Card<R,S>& card2);

#ifdef TEMPLATE_HEADERS_INCLUDE_SOURCE
#include "T_Card.cpp"
#endif