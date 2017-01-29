var myGame = new Game();
var player1 = new Player(1, 'anthony');
var player2 = new Player(2, 'gio');

myGame.start([player1, player2]);
console.table(myGame.players);
console.table(myGame.territories);
myGame.deploy(42, 3);
console.table(myGame.territories);
