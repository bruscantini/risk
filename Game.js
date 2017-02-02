function Game() {
    this.territories = [
        new Territory(1, 'Alaska', 1, [32, 2, 6]),
        new Territory(2, 'Alberta', 1, [1, 6, 7, 9]),
        new Territory(3, 'Central America', 1, [4, 9, 13]),
        new Territory(4, 'Eastern United States', 1, [3, 7, 8, 9]),
        new Territory(5, 'Greenland', 1, [6, 7, 8, 15]),
        new Territory(6, 'Northwest Territory', 1, [1, 2, 5, 7]),
        new Territory(7, 'Ontario', 1, [2, 4, 5, 6, 8, 9]),
        new Territory(8, 'Eastern Canada', 1, [4, 5, 7]),
        new Territory(9, 'Western United States', 1, [2, 3, 4, 7]),
        new Territory(10, 'Argentina', 2, [11, 12]),
        new Territory(11, 'Brazil', 2, [10, 12, 13, 25]),
        new Territory(12, 'Peru', 2, [10, 11, 13]),
        new Territory(13, 'Venezuela', 2, [3, 11, 12]),
        new Territory(14, 'Great Britain', 3, [15, 16, 17, 20]),
        new Territory(15, 'Iceland', 3, [5, 14, 17]),
        new Territory(16, 'Northern Europe', 3, [14, 17, 18, 19, 20]),
        new Territory(17, 'Scandinavia', 3, [14, 15, 16, 19]),
        new Territory(18, 'Southern Europe', 3, [16, 19, 20, 23, 25, 33]),
        new Territory(19, 'Russia', 3, [16, 17, 18, 27, 33, 37]),
        new Territory(20, 'Western Europe', 3, [14, 16, 18]),
        new Territory(21, 'Central Africa', 4, [22, 25, 26]),
        new Territory(22, 'East Africa', 4, [21, 23, 24, 25, 26, 33]),
        new Territory(23, 'Egypt', 4, [18, 22, 25, 33]),
        new Territory(24, 'Madagascar', 4, [22, 26]),
        new Territory(25, 'North Africa', 4, [11, 18, 20, 21, 22, 23]),
        new Territory(26, 'South Africa', 4, [21, 22, 24]),
        new Territory(27, 'Afghanistan', 5, [19, 28, 29, 33, 37]),
        new Territory(28, 'China', 5, [1, 29, 34, 35, 36, 37]),
        new Territory(29, 'India', 5, [1, 2, 33, 35]),
        new Territory(30, 'Irkutsk', 5, [32, 34, 36, 38]),
        new Territory(31, 'Japan', 5, [32, 34]),
        new Territory(32, 'Kamchatka', 5, [1, 30, 31, 34, 38]),
        new Territory(33, 'Middle East', 5, [18, 19, 22, 23, 27, 29]),
        new Territory(34, 'Mongolia', 5, [28, 30, 31, 32, 36]),
        new Territory(35, 'Southeast Asia', 5, [28, 29, 40]),
        new Territory(36, 'Siberia', 5, [28, 30, 34, 37, 38]),
        new Territory(37, 'Ural', 5, [19, 27, 28, 36]),
        new Territory(38, 'Yakutsk', 5, [30, 32, 36]),
        new Territory(39, 'Eastern Australia', 6, [41, 42]),
        new Territory(40, 'Indonesia', 6, [35, 41, 42]),
        new Territory(41, 'New Guinea', 6, [39, 40, 42]),
        new Territory(42, 'Western Australia', 6, [39, 40, 41])
    ];

    this.players = [];

    // counter that keeps track of how many sets have been turned in so far in
    // the game. Used to determine how many units player should receive after
    // turning in a set.
    this.setsTurnedIn = 0;

    // object holding details of last attack round. Used by interface to paint
    // attack details like how many dice rolled, dice value, etc.
    this.lastAttackDetails = null;

    // should represent whoever's turn it is.
    this.currentPlayer = null;
    //this.currentFromTerritory = null;
    //this.currentToTerritory = null;

    /*
     *  -1:  initial deployment
     *  0:  deployment
     *  1:  attack
     *  2:  fortify
     */
    this.phase = -1;
}

/*
 *  Changes phase.
 */
Game.prototype.changePhase = function() {
    this.phase = (this.phase + 1) % 3;
};

// Must account for end game situation - where all but one players are DEAD.
Game.prototype.changePlayer = function() {
    var nextPlayer = this.players[(this.currentPlayer.id) % this.players.length];

    /*
    while (!nextPlayer.alive) {
        nextPlayer = this.players[(nextPlayer.id + 1) % this.players.length];
    }
    */
    this.currentPlayer = nextPlayer;
};

