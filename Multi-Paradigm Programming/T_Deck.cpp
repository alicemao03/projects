#include "T_Deck.h"
#include <random>
#include <algorithm>
#include <stdexcept>

/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/25/23
 *
 * Description: 
 * Source file for Card template 
 * 
 *  - 
 */

template<typename R, typename S>
void Deck<R,S>::shuffle() {
    std::random_device randDevice;
    std::mt19937 randNumGen (randDevice());
    std::shuffle(CardSet<R,S>::cardSetVector.begin(), CardSet<R,S>::cardSetVector.end(), randNumGen);
}

//==============================================================================
// ! DEPRECATED collect in Lab3 Step 10
/**
 * @brief Collects all cards from the parameter deck and adds them to the current deck
 * 
 * @tparam R 
 * @tparam S 
 * @param refCardSet 
 */
// template<typename R, typename S>
// void Deck<R,S>::collect (CardSet<R, S> &refCardSet) {
//     if (refCardSet.is_empty())
//     {
//         throw std::runtime_error("Can't collect, empty card set");
//     }

//     while (!refCardSet.is_empty()){
//         refCardSet >>  *this;
//     }
// }
// ! DEPRECATED collect in Lab3 Step 10
//==============================================================================