var myGame = new Game();
var player1 = new Player(1, 'anthony');
var player2 = new Player(2, 'gio');

myGame.start([player1, player2]);
console.table(myGame.territories);
myGame.deploy(4, 9);
myGame.attack(4, 7);

/*
 *  Inteface plan:
 *    1. Ask user to choose how many people will play.
 *    2. Based on this result, prompt user for player1 name, player2 name, etc.
 *    3. Show board with one unit of owner on each territory.
 *    4. While there are still units to deploy, cycle through each player prompting
 *       them to choose one of their territories to deploy a unit in.
 *            - if player is a computer (player.alive === false), randomly place
 *            in one of their territories.
 *    5. Once deployment is done,              
 */
