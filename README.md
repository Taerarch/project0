# Project 0 - Tic Tac Toe


The core of the mechanics behind the game is a set of default buttons that upon being clicked a character dependant on the current turn is placed inside. An if statement checks if there is already a character inside the button and prevents a second input.

Then we use a nested for loop to extract the text inside each button to create an array for easier access when testing for the win conditions. Next a single loop goes through each different win condition breaking them up into horizontal, vertical and diagonal win conditions.


#### Winning

Horizontal loops through the generated array selecting the elements in groups of three to see if all the elements in the row are the same. Vertical again loops through the array but selects elements two apart from each other to compare the elements in a column. The diagonals had to be hard coded comparing element 1, 5, 9 or 3, 5, 7.


If any of these return true the win class is added to those squares through another reference through jQuery which then causes a small transition into different a colour and border for the winning squares. When a win is found a number counter is increased depending on the current turn and a message is added below the squares declaring the winner.


#### Different Characters

The game when activating the game buttons actually chooses the character based on a variable that gets updated by these buttons. All the previous code works based on comparison between the actual text while the colour and who's turn it is is based on invisible but unchanging variables X and O. (Argument could be made to change these to PlayerOne and PlayerTwo.)

This does however lead to an unintended feature that when you change character mid-game the different characters from the same player don't actually interact with each other.


#### Resetting

The reset button goes through each button and removes the win class as well as emptying the text inside.

The reset score button does the same as well as emptying the win counters to then update them.


#### Saving

Upon unloading the page a nested loop is run that creates a variable for each of the buttons with their inside text as well as what character was being used currently. When it is reloaded first the character is reselected and then the characters are reinserted into the buttons. Then it checks to see if the text inside is the same as the chosen character, if so the 'X' or 'O' class is assigned to that button.

The win counters as well as whether or not the computer is playing is also saved in a similar way.

#### Computer opponent

The computer opponent is programmed to take the middle square if the player does not.

After that it prioritises winning by looking to see if any two of its squares are in a line with an empty square which it then clicks on. This was labelled as the offensive section

Failing that it will look to block the human player if they have any combination of two squares with a line on a third. This was labelled in the comments as the defensive section.

If the human makes a move not expected and the computer is not required to block and cannot immediately win it will place a random move from top left to bottom right.

There is a button to turn off the Computer opponent by making a variable false which is checked whenever a button is clicked on the grid.



-----------------
Git pages address https://taerarch.github.io/project0/index.html