/*
 *  Checks to see if entire continent specified by continentID belongs to
 *  player specidifed by playerID. If so, returns true, else returns false.
 */
Game.prototype.isContinentOwnedByPlayer = function(continentID, playerID) {
    for (var i = 0; i < this.territories.length; ++i) {
        var territory = this.territories[i];
        if (territory.continentID === continentID && territory.owner !== playerID) {
            return false;
        }
    }
    return true;
};

/*
 *  checks if all territories are owned by single player. If so, returns
 *  that players ID. Else, returns false;
 */
Game.prototype.isGameOver = function() {
    var playerID = this.territories[0].owner;
    for (var i = 0; i < this.territories.length; ++i) {
        var territory = this.territories[i];
        if (territory.owner !== playerID) return false;
    }
    return playerID;
};

/*
 *  Function to describe how many units a player collects if they control all of a
 *  continent at the beginning of their turn.
 */
Game.prototype.unitsForContinent = function(continentID) {
    switch (continentID) {
        case 1:
            return 5;
        case 2:
            return 2;
        case 3:
            return 5;
        case 4:
            return 3;
        case 5:
            return 7;
        case 6:
            return 2;
    }
};

/*
 *  Function to describe how many units a player collects if they turn in a card
 *  set.
 */
Game.prototype.unitsForSet = function(setNumber) {
    if (setNumber < 7) {
        switch (setNumber) {
            case 0:
                return 0;
            case 1:
                return 4;
            case 2:
                return 6;
            case 3:
                return 8;
            case 4:
                return 10;
            case 5:
                return 12;
            case 6:
                return 15;
        }
    }
    return this.unitsForSet(setNumber - 1) + 5;
};

Game.prototype.deployUnitsEvenly = function(playerID) {
    var player = this.players[playerID - 1];
    var unitsToDeploy = player.unitsToDeploy;
    var territories = player.territories;

    while (unitsToDeploy > 0) {
        for (var i = 0; i < territories.length; ++i) {
            var territory = this.territories[territories[i] - 1];
            if (unitsToDeploy === 0) {
                break;
            }
            this.deploy(territory.id, 1);
            unitsToDeploy--;
        }
    }
    player.unitsToDeploy = 0;
};

Game.prototype.start = function(playersArray) {
    /*
     *  For now, there will always only be 3 players. Two humans, one neutral.
     *  We will also distribute territories randomly. Player turn is order of
     *  array so, players[0] goes first. Implement rolling of dice to choose
     *  turns later.
     */

    if (playersArray.length !== 2) {
        console.error("This should only be a two player game. We have not" +
            " implemented the functionality for more than that.");
        return false;
    }
    this.players = playersArray;
    var neutralPlayer = new Player(3, "Kaiser the Neutral", "#797D81");
    neutralPlayer.alive = false;
    this.players.push(neutralPlayer);
    _.forEach(this.players, function(elem) {
        elem.unitsToDeploy = 39;
    });

    // distribute territories
    var shuffledTerritories = _.shuffle(this.territories);
    for (var territoryIdx = 0, playerIdx = 0; territoryIdx < shuffledTerritories.length;
        ++territoryIdx, playerIdx = ++playerIdx % this.players.length) {
        var territory = shuffledTerritories[territoryIdx];
        var player = this.players[playerIdx];
        territory.owner = player.id;
        player.territories.push(territory.id);
    }
};

Game.prototype.deploy = function(territoryID, numOfUnits) {
    var territory = this.territories[territoryID - 1];
    if (territory.id !== territoryID) {
        console.error("territory.id !== territoryID in Game.deploy()");
        return false;
    }
    territory.occupyingUnits += numOfUnits;
};

/*
 *  Adds units to a player's unitsToDeploy property based on how many
 *  territories the player owns and if he/she owns entire continents.
 *  Called at the beginnig of players turn.
 */
Game.prototype.distributeReinforcements = function(playerID) {
    var player = this.players[playerID - 1];
    var unitsToAdd = 0;

    // by territories owned
    unitsToAdd += Math.floor(player.territories.length / 3);
    for (var i = 1; i <= 6; ++i) {
        if (this.isContinentOwnedByPlayer(i, player.id)) {
            unitsToAdd += this.unitsForContinent(i);
        }
    }

    player.unitsToDeploy += unitsToAdd;
    return unitsToAdd;
};


Game.prototype.rollDice = function(numOfDice) {
    var dice = [];
    for (var die = 0; die < numOfDice; ++die) {
        dice.push(_.random(1, 6));
    }
    return dice.sort().reverse();
};

