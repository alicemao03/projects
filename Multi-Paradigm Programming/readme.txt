Authors:
Jeevan Sivamohan: j.g.sivamohan@wustl.edu
Davis Davis: davis.l.a@wustl.edu
Ryan Wu: r.c.wu@wustl.edu

Date Created 12/5/23

# Lab 3

# TODOS (FOR US REMOVE):
[ ] debug Testing
[ ] test PinochleGame and HoldEmGame
[ ] remove autos
[ ] remove TODO: debug prints
[ ] remove const and add enums
[ ] add file comment blocks
[ ] add javadoc for all methods
[ ] finalize readme
[ ] books should be books count not total cards in books

# Testing
## Test Pinochle

## Test HoldEmGame

## Test invalid input for GoFishGame
./lab3 <arg1> <arg2> [arg3 ... arg n]
[ ] misspelled/missing arg1
[ ] misspelled/missing arg2
[ ] not enough players < arg3
[ ] too many players argn

===================================================================
## Test following playing combinations for valid starting scenarios
[ ] > TEST: invalid rank input
[ ] > TEST: valid rank input
[ ] > TEST: invalid player input (if player 2 is called "b" try "c")
[ ] > TEST: valid player input
[ ] > TEST: card exists in P2 Hand
[ ] > TEST: card doesn't exist in P2 Hand but exists with GoFish
[ ] > TEST: card doesn't exist in P2 Hand and doesn't exist with GoFish

==============================================================
## Uno Deck
[ ] 2 Players | Neither player starting w/ book:
(Starting) Deck: 1 red 1 blue 1 green 2 red 3 red 4 red 5 red 
P1 Hand: 1 red 1 blue 1 green 2 red 3 red 4 red 5 red
P2 Hand: 1 yellow 2 blue 2 green 2 black 3 blue 3 green 4 blue

[ ] 2 Players | P1 starting w/ book:
(Starting) Deck:

[ ] 2 Players | P2 starting w/ book:
(Starting) Deck:
----------------------------------------------
[ ] 3+ Players | No player starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P1 starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P2 starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P3 starting w/ book:
(Starting) Deck: 

==============================================================
## Pinochle Deck
[ ] 2 Players | Neither player starting w/ book:
(Starting) Deck: 1 red 1 blue 1 green 2 red 3 red 4 red 5 red 
P1 Hand: 1 red 1 blue 1 green 2 red 3 red 4 red 5 red
P2 Hand: 1 yellow 2 blue 2 green 2 black 3 blue 3 green 4 blue

[ ] 2 Players | P1 starting w/ book:
(Starting) Deck:

[ ] 2 Players | P2 starting w/ book:
(Starting) Deck:
----------------------------------------------
[ ] 3+ Players | No player starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P1 starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P2 starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P3 starting w/ book:
(Starting) Deck: 

==============================================================
## HoldEmGame
[ ] 2 Players | Neither player starting w/ book:
(Starting) Deck: 1 red 1 blue 1 green 2 red 3 red 4 red 5 red 
P1 Hand: 1 red 1 blue 1 green 2 red 3 red 4 red 5 red
P2 Hand: 1 yellow 2 blue 2 green 2 black 3 blue 3 green 4 blue

[ ] 2 Players | P1 starting w/ book:
(Starting) Deck:

[ ] 2 Players | P2 starting w/ book:
(Starting) Deck:
----------------------------------------------
[ ] 3+ Players | No player starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P1 starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P2 starting w/ book:
(Starting) Deck: 

[ ] 3+ Players | P3 starting w/ book:
(Starting) Deck: 

[X] Test Pinochle

[X] Test HoldEmGame 

## Testing GoFishGame
./lab3 <arg1> <arg2> [arg3 ... arg n]
[X] misspelled/missing arg1
[X] misspelled/missing arg2
[X] not enough players < arg3
[X] too many players argn
 
===================================================================
## Test following playing combinations for valid starting scenarios
[X] > TEST: invalid rank input
[X] > TEST: valid rank input
[X] > TEST: invalid player input (if player 2 is called "b" try "c")
[X] > TEST: valid player input
[X] > TEST: card exists in P2 Hand
[X] > TEST: card doesn't exist in P2 Hand but exists with GoFish
[X] > TEST: card doesn't exist in P2 Hand and doesn't exist with GoFish
[X] > TEST: GoFish card not drawn from deck (turn ends)
[X] > TEST: GoFish card drawn from deck (turn continues)
[X] ensure eliminated players stay eliminated & elimation works right
[X] when every player has an empty hand & there is an empty deck, game ends
==============================================================
## Uno Deck
[X] 2 Players | Neither player starting w/ book:
(Starting) Deck: Empty
P1 Hand: 1 red 1 blue 1 green 2 red 3 red 4 red 5 red
P2 Hand: 1 yellow 2 blue 2 green 2 black 3 blue 3 green 4 blue

[X] 2 Players | P1 starting w/ book:
(Starting) Deck: Empty
P1 Hand: 4 blue 4 red 3 yellow 1 yellow 1 green 1 blue 1 yellow
P2 Hand: 3 green 3 blue 3 red 4 red 0 green 0 blue 0 red

