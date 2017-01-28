function Game () {
  this.territories = _shuffle([
    new Territory (1, 'Alaska', 1),
    new Territory (2, 'Alberta', 1),
    new Territory (3, 'Central America', 1),
    new Territory (4, 'Eastern United States', 1),
    new Territory (5, 'Greenland', 1),
    new Territory (6, 'Northwest Territory', 1),
    new Territory (7, 'Ontario', 1),
    new Territory (8, 'Eastern Canada', 1),
    new Territory (9, 'Western United States', 1),
    new Territory (10, 'Argentina', 2),
    new Territory (11, 'Brazil', 2),
    new Territory (12, 'Peru', 2),
    new Territory (13, 'Venezuela', 2),
    new Territory (14, 'Great Britain', 3),
    new Territory (15, 'Iceland', 3),
    new Territory (16, 'Northern Europ', 3),
    new Territory (17, 'Scandinavia', 3),
    new Territory (18, 'Southern Europe', 3),
    new Territory (19, 'Russia', 3),
    new Territory (20, 'Western Europe', 3),
    new Territory (21, 'Central Africa', 4),
    new Territory (22, 'East Africa', 4),
    new Territory (23, 'Egypt', 4),
    new Territory (24, 'Madagascar', 4),
    new Territory (25, 'North Africa', 4),
    new Territory (26, 'South Africa'),
    new Territory (27, 'Afghanistan', 5),
    new Territory (28, 'China', 5),
    new Territory (29, 'India', 5),
    new Territory (30, 'Irkutsk', 5),
    new Territory (31, 'Japan', 5),
    new Territory (32, 'Kamchatka', 5),
    new Territory (33, 'Middle East', 5),
    new Territory (34, 'Mongolia', 5),
    new Territory (35, 'Southeast Asia', 5),
    new Territory (36, 'Siberia', 5),
    new Territory (37, 'Ural', 5),
    new Territory (38, 'Yakutsk', 5),
    new Territory (39, 'Eastern Australia', 6),
    new Territory (40, 'Indonesia', 6),
    new Territory (41, 'New Guinea', 6),
    new Territory (42, 'Western Australia', 6)
  ]);

  this.players = [];
}

Game.prototype.start = function (playersArg){
  /*
   *  For now, there will always only be 3 players. Two humans, one neutral.
   *
   */

   if (playersArg.length !== 2){
     return false;
   }

   this.players = this.players.concat(playersArg);
   var neutralPlayer = new Player(3, "Kaiser the Neutral");
   this.players.push(neutralPlayer);





};
