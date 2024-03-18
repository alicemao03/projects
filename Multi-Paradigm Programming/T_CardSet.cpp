#include "T_CardSet.h"
#include "Enums.h"

/*
 * Authors: Alice Mao, Ryan Wu
 * Date:    9/25/23
 *
 * Description:
 * Source file for CardSet template
 *
 */

/**
 * @brief Inserts the rank and suit of a card onto the ostream from the CardSet template
 *
 * @tparam R, S
 * @param os, card
 * @return std::ostream&
 */
template <typename R, typename S>
void CardSet<R, S>::print(std::ostream &os, std::size_t size)
{

    size_t cnt = 0;
    for (typename std::vector<Card<R, S>>::iterator it = cardSetVector.begin(); it != cardSetVector.end(); ++it)
    {
        os << *it;
        if ((cnt != CMP_ZERO) && (cnt % size == CMP_ZERO))
        {
            os << std::endl;
        }
        else
        {
            os << " ";
        }
        cnt++;
    }
    os << std::endl;
}

/**
 * @brief Checks to make sure the current deck is not empty. If it is, and exception is thrown. Else,
 * operator>> is performed
 *
 * @tparam R
 * @tparam S
 * @param refCardSet
 * @return CardSet<R,S>&
 */
template <typename R, typename S>
CardSet<R, S> &CardSet<R, S>::operator>>(CardSet<R, S> &refCardSet)
{
    if (this->is_empty())
    {
        throw std::runtime_error("Empty parameter reference to CardSet");
    }
    else
    {
        Card<R, S> lastCard = this->cardSetVector.back();
        refCardSet.cardSetVector.push_back(lastCard);
        this->cardSetVector.pop_back();
        return *this;
    }
    return refCardSet;
}

/**
 * @brief Checks to see if a CardSet is empty
 *
 * @tparam R
 * @tparam S
 * @return true
 * @return false
 */
template <typename R, typename S>
bool CardSet<R, S>::is_empty()
{
    return cardSetVector.empty();
}

/**
 * @brief Copy constructor for new CardSet
 *
 * @tparam R
 * @tparam S
 * @param refCard
 */
template <typename R, typename S>
CardSet<R, S>::CardSet(const CardSet<R, S> &refCardSet) : cardSetVector(refCardSet.cardSetVector) {}

//==================================================================================================
// ! DEPRECATED getVector() IN LAB3 STEP 7
/**
 * @brief Static public member function that returns a pointer to the vector of cards
 *
 * @tparam R
 * @tparam S
 * @return std::vector< Card<R,S> >*
 */
// template<typename R, typename S>
// const std::vector<Card <R, S> > CardSet<R,S>::*CardSet<R,S>::getVector() {
//     return &CardSet<R,S>::cardSetVector;
// }
// ! DEPRECATED IN LAB3 STEP 7
//==================================================================================================

/**
 * @brief gets const iterator for begining of cardSetVector
 *
 * @tparam R
 * @tparam S
 * @return std::vector< Card <R, S> >::const_iterator
 */
template <typename R, typename S>
typename std::vector<Card<R, S>>::iterator CardSet<R, S>::getBegin()
{
    return cardSetVector.begin();
}

/**
 * @brief gets const iterator for end of cardSetVector
 *
 * @tparam R
 * @tparam S
 * @return std::vector< Card <R, S> >::const_iterator
 */
template <typename R, typename S>
typename std::vector<Card<R, S>>::iterator CardSet<R, S>::getEnd()
{

    return cardSetVector.end();
}

/**
 * @brief Sorts the cardSetVector
 *
 * @tparam R
 * @tparam S
 */
template <typename R, typename S>
void CardSet<R, S>::sort()
{
    std::sort(getBegin(), getEnd());
}

template <typename R, typename S>
void CardSet<R, S>::collect(CardSet<R, S> &refCardSet)
{
    if (refCardSet.is_empty())
    {
        throw std::runtime_error("Can't collect, empty card set");
    }
    std::move(refCardSet.getBegin(), refCardSet.getEnd(), std::back_inserter(cardSetVector));
    refCardSet.cardSetVector.clear();

}



template <typename R, typename S>
void CardSet<R, S>::collect_if(CardSet<R, S> &deck, std::function<bool(const Card<R, S> &)> pred, int c_num, Card<R,S> c)//deck is p_hands and cardsetVector is p_books
{ // because getBegin() and getEnd() return const iterators, the predicate has to accept const Card
    auto p2 = pred;
    std::copy_if(deck.getBegin(), deck.getEnd(), std::back_inserter(cardSetVector), pred);
    //typename std::vector<Card<R,S>>::iterator refCardSetEndIterator = deck.getBegin() + 4;

    auto eraseCards = std::remove_if(deck.getBegin(), deck.getEnd(), p2); // TODO: remove auto, just testing functionality, this line is a problem because we can't use erase with const iterators
    std::cout << "erase pos: " << *eraseCards << std::endl;
    deck.cardSetVector.erase(eraseCards, deck.getEnd());
    for(int i = 0; i<c_num - 4; i++){
        deck.cardSetVector.push_back(c);
    }

}

template <typename R, typename S>
bool CardSet<R, S>::request(CardSet<R, S> &c, R r)
{
    size_t size = cardSetVector.size();
    std::copy_if(c.getBegin(), c.getEnd(), std::back_inserter(cardSetVector), [r](const Card<R, S> x)
                 { return x.rank == r; });
    auto e = std::remove_if(c.getBegin(), c.getEnd(), [r](Card<R, S> x)
                            { return x.rank == r; }); // TODO: remove auto, can't do this right now because remove_if won't work with const iterators
    c.cardSetVector.erase(e, c.getEnd());
    return !(size == cardSetVector.size()); // if the size hasn't changed then we didn't get anything that matched
}

template <typename R, typename S>
size_t CardSet<R, S>::get_size()
{
    return cardSetVector.size();
}