[X] 2 Players | P2 starting w/ book:
(Starting) Deck: Empty
P1 Hand: 4 blue 4 red 3 yellow 1 yellow 1 green 1 blue 2 yellow
P2 Hand: 3 green 3 blue 3 red 4 red 0 green 0 blue 0 red
----------------------------------------------
[X] 3+ Players | No player starting w/ book:
(Starting) Deck: Empty
P1 Hand: 4 yellow 4 blue 4 red 3 yellow 1 red
P2 Hand: 1 green 1 blue 2 yellow 3 green 3 blue
P3 Hand: 3 red 1 yellow 0 green 0 blue 0 red 

[X] 3+ Players | P1 starting w/ book:
(Starting) Deck: Empty
P1 Hand: 4 yellow 4 blue 4 red 4 green 1 red
P2 Hand: 1 green 1 blue 2 yellow 3 green 3 blue
P3 Hand: 3 red 1 yellow 0 green 0 blue 0 red 

[X] 3+ Players | P2 starting w/ book:
P1 Hand: 4 yellow 4 blue 4 red 3 yellow 3 green
P2 Hand: 1 green 1 blue 1 red 1 yellow 2 yellow
P3 Hand: 3 red 3 blue 0 green 0 blue 0 red 

[X] 3+ Players | P3 starting w/ book:
(Starting) Deck: 
P1 Hand: 4 yellow 4 blue 4 red 3 yellow 3 green
P2 Hand: 1 green 1 blue 1 red 1 yellow 2 yellow
P3 Hand: 3 red 3 blue 0 green 0 blue 0 red 

[X] 3+ Players | P3 P2 starting w/ book:
(Starting) Deck: 
P1 Hand: 2 yellow 1 blue 1 red 1 yellow 2 green
P2 Hand: 1 green 0 yellow 0 green 0 blue 0 red 
P3 Hand: 4 yellow 3 blue 3 red 3 yellow 3 green

[X] 3+ Players | P3 P2 P1 starting w/ book:
(Starting) Deck: 
P1 Hand: 4 blue 1 blue 1 red 1 yellow 1 green
P2 Hand: 4 green 0 yellow 0 green 0 blue 0 red 
P3 Hand: 4 yellow 3 blue 3 red 3 yellow 3 green

[X] 3+ Players | Special card testing 4 of a kind

[X] 3+ Players | Players starting random

==============================================================
## Pinochle Deck
[X] 2 Players | Neither player starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: queen hearts queen spades queen diamonds 1 diamonds 2 diamonds 3 clubs 3 spades
P2 Hand: queen clubs 1 clubs 2 clubs 3 hearts 3 diamonds 4 hearts 4 diamonds

[X] 2 Players | P1 starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: queen hearts queen spades queen diamonds queen diamonds 2 diamonds 3 clubs 3 spades
P2 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 4 hearts 4 diamonds

[X] 2 Players | P2 starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: queen hearts queen spades queen diamonds jack diamonds 2 diamonds 3 clubs 3 spades
P2 Hand: 1 diamonds 1 clubs 1 clubs 1 hearts 3 diamonds 4 hearts 4 diamonds

----------------------------------------------
[X] 3+ Players | No player starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs 2 diamonds 3 clubs 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs queen hearts queen spades 

[X] 3+ Players | P1 starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: 1 diamonds 3 diamonds 3 clubs 3 hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs 2 diamonds 3 clubs 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs queen hearts queen spades 


[X] 3+ Players | P2 starting w/ book:
(Starting) Deck: Empty
P1 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs queen diamonds queen spades 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs queen hearts queen spades 


[X] 3+ Players | P3 starting w/ book:
(Starting) Deck: Empty
P1 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs queen diamonds jack spades 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs 4 hearts queen spades 

[X] 3+ Players | P3 starting w/ book, P1 requests queens from P2: 
(Starting) Deck: Empty
P1 Hand: 1 diamonds 1 clubs queen clubs queen hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs queen diamonds jack spades 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs 4 hearts queen spades 

==============================================================
## HoldEmGame
[X] 2 Players | Neither player starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: queen hearts queen spades queen diamonds 1 diamonds 2 diamonds 3 clubs 3 spades
P2 Hand: queen clubs 1 clubs 2 clubs 3 hearts 3 diamonds 4 hearts 4 diamonds

[X] 2 Players | P1 starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: queen hearts queen spades queen diamonds queen clubs 2 diamonds 3 clubs 3 spades
P2 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 4 hearts 4 diamonds

[X] 2 Players | P2 starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 4 hearts 4 diamonds
P2 Hand: queen hearts queen spades queen diamonds queen clubs 2 diamonds 3 clubs 3 spades

----------------------------------------------
[X] 3+ Players | No player starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs 2 diamonds 3 clubs 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs queen hearts queen spades 

[X] 3+ Players | P1 starting w/ book:
(Starting) Deck: 2 clubs 3 hearts 2 hearts 2 spades
P1 Hand: 1 diamonds 1 clubs 1 hearts 1 spades 3 diamonds 
P2 Hand: queen diamonds queen clubs 2 diamonds 3 clubs 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs queen hearts queen spades 

