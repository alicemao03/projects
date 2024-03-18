#pragma once
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>
#include <functional>
#include "T_Card.h"

/*
 * Authors: Jeevan Sivomohan, Davis Davis, Ryan Wu
 * Date:    12/1/23
 *
 * Description: 
 * Header file for CardSet template class
 * 
 */


template <typename R, typename S>
class CardSet 
{
public:
    typedef Card<S, R> card_type;
    typedef typename std::vector<Card<S, R>>::iterator iter;        // TODO: check if const_iterator is needed
    typedef S suit;
    typedef R rank;
    
    void print(std::ostream &os, std::size_t size);
    CardSet<R,S>& operator>>(CardSet<R,S> &refCardSet);
    bool is_empty();
    CardSet() = default;
    CardSet(const CardSet<R,S>& refCardSet);
    //static const std::vector<Card<R,S> > CardSet<R,S>::*getVector();      // ! DEPRECATED getVector in Lab3 Step 7
    typename std::vector< Card <R, S> >::iterator getBegin();
    typename std::vector< Card <R, S> >::iterator getEnd();
    size_t get_size();//helper function to get the size of the underlying cardsetvector
    void sort();
    virtual void collect (CardSet<R, S> &refCardSet);

    void collect_if(CardSet<R, S> &deck, std::function<bool(const Card<R, S>&)> pred, int c_num, Card<R,S> c);
    bool request(CardSet<R,S>&c, R r);

protected:
    std::vector<Card <R, S> > cardSetVector;
};

#ifdef TEMPLATE_HEADERS_INCLUDE_SOURCE
#include "T_CardSet.cpp"
#endif