Game.prototype.transferTerritory = function(territoryID, loserID, winnerID) {
    var territory = this.territories[territoryID - 1];
    var loser = this.players[loserID - 1];
    var winner = this.players[winnerID - 1];

    if (territory.owner !== loserID) {
        console.error(loser.name + " should not be losing this territory (" +
            territoryID + "). It did not belong to them.");
    }

    console.log(winner.name + " takes " + territory.name + " from " + loser.name);

    //take away from loser
    _.pull(loser.territories, territoryID);
    //give to winner
    winner.territories.push(territoryID);
    //reassign ownership in territory object
    territory.owner = winner.id;
};

/*
 *  For now, players will attack with ALL units in the 'from' territory.
 *  Later, we can implement choosing how many units will attack.
 */
Game.prototype.attack = function(from, to) {
    var attackingTerritory = this.territories[from - 1];
    var defendingTerritory = this.territories[to - 1];
    var attacker = this.players[attackingTerritory.owner - 1];
    var defender = this.players[defendingTerritory.owner - 1];
    var attackingUnits = attackingTerritory.occupyingUnits;
    var defendingUnits = defendingTerritory.occupyingUnits;
    var attackersKilled = 0;
    var defendersKilled = 0;
    var attackingRoll = [];
    var defendingRoll = [];
    var territoryConquered = false;
    var defenderWipedOut = false;
    var comparisons = 1;

    if (attackingTerritory.owner === defendingTerritory.owner) {
        console.error("Territory " + from + " can't attack territory " +
            to + " because Player can't attack his own territory.");
        return false;
    }
    if (!attackingTerritory.adjacentTerritories.includes(to) ||
        !defendingTerritory.adjacentTerritories.includes(from)) {
        console.error("Territory " + from + " can't attack territory " +
            to + " because they are not adjacent.");
        return false;
    }
    if (attackingUnits < 2) {
        console.error("Territory " + from + " can't attack territory " +
            to + " because attacking territory does not have enough units.");
        return false;
    }

    //clear previous attack info
    this.lastAttackDetails = null;

    switch (attackingUnits) {
        case 1:
            return; //this man should NOT be able to attack.
        case 2:
            attackingRoll = this.rollDice(1);
            break;
        case 3:
            attackingRoll = this.rollDice(2);
            break;
        default:
            attackingRoll = this.rollDice(3);
    }
    switch (defendingUnits) {
        case 1:
            defendingRoll = this.rollDice(1);
            break;
        default:
            defendingRoll = this.rollDice(2);
    }

    console.log(attacker.name + " rolls " + attackingRoll);
    console.log(defender.name + " rolls " + defendingRoll);

    comparisons = Math.min(attackingRoll.length, defendingRoll.length);
    for (var roll = 0; roll < comparisons; ++roll) {
        if (attackingRoll[roll] > defendingRoll[roll]) {
            defendersKilled++;
        } else attackersKilled++;
    }

    attackingUnits -= attackersKilled;
    defendingUnits -= defendersKilled;

    //Assign new occupyingUnits values to each territory after
    //each attack round. Meaning, subtract dead units.
    attackingTerritory.occupyingUnits = attackingUnits;
    defendingTerritory.occupyingUnits = defendingUnits;

    if (defendingUnits === 0) {
        // defender lost territory. Transfer it and move occupying units in.
        this.transferTerritory(defendingTerritory.id, defender.id,
            attacker.id);
        attackingTerritory.occupyingUnits -= attackingRoll.length;
        defendingTerritory.occupyingUnits += attackingRoll.length;

        territoryConquered = true;
        if (defender.isWipedOut()) {
            defenderWipedOut = true;
            //transfer RISK cards to winner.
        }
    }

    this.lastAttackDetails = {
        attacker: attacker,
        defender: defender,
        attackingTerritory: attackingTerritory,
        defendingTerritory: defendingTerritory,
        attackingRoll: attackingRoll,
        defendingRoll: defendingRoll,
        attackersKilled: attackersKilled,
        defendersKilled: defendersKilled,
        territoryConquered: territoryConquered,
        defenderWipedOut: defenderWipedOut
    };

    return true;
};

/*
 *  This function can be called in the fortification phase, but also after an
 *  attack to move more occupying units after an attack resulted in a conquer.
 */
Game.prototype.fortify = function(from, to, amount) {
    fromTerritory = this.territories[from - 1];
    toTerritory = this.territories[to - 1];
    if (fromTerritory.owner !== toTerritory.owner) {
        console.error("Can't make this fortifying move as fromTerritory" +
            " owner is not same as toTerritory owner. What is interface smoking?");
        return false;
    }
    if (amount > fromTerritory.occupyingUnits - 1) {
        console.error("Can't make this fortifying move as fromTerritory" +
            " has too few units. One must be left behind to defend.");
        return false;
    }
    fromTerritory.occupyingUnits -= amount;
    toTerritory.occupyingUnits += amount;
    return true;
};
