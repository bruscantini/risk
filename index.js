var myGame = new Game();
var player1 = new Player(1, 'anthony');
var player2 = new Player(2, 'gio');

myGame.start([player1, player2]);
console.log("player1 territories:", player1.territories);
console.table(myGame.territories);
