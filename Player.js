function Player (id, name) {
  this.id = id;
  this.name = name;

  /*
   *  alive: true if a player has not been killed. Used to determine whether
   *    the player makes a move on his turn. If false, the game will not let
   *    the player make a move on their turn.
   */
  this.alive = true;
}
