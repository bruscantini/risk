function Player (id, name) {
  this.id = id;
  this.name = name;

  /*
   *  alive: true if a player has not been killed. Used to determine whether
   *    the player makes a move on his turn. If false, the game will not let
   *    the player make a move on their turn.
   */
  this.alive = true;
  this.territories = [];
  this.cards = [];
  this.unitsToDeploy = 0;
}

/*
 *  Checks if a player has lost all his/her territories. If so, sets their
 *  alive status to 'false' and returns 'true'. Else, returns false;
 */
Player.prototype.isWipedOut = function() {
  if (this.territories.length === 0){
    this.alive = false;
    return true;
  }
  return false;
};