[X] 3+ Players | P1 P2 P3 starting w/ book:
(Starting)  Deck: 6 hearts 6 spades 2 hearts 2 spades
P1 Hand: 1 diamonds 1 clubs 1 spades 1 hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs queen hearts queen spades 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs 4 spades 3 clubs 

[X] 3+ Players | P1 P2 P3 starting w/ book:
(Starting) Deck: 1 hearts 1 spades 2 hearts 2 spades
P1 Hand: 1 diamonds 1 clubs 2 clubs 3 hearts 3 diamonds 
P2 Hand: queen diamonds queen clubs queen hearts jack spades 3 spades
P3 Hand: 4 hearts 4 diamonds 4 clubs 4 spades 3 clubs 


# Deprecated Features
getVector in T_CardSet.h/.cpp : ptr to class template protected vector member
- replaced with getBegin() and getEnd() methods in PinochleGame.h/.cpp and HoldEmGame.h/.cpp


# Design Decisions
- PinochleGame and HoldEmGame manually pushback cards to localCardVector rather than using std::copy because we wanted full control
- (Step 8) We don't use sort() in the play() method. Sorting only happens suit_independent_evaluation and holdem_hand_evaluation
- (Step 12) request() in CardSet does not use find_if, we decided to use an alternate method with copy_if and remove_if
- (Step 16) GoFishGame public inheritance from Game (abstract class in A_Game.h/.cpp)
- If a player (say player a)requests a card from a player with an empty hand (say player b), the player a will Go Fish.
- If a player begins with an empty hand, the player will automatically Go Fish
- Function signature of collect_if was changed slightly to help fix the problem of taking too many cards to make a book if the number of cards was greater than 4

Mismatched type:
     required from 'int GoFishGame<R, S, D>::play() [with R = HoldEmRank; S = Suit; D = HoldEmDeck]'
     T_GoFishGame.cpp:246:5:   required from here
     T_GoFishGame.cpp:148:63: warning: comparison of integer expressions of different signedness: 'size_t' {aka 'long unsigned int'} and 'int' [-Wsign-compare]

Incorrect Output for GoFishGame:
     -----------------------------------
     Player 1
     Hand:
     Books: 7S 7D 7H 7C 6S 6D 6H 6C 5S 5D 5H 5C 4S 4D 4H 4C 2S 2D 2H 2C 3S 3D 3H 3C AS AD AH AC 
     -----------------------------------
     Player 2
     Hand:
     Books: None
     -----------------------------------
     Player 3
     Hand:
     Books: None
     -----------------------------------
     Player 4
     Hand:
     Books: None
     -----------------------------------
     Player 1 turn:
     DEBUG: requestResult: 0 0 to -1
     Empty parameter reference to CardSet
     Player 1 has been ELIMINATED!
     player: 0 hand:

     player: 0 books:
     7S 7D 7H 7C 6S 6D 6H 6C 5S 5D 5H 5C 4S 4D 4H 4C 2S 2D 2H 2C 3S 3D 3H 3C AS AD AH AC 
     terminate called after throwing an instance of 'std::runtime_error'
     what():  Can't collect, empty card set

          Player 1 has collected all of these cards from the other players and there are no more cards in the Deck.
          After their turn ends, the program should recognize that player 1 is eliminated and so are all of the others.
          However, it stops right after eliminating player 1 and does not recognize that the game is over.

          SOLUTION:
          We had to add another check to make sure the eliminated player's hand is not empty before calling our
          collect method on the hand.


Deleting Cards When Requesting:
     -----------------------------------
     Player a
     Hand: 4BLU 4RED 3YEL 3YEL 1GRE
     None
     -----------------------------------
     Player b
     Hand: 1BLU 0YEL 3GRE 3BLU 3RED
     None
     -----------------------------------
     Player c
     Hand: 1RED
     Books: 0GRE 0GRE 0BLU 0RED
     -----------------------------------
     Player a turn:
     Which player would you like to fish from?
     b
     What rank would you like to fish for? (enter rank)
     3
     4BLU 4RED 3YEL 3YEL 1GRE 3GRE 3BLU 3RED
     ===Player a fished a 3 from Player b===
     gets to collect_if
     DEBUG: collecting book for a
     -----------------------------------
     Player a
     Hand: 4BLU 4RED 1GRE
     Books: 3YEL 3YEL 3GRE 3BLU
     -----------------------------------
     Player b
     Hand: 1BLU 0YEL
     None
     -----------------------------------
     Player c
     Hand: 1RED
     Books: 0GRE 0GRE 0BLU 0RED
     
          ISSUE: Player a should still have another 3 in their deck after requesting from player b. The card is getting deleted

          SOLUTION: In order to resolve the conflict, we modified the function signature of collect_if in order to take the number of instances
          that were actually found and compare that to the number of instances needed to make a book (default of four), this is so that the collect_if 
          function can add back in the cards that are over the number needed to create a book (so that when a player has say 7 cards it makes
          a book of 4 and then leaves the last three in their hand)
=======
