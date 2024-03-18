#include "T_Card.h"

/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/7/23
 *
 * Description: 
 * Source file for Card template 
 * 
 *  - Card struct constructor definition
 *  - Card overload function
 */

/**
 * @brief Construct a new Card< R, S>:: Card object
 * 
 * @tparam R, S 
 * @param rank_, suit_ 
 */
template<typename R, typename S>
Card<R, S>::Card(R rank_, S suit_) : rank(rank_), suit(suit_) {}

/**
 * @brief Inserts the rank and suit of a card onto the ostream
 * 
 * @tparam R, S 
 * @param os, card 
 * @return std::ostream& 
 */
template<typename R, typename S>
std::ostream &operator<<(std::ostream &os, const Card<R, S> &card) {
    os << card.rank << card.suit;
    return os;
} 

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
bool compareRankSuit(const Card<R,S>& card1, const Card<R,S>& card2) {
    if (card1.rank == card2.rank) {
        return card1.suit < card2.suit;
    }
    else {
        return card1.rank < card2.rank;
    }
}

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
bool compareSuitRank(const Card<R,S>& card1, const Card<R,S>& card2) {
    if (card1.suit == card2.suit) {
        return card1.rank < card2.rank;
    }
    else {
        return card1.suit < card2.suit;
    }
}
