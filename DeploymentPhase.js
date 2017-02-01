function DeploymentPhase (playerID, game){
  this.player = game.players[playerID - 1];
  this.unitsToDeploy = this.player.unitsToDeploy;
  this.territories = {};
  this.currentTerritory = null;

  for (var i = 0; i < game.territories.length; ++i){
    var territory = game.territories[i];
    if (this.player.ownTerritory(territory.id)){
      var territoryInfo = {
        start: territory.occupyingUnits,
        add: 0
      };
      this.territories[territory.id] = territoryInfo;
    }
  }

}
