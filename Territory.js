function Territory (id, name, continentID, adjacenTerritories){
  this.id = id;
  this.name = name;
  this.continentID = continentID;
  this.adjacenTerritories = [];
  this.owner = null;
  this.occupyingUnits = 0;
}
