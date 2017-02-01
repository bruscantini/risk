function DeploymentPhase (game){
  this.player = game.currentPlayer;
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

function AttackPhase (game){
  this.fromTerritory = null;
  this.toTerritory = null;
  this.movePhaseFromTerritory = null;
  this.movePhaseToTerritory = null;

  this.unitsFromBeforeOccupy = 0;
  this.unitsToBeforeOccupy = 0;
  this.unitsToMove = 0;
}
