function Territory (id, name, continentID, adjacentTerritories){
  this.id = id;
  this.name = name;
  this.continentID = continentID;
  this.adjacentTerritories = adjacentTerritories;
  this.owner = null;
  this.occupyingUnits = 0;
}
