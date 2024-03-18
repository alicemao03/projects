# GoFish Tests
1. [HoldEm](#holdem)
2. [Pinochle](#pinochle)
3. [Uno](#uno)

# HoldEm Deck
## [X] 2 Players HoldEm Player A draws out and eliminated, end game

Player A Hand: 4H 4C 3S 2D 2H 2C AS | Player B Hand: 3D 3H 3C 2S AD AH AC 

HoldEmDeck test_deck;
test_deck.cardSetVector.clear();
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::ace, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::ace, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::ace, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::spades));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::diamonds));

test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::ace, Suit::spades));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::spades));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::hearts));

Inputs:
> ./lab3 GoFish HoldEm a b
> b
> 3
> b
> 2
> b
> A
> b
> 4

Expected Result:
Player a has been ELIMINATED!
Player a books: 3
Player b books: 0
Player(s) with the most books: 
Player a: 3 book(s)


## [X] 3 Players HoldEm Player A drawout, Player B drawout, Player C last man standing
Player a Hand: 2S 5D 5H 5C 4S | Player b Hand: 4D 4H 4C 3D 3H | Player c Hand: 3C 3S 2D 2H 2C 

HoldEmDeck test_deck;
test_deck.cardSetVector.clear();
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::spades));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::clubs));

test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::diamonds));

test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::spades));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::spades));

Inputs:
> ./lab3 GoFish HoldEm a b c
// player a turn
> b
> 4
> c
> 2
> b     // alternatively c
> 5
// player b turn
> a     // output: Invalid player. Please enter a valid player
> c
> 3
// b autoturn
// c autoturn
> c     // now player b turn
> 5
// can try invalid rank 2 here
> c
> 5
> c
> 5

Final Output:
Player a books: 2
Player b books: 1
Player c books: 0
===================================
Game over!
There were 2rounds played
Player(s) with the most books: 
Player a: 2 book(s)




## [ ] 3 Players A draws out, C takes final turn 
Player A Hand: 2S 5D 5H 5C 4S | Player B Hand: 4D 4H 4C 3D 3H | Player C Hand: 3C 3S 2D 2H 2C

HoldEmDeck test_deck;
test_deck.cardSetVector.clear();
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::spades));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::clubs));

test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::three, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::diamonds));

test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::four, Suit::spades));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::clubs));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::hearts));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::five, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<HoldEmRank,Suit>(HoldEmRank::two, Suit::spades));

Inputs:
> ./lab3 GoFish HoldEm a b c
> b 
> 4
> b
> 2
// eliminates player a
> c
> 3
// autoturn for b
> b 
> 2
> c
> 5
> c
> 5
> c
> 5
// player c takes the final turn
> b
> 2
End of round 2
Player a books: 1
Player b books: 1
Player c books: 1
===================================
Game over!
There were 2 rounds played.
Player(s) with the most books: 
Player a: 1 book(s)
Player b: 1 book(s)
Player c: 1 book(s)


------------------------------------------------------------------------------------------------------
# Pinochle Deck
## [X] 2 Players Pinochle Player A draws out and eliminated, end game

Player A Hand: 10H 10C JS 9D 9H 9C AS  | Player B Hand: JD JH JC 9S AD AH AC

PinochleDeck test_deck;
test_deck.cardSetVector.clear();
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::clubs));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::hearts));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::spades));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::jack, Suit::clubs));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::jack, Suit::hearts));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::jack, Suit::diamonds));

test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ace, Suit::spades));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::clubs));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::hearts));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::nine, Suit::diamonds));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::jack, Suit::spades));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::clubs));
test_deck.cardSetVector.push_back(Card<PinochleRank,Suit>(PinochleRank::ten, Suit::hearts));

Inputs:
> ./lab3 GoFish Pinochle a b
> b
> J
> b
> 9
> b
> A
> b
> 10

Expected Result:
Player a has been ELIMINATED!
Player a books: 3
Player b books: 0
Player(s) with the most books: 
Player a: 3 book(s)



------------------------------------------------------------------------------------------------------
# Uno
## [x] 2 Players Uno Player A draws out and eliminated, end game

Player A Hand: 4BLU 4RED 3YEL 1YEL 1GRE 1BLU 0YEL  | Player B Hand: 3GRE 3BLU 3RED 1RED 0GRE 0BLU 0RED

UnoDeck test_deck;
test_deck.cardSetVector.clear();
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::red));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::blue));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::green));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::one, UnoColor::red));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::red));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::blue));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::green));

test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::zero, UnoColor::yellow));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::one, UnoColor::blue));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::one, UnoColor::green));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::one, UnoColor::yellow));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::three, UnoColor::yellow));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::four, UnoColor::red));
test_deck.cardSetVector.push_back(Card<UnoRank,UnoColor>(UnoRank::four, UnoColor::blue));

Inputs:
> ./lab3 GoFish Uno a b
> b
> 3
> b
> 1
> b
> 0
> b
> 4

Expected Result:
Player a has been ELIMINATED!
Player a books: 3
Player b books: 0
Player(s) with the most books: 
Player a: 3 book(s)
