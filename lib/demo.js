var myGame = new Game();
var deploymentPhase;
var attackPhase;
var fortificationPhase;

var sound = {
    rtw: new Audio('./audio/08-rome-hq.mp3'),
    stamp: new Audio('./audio/thick-stamp.wav'),
    tick: new Audio('./audio/button-tick.wav'),
    armyOfDrums: new Audio('./audio/32-army-of-drums.mp3'),
    autumn: new Audio('./audio/03-autumn.mp3'),
    melancholy: new Audio('./audio/04-melancholy.mp3'),
    machineGun: new Audio('./audio/machine-gun.wav'),
    explosion: new Audio('./audio/explosion.mp3'),
    horn: new Audio('./audio/finale-horn.wav'),
    end: new Audio('./audio/end-sound.mp3')
};

var map = [
    ["0.0.49"],
    ["0.0.15", "1.5.6", "0.0.12", "5.10.2", "0.0.14"],
    ["0.0.3", "1.1.3", "0.0.2", "1.6.4", "0.0.4", "1.5.4", "0.0.5", "3.4.1", "3.6.2", "0.0.3", "5.11.1", "5.10.4", "5.12.6", "5.6.3", "0.0.4"],
    ["0.0.1", "1.1.4", "1.6.7", "0.0.4", "1.5.2", "0.0.2", "3.2.1", "0.0.3", "3.4.3", "3.6.3", "5.11.4", "5.10.3", "5.12.4", "5.6.5", "0.0.3"],
    ["0.0.1", "1.1.1", "0.0.2", "1.1.1", "1.2.4", "1.7.1", "0.0.2", "1.8.2", "0.0.10", "3.4.1", "0.0.1", "3.6.5", "5.11.4", "5.10.1", "5.4.3", "5.12.2", "5.6.1", "0.0.2", "5.6.1", "0.0.4"], // check england, asia 4 touching 6
    ["0.0.4", "1.2.4", "1.7.3", "1.8.4", "0.0.6", "3.1.2", "3.3.3", "3.6.5", "5.1.3", "5.11.1", "5.10.1", "5.4.4", "5.8.1", "5.4.1", "5.6.1", "0.0.6"],
    ["0.0.4", "1.9.4", "1.4.2", "1.7.1", "1.8.1", "1.4.1", "1.8.1", "0.0.8", "3.7.2", "3.5.3", "3.6.3", "5.1.5", "5.2.1", "5.8.6", "5.6.1", "0.0.6"],
    ["0.0.3", "1.9.5", "1.4.3", "0.0.10", "3.7.2", "0.0.2", "3.5.1", "5.7.3", "3.6.1", "0.0.1", "5.1.3", "5.2.4", "5.8.2", "5.2.1", "5.8.1", "0.0.2", "5.5.1", "0.0.4"],
    ["0.0.3", "1.9.3", "1.4.5", "0.0.10", "4.5.3", "0.0.4", "5.7.4", "5.3.3", "5.2.6", "0.0.1", "5.8.1", "5.5.2", "0.0.4"],
    ["0.0.4", "1.3.2", "1.4.4", "0.0.11", "4.5.3", "4.3.4", "5.7.4", "5.3.4", "5.2.6", "0.0.7"],
    ["0.0.5", "1.3.2", "0.0.13", "4.5.4", "4.3.4", "0.0.1", "5.7.3", "0.0.2", "5.3.4", "5.9.1", "5.2.3", "0.0.7"],
    ["0.0.5", "1.3.3", "0.0.2", "1.3.2", "0.0.8", "4.5.6", "4.2.3", "5.7.3", "0.0.2", "5.3.2", "0.0.2", "5.9.2", "0.0.2", "6.2.1", "0.0.6"],
    ["0.0.8", "1.3.1", "0.0.11", "4.5.6", "4.2.4", "0.0.5", "5.3.1", "0.0.3", "5.9.2", "0.0.1", "6.2.1", "0.0.6"],
    ["0.0.8", "1.3.1", "2.4.4", "0.0.7", "4.5.5", "4.1.2", "4.2.4", "0.0.4", "5.3.1", "0.0.13"],
    ["0.0.9", "2.4.2", "2.2.3", "0.0.10", "4.1.4", "4.2.2", "0.0.9", "6.2.1", "0.0.1", "6.2.1", "0.0.7"],
    ["0.0.9", "2.3.2", "2.2.5", "0.0.8", "4.1.4", "4.2.1", "0.0.10", "6.2.1", "0.0.2", "6.2.1", "0.0.1", "6.3.3", "0.0.2"],
    ["0.0.9", "2.3.2", "2.2.6", "0.0.8", "4.6.1", "4.1.1", "4.6.1", "4.2.1", "0.0.20"],
    ["0.0.10", "2.3.3", "2.2.3", "0.0.8", "4.6.5", "0.0.1", "4.4.1", "0.0.12", "6.4.1", "6.1.1", "0.0.1", "6.1.1", "0.0.2"],
    ["0.0.11", "2.3.2", "2.2.3", "0.0.9", "4.6.3", "0.0.2", "4.4.1", "0.0.11", "6.4.2", "6.1.3", "0.0.2"],
    ["0.0.11", "2.1.2", "2.3.1", "2.2.1", "0.0.10", "4.6.3", "0.0.13", "6.4.3", "6.1.3", "0.0.2"],
    ["0.0.11", "2.1.3", "2.2.1", "0.0.10", "4.6.2", "0.0.14", "6.4.4", "6.1.2", "0.0.2"],
    ["0.0.11", "2.1.3", "0.0.30", "6.1.2", "0.0.3"],
    ["0.0.11", "2.1.2", "0.0.31", '6.1.1', "0.0.4"],
    ["0.0.12", "2.1.1", "0.0.36"],
    ["0.0.12", "0.0.37"],
];

// use territoryID as index, element is an array with row and column ([row, col])
// of where that territories center is. index 0 is empty array because there is
// no territory 0
var territoryCenters = [
    [],
    [3, 3],
    [5, 6],
    [11, 6],
    [8, 9],
    [2, 18],
    [3, 7],
    [5, 9],
    [5, 12],
    [7, 5],
    [21, 11],
    [16, 14],
    [17, 10],
    [13, 11],
    [5, 21],
    [3, 20],
    [5, 24],
    [3, 24],
    [7, 25],
    [4, 28],
    [7, 22],
    [14, 26],
    [13, 28],
    [10, 26],
    [18, 30],
    [11, 22],
    [19, 26],
    [6, 32],
    [9, 39],
    [10, 34],
    [5, 38],
    [8, 44],
    [3, 44],
    [9, 29],
    [6, 40],
    [12, 39],
    [2, 34],
    [3, 31],
    [3, 39],
    [19, 46],
    [14, 41],
    [15, 46],
    [19, 41]
];

var messages = {
    welcome: "Hello, Are you ready to start a war?<br>Let's play!",
    howManyPlayers: "How many people will be playing?",
    fortifyTerritories: function(playerID) {
        return "Player " + playerID + ", Deploy your troops.";
    }

};

/*
 *  Used to verify that values in mapArray are valid. Populating the map
 *  array was a lot of busy work. That work was very error-prone!
 */
function checkMapValidity(mapArray) {
    for (var i = 0; i < mapArray.length; ++i) {
        var rowTotal = 0;
        for (var j = 0; j < mapArray[i].length; ++j) {
            var data = mapArray[i][j];
            var dataSplit = data.split(".");
            if (dataSplit.length !== 3) console.log("fallo " + data);
            for (var k = 0; k < dataSplit.length; ++k) {
                if (isNaN(dataSplit[k])) console.log("not a number " + data);
            }
            rowTotal += parseInt(dataSplit[2]);
        }
        if (rowTotal != 49) console.log("row total = " + rowTotal + " on row " + i);
    }
}

/*
 *  This function is only used to generate mapPixel divs in the HTML. Once
 *  generated, copy contents to index.html. You can make changes to mapArray
 *  to change mapPixel info like which territory it represents, etc.
 */
function createDivs(mapArray) {
    for (var i = 0; i < mapArray.length; ++i) {
        var rowDiv = document.createElement("div");
        var pixelCol = 0;
        rowDiv.setAttribute('class', 'row');

        for (var j = 0; j < mapArray[i].length; ++j) {
            var data = mapArray[i][j];
            var dataSplit = data.split(".");
            var continentID = parseInt(dataSplit[0]);
            var territoryID = parseInt(dataSplit[1]);
            var pixelTimes = parseInt(dataSplit[2]);

            // try to get correct territoryID.
            for (var k = 0; k < myGame.territories.length; ++k) {
                if (myGame.territories[k].continentID === continentID) {
                    var firstTerritoryID = myGame.territories[k].id;
                    territoryID += firstTerritoryID - 1;
                    break;
                }
            }

            for (var l = 0; l < pixelTimes; ++l, pixelCol++) {
                var colDiv = document.createElement('div');
                if (continentID === 0) {
                    colDiv.setAttribute('class', 'mapPixel');
                } else {
                    colDiv.setAttribute('class', 'mapPixel continent' + continentID +
                        " territory territory" + territoryID);
                }

                colDiv.setAttribute('row', i);
                colDiv.setAttribute('col', pixelCol);
                colDiv.setAttribute('territoryID', territoryID);
                colDiv.setAttribute('continentID', continentID);
                rowDiv.append(colDiv);
            }
        }
        var boardDiv = document.getElementById('board-pixel-container');
        boardDiv.append(rowDiv);
    }
}

function renderInfoBoxInfo(heading, msg) {
    var infoBoxInfoHeading = document.getElementById('info-box-info-heading');
    var infoBoxInfoP = document.getElementById('info-box-info-p');
    var headingPlayer = document.createElement('span');

    if (myGame.currentPlayer) {
        headingPlayer.id = 'heading-player';
        headingPlayer.setAttribute('style', 'color: ' + myGame.currentPlayer.color);
        headingPlayer.innerHTML = "Player " + myGame.currentPlayer.id;
        infoBoxInfoHeading.innerHTML = "";
        infoBoxInfoHeading.append(headingPlayer);
    }

    infoBoxInfoHeading.innerHTML += heading;
    infoBoxInfoP.innerHTML = msg;
}

function renderStatusBoxInfo(msg) {
    var statusBoxp = document.getElementById('status-box-p');
    statusBoxp.innerHTML = msg;
}

//this button ends deploymentPhase, attackPhase, and fortificationPhase
function doneClick() {
    switch (myGame.phase) {
        case -1:
            break;
        case 0:
            myGame.changePhase();
            // must deploy the troops
            var territoriesDeploy = Object.keys(deploymentPhase.territories);
            for (var i = 0; i < territoriesDeploy.length; ++i) {
                var territoryID = parseInt(territoriesDeploy[i]);
                var unitsToAdd = deploymentPhase.territories[territoryID].add;
                myGame.currentPlayer.unitsToDeploy -= unitsToAdd;
                myGame.deploy(territoryID, unitsToAdd);
            }
            sound.autumn.pause();
            sound.autumn.currentTime = 0;
            sound.armyOfDrums.play();
            renderAttackPhaseControls();
            break;
        case 1:
            myGame.changePhase();
            sound.armyOfDrums.pause();
            sound.armyOfDrums.currentTime = 0;
            sound.autumn.play();
            renderFortifyPhaseControls();
            break;
        case 2:
            if (fortificationPhase.set) {
                myGame.fortify(fortificationPhase.fromTerritory.id,
                    fortificationPhase.toTerritory.id, fortificationPhase.unitsToMove);
                // print message of how many were moved.
            }
            myGame.changePhase();
            myGame.changePlayer();
            renderDeployPhaseControls();
    }
    sound.end.play();

}

function fortificationPhaseCancelClick() {
    var fromTerritory = fortificationPhase.fromTerritory;
    var toTerritory = fortificationPhase.toTerritory;
    var fromTerritoryElem = document.getElementById('from-territory');
    var toTerritoryElem = document.getElementById('to-territory');
    var fromArmyStack = null;
    var toArmyStack = null;
    if (fromTerritory) {
        fromArmyStack = document.getElementById('territory' + fromTerritory.id).firstElementChild;
    }
    if (toTerritory) {
        toArmyStack = document.getElementById('territory' + toTerritory.id).firstElementChild;
    }

    if (fromArmyStack) {
        fromArmyStack.firstElementChild.innerHTML = fortificationPhase.unitsFromBeforeFortify;
    }
    if (toArmyStack) {
        toArmyStack.firstElementChild.innerHTML = fortificationPhase.unitsToBeforeFortify;
    }
    fromTerritoryElem.innerHTML = '';
    toTerritoryElem.innerHTML = '';
    fortificationPhase.clear();
}

function fortificationPhaseMinusClick() {
    if (!fortificationPhase.set) return;
    var fromTerritory = fortificationPhase.fromTerritory;
    var toTerritory = fortificationPhase.toTerritory;
    if (fromTerritory && toTerritory) {
        var fromArmyStack = document.getElementById('territory' + fromTerritory.id).firstElementChild;
        var toArmyStack = document.getElementById('territory' + toTerritory.id).firstElementChild;

        if (fortificationPhase.unitsToMove > 0) {
            fortificationPhase.unitsToMove--;
            fromArmyStack.firstElementChild.innerHTML = fortificationPhase.unitsFromBeforeFortify - fortificationPhase.unitsToMove;
            toArmyStack.firstElementChild.innerHTML = fortificationPhase.unitsToBeforeFortify + fortificationPhase.unitsToMove;
            sound.tick.pause();
            sound.tick.currentTime = 0;
            sound.tick.play();
        }
    }
}

function fortificationPhasePlusClick() {
    if (!fortificationPhase.set) return;
    var fromTerritory = fortificationPhase.fromTerritory;
    var toTerritory = fortificationPhase.toTerritory;
    if (fromTerritory && toTerritory) {
        var fromArmyStack = document.getElementById('territory' + fromTerritory.id).firstElementChild;
        var toArmyStack = document.getElementById('territory' + toTerritory.id).firstElementChild;

        if (fortificationPhase.unitsFromBeforeFortify - fortificationPhase.unitsToMove > 1) {
            fortificationPhase.unitsToMove++;
            fromArmyStack.firstElementChild.innerHTML = fortificationPhase.unitsFromBeforeFortify - fortificationPhase.unitsToMove;
            toArmyStack.firstElementChild.innerHTML = fortificationPhase.unitsToBeforeFortify + fortificationPhase.unitsToMove;
            sound.tick.pause();
            sound.tick.currentTime = 0;
            sound.tick.play();
        }
    }
}

function fortificationPhaseTerritoryClick() {
    var player = myGame.currentPlayer;
    var territoryID = parseInt(this.getAttribute('territoryID'));
    var territory = myGame.territories[territoryID - 1];
    var fromTerritoryElem = document.getElementById('from-territory');
    var toTerritoryElem = document.getElementById('to-territory');

    // player must press CANCEL to choose new territories.
    if (fortificationPhase.set) return;

    if (player.ownTerritory(territoryID)) {
        // if there is no fromTerritory set, set it with this one if enough troops
        // else if this territory is adjacent to fromTerritory, set toTerritory

        if (!fortificationPhase.fromTerritory) {
            if (territory.occupyingUnits > 1) {
                fortificationPhase.fromTerritory = territory;
                fortificationPhase.unitsFromBeforeFortify = territory.occupyingUnits;
                fromTerritoryElem.innerHTML = territory.name;
                sound.stamp.pause();
                sound.stamp.currentTime = 0;
                sound.stamp.play();
            }
        } else {
            if (territory.adjacentTerritories.includes(fortificationPhase.fromTerritory.id)) {
                fortificationPhase.toTerritory = territory;
                fortificationPhase.unitsToBeforeFortify = territory.occupyingUnits;
                fortificationPhase.set = true;
                toTerritoryElem.innerHTML = territory.name;
                sound.stamp.pause();
                sound.stamp.currentTime = 0;
                sound.stamp.play();
            }
        }
    }
}

function renderFortifyPhaseControls() {
    var infoBoxControlsDiv = document.getElementById('info-box-controls');
    var territoryCenterDivs = document.getElementsByClassName('territory-center');
    infoBoxControlsDiv.innerHTML = "";
    var player = myGame.currentPlayer;

    var fromHeadingElem = document.createElement('p');
    var fromTerritoryElem = document.createElement('p');
    var toHeadingElem = document.createElement('p');
    var toTerritoryElem = document.createElement('p');
    var minusButton = document.createElement('button');
    var plusButton = document.createElement('button');
    var cancelButton = document.createElement('button');
    var doneButton = document.createElement('button');

    renderInfoBoxInfo(" : FORTIFY", "You can move units from ONE " +
        "of your territories to ONE adjacent territory. Press CANCEL" +
      " to clear territory fields.");

    fromHeadingElem.setAttribute('class', 'info-box-controls-heading');
    toHeadingElem.setAttribute('class', 'info-box-controls-heading');
    fromTerritoryElem.setAttribute('class', 'info-box-controls-territory');
    fromTerritoryElem.id = 'from-territory';
    toTerritoryElem.setAttribute('class', 'info-box-controls-territory');
    toTerritoryElem.id = 'to-territory';
    minusButton.setAttribute('class', 'info-box-controls-math-button');
    minusButton.id = 'minus-button';
    plusButton.setAttribute('class', 'info-box-controls-math-button');
    plusButton.id = 'plus-button';
    cancelButton.setAttribute('class', 'info-box-controls-action-button');
    cancelButton.id = 'cancel-button';
    doneButton.setAttribute('class', 'info-box-controls-action-button');
    doneButton.id = 'done-button';

    fromHeadingElem.innerHTML = 'From:';
    toHeadingElem.innerHTML = 'To:';
    cancelButton.innerHTML = 'CANCEL';
    doneButton.innerHTML = 'FORTIFY';
    minusButton.innerHTML = '-';
    plusButton.innerHTML = '+';

    infoBoxControlsDiv.append(fromHeadingElem);
    infoBoxControlsDiv.append(fromTerritoryElem);
    infoBoxControlsDiv.append(toHeadingElem);
    infoBoxControlsDiv.append(toTerritoryElem);
    infoBoxControlsDiv.append(minusButton);
    infoBoxControlsDiv.append(plusButton);
    infoBoxControlsDiv.append(cancelButton);
    infoBoxControlsDiv.append(doneButton);

    this.fortificationPhase = new FortificationPhase(myGame);
    for (var i = 0; i < territoryCenterDivs.length; ++i) {
        var territoryCenterDiv = territoryCenterDivs[i];
        var armyStackElem = territoryCenterDiv.firstElementChild;
        armyStackElem.onclick = fortificationPhaseTerritoryClick;
    }

    cancelButton.onclick = fortificationPhaseCancelClick;
    minusButton.onclick = fortificationPhaseMinusClick;
    plusButton.onclick = fortificationPhasePlusClick;
    doneButton.onclick = doneClick;
}

function attackPhaseMoveDoneClick() {
    myGame.fortify(attackPhase.movePhaseFromTerritory.id, attackPhase.movePhaseToTerritory.id,
        attackPhase.unitsToMove);
    renderAttackPhaseControls();
}

function attackPhaseMoveMinusClick() {
    var fromTerritory = attackPhase.movePhaseFromTerritory;
    var toTerritory = attackPhase.movePhaseToTerritory;
    var armyStackFrom = document.getElementById('territory' + fromTerritory.id).firstElementChild;
    var armyStackTo = document.getElementById('territory' + toTerritory.id).firstElementChild;

    if (attackPhase.unitsToMove > 0) {
        attackPhase.unitsToMove--;
        armyStackFrom.firstElementChild.innerHTML = attackPhase.unitsFromBeforeOccupy - attackPhase.unitsToMove;
        armyStackTo.firstElementChild.innerHTML = attackPhase.unitsToBeforeOccupy + attackPhase.unitsToMove;
        sound.tick.pause();
        sound.tick.currentTime = 0;
        sound.tick.play();
    }
}

function attackPhaseMovePlusClick() {
    var fromTerritory = attackPhase.movePhaseFromTerritory;
    var toTerritory = attackPhase.movePhaseToTerritory;
    var armyStackFrom = document.getElementById('territory' + fromTerritory.id).firstElementChild;
    var armyStackTo = document.getElementById('territory' + toTerritory.id).firstElementChild;

    if (attackPhase.unitsFromBeforeOccupy - attackPhase.unitsToMove > 1) {
        attackPhase.unitsToMove++;
        armyStackFrom.firstElementChild.innerHTML = attackPhase.unitsFromBeforeOccupy - attackPhase.unitsToMove;
        armyStackTo.firstElementChild.innerHTML = attackPhase.unitsToBeforeOccupy + attackPhase.unitsToMove;
        sound.tick.pause();
        sound.tick.currentTime = 0;
        sound.tick.play();
    }
}

function renderAttackPhaseMoveControls() {
    var infoBoxControlsDiv = document.getElementById('info-box-controls');
    infoBoxControlsDiv.innerHTML = "";
    var player = myGame.currentPlayer;

    var moveHeadingElem = document.createElement('p');
    var minusButton = document.createElement('button');
    var plusButton = document.createElement('button');
    var doneButton = document.createElement('button');

    renderInfoBoxInfo(" : MOVE IN", "Choose how many troops " +
        "to occupy your new territory!");

    moveHeadingElem.setAttribute('class', 'info-box-controls-heading');
    moveHeadingElem.innerHTML = 'Move after conquer:';
    minusButton.setAttribute('class', 'info-box-controls-math-button');
    minusButton.id = 'minus-button';
    minusButton.innerHTML = "-";
    plusButton.setAttribute('class', 'info-box-controls-math-button');
    plusButton.id = 'plus-button';
    plusButton.innerHTML = '+';
    doneButton.setAttribute('class', 'info-box-controls-action-button');
    doneButton.id = 'done-button';
    doneButton.innerHTML = 'DONE';

    infoBoxControlsDiv.append(moveHeadingElem);
    infoBoxControlsDiv.append(minusButton);
    infoBoxControlsDiv.append(plusButton);
    infoBoxControlsDiv.append(doneButton);

    minusButton.onclick = attackPhaseMoveMinusClick;
    plusButton.onclick = attackPhaseMovePlusClick;

    doneButton.onclick = attackPhaseMoveDoneClick;

}

function attackPhaseAttackClick() {
    var fromTerritory = attackPhase.fromTerritory;
    var toTerritory = attackPhase.toTerritory;

    if (!(fromTerritory && toTerritory)) return;
    var armyStackFrom = document.getElementById('territory' + fromTerritory.id).firstElementChild;
    var armyStackTo = document.getElementById('territory' + toTerritory.id).firstElementChild;

    myGame.attack(fromTerritory.id, toTerritory.id);
    armyStackFrom.firstElementChild.innerHTML = fromTerritory.occupyingUnits;
    armyStackTo.firstElementChild.innerHTML = toTerritory.occupyingUnits;

    var attacker = myGame.lastAttackDetails.attacker;
    var defender = myGame.lastAttackDetails.defender;
    var attackingRoll = myGame.lastAttackDetails.attackingRoll;
    var defendingRoll = myGame.lastAttackDetails.defendingRoll;
    var attackersLost = myGame.lastAttackDetails.attackersKilled;
    var defendersLost = myGame.lastAttackDetails.defendersKilled;
    var territoryConquered = myGame.lastAttackDetails.territoryConquered;

    // display message;
    var msg = "Player " + attacker.id + " attacks " + toTerritory.name + "!";
    msg += "<br><br>Player " + attacker.id + " rolls:<br>" + attackingRoll;
    msg += "<br><br>Player " + defender.id + " rolls:<br>" + defendingRoll;
    if (attackersLost > 0) {
        msg += "<br><br>Player " + attacker.id + " lost " + attackersLost + " soldiers!";
    }
    if (defendersLost > 0) {
        msg += "<br><br>Player " + defender.id + " lost " + defendersLost + " soldiers!";
    }
    if (territoryConquered) {
        msg += "<br><br>" + toTerritory.name + " has been taken!";
    }

    if (attackersLost > 1 || defendersLost > 1) sound.explosion.play();
    else sound.machineGun.play();
    renderStatusBoxInfo(msg);

    if (territoryConquered) {
        var conquerer = myGame.players[fromTerritory.owner - 1];
        armyStackTo.setAttribute('style', 'background-color: ' + conquerer.color);
        sound.horn.play();

        // check if game is over.
        var winner = myGame.isGameOver();
        if (winner){
          alert('Player' + winner + " WINS!");
        }

        if (fromTerritory.occupyingUnits > 1) {
            attackPhase.movePhaseFromTerritory = fromTerritory;
            attackPhase.movePhaseToTerritory = toTerritory;
            renderAttackPhaseMoveControls();
        }

    }
    attackPhase.unitsFromBeforeOccupy = fromTerritory.occupyingUnits;
    attackPhase.unitsToBeforeOccupy = toTerritory.occupyingUnits;
}

function attackPhaseTerritoryClick() {
    var player = myGame.currentPlayer;
    var territoryID = parseInt(this.getAttribute('territoryID'));
    var territory = myGame.territories[territoryID - 1];
    var toTerritoryElem = document.getElementById('to-territory');
    var fromTerritoryElem = document.getElementById('from-territory');

    if (player.ownTerritory(territoryID) && territory.occupyingUnits > 1) {
        sound.stamp.pause();
        sound.stamp.currentTime = 0;
        sound.stamp.play();
        attackPhase.toTerritory = null;
        toTerritoryElem.innerHTML = "";
        attackPhase.fromTerritory = territory;
        fromTerritoryElem.innerHTML = territory.name;
    } else {
        if (attackPhase.fromTerritory && !player.ownTerritory(territoryID) &&
            attackPhase.fromTerritory.adjacentTerritories.includes(territoryID)) {
            sound.stamp.pause();
            sound.stamp.currentTime = 0;
            sound.stamp.play();
            attackPhase.toTerritory = territory;
            toTerritoryElem.innerHTML = territory.name;
        }
    }
}

function renderAttackPhaseControls() {
    var infoBoxControlsDiv = document.getElementById('info-box-controls');
    infoBoxControlsDiv.innerHTML = "";
    var player = myGame.currentPlayer;

    var fromHeadingElem = document.createElement('p');
    var fromTerritoryElem = document.createElement('p');
    var toHeadingElem = document.createElement('p');
    var toTerritoryElem = document.createElement('p');
    var attackButton = document.createElement('button');
    var doneButton = document.createElement('button');

    renderStatusBoxInfo('');
    renderInfoBoxInfo(" : ATTACK", "Choose one of your territories " +
        "to attack from and an adjacent territory to attack.");

    fromHeadingElem.setAttribute('class', 'info-box-controls-heading');
    toHeadingElem.setAttribute('class', 'info-box-controls-heading');
    fromTerritoryElem.setAttribute('class', 'info-box-controls-territory');
    fromTerritoryElem.id = 'from-territory';
    toTerritoryElem.setAttribute('class', 'info-box-controls-territory');
    toTerritoryElem.id = 'to-territory';
    attackButton.setAttribute('class', 'info-box-controls-action-button');
    attackButton.id = 'done-button';
    doneButton.setAttribute('class', 'info-box-controls-action-button');
    doneButton.id = 'attack-button';

    fromHeadingElem.innerHTML = 'From:';
    toHeadingElem.innerHTML = 'To:';
    attackButton.innerHTML = 'ATTACK';
    doneButton.innerHTML = 'DONE';

    infoBoxControlsDiv.append(fromHeadingElem);
    infoBoxControlsDiv.append(fromTerritoryElem);
    infoBoxControlsDiv.append(toHeadingElem);
    infoBoxControlsDiv.append(toTerritoryElem);
    infoBoxControlsDiv.append(attackButton);
    infoBoxControlsDiv.append(doneButton);

    attackPhase = new AttackPhase(myGame);
    var territoryCenterDivs = document.getElementsByClassName('territory-center');
    for (var i = 0; i < territoryCenterDivs.length; ++i) {
        var territoryCenterDiv = territoryCenterDivs[i];
        var armyStackDiv = territoryCenterDiv.firstElementChild;
        armyStackDiv.onclick = attackPhaseTerritoryClick;
    }
    attackButton.onclick = attackPhaseAttackClick;
    doneButton.onclick = doneClick;
}

function deployPhaseMinusClick() {
    var currentTerritory = deploymentPhase.currentTerritory;
    if (!currentTerritory) return;

    var troopsToDeployAmountElem = document.getElementById('troops-to-deploy');
    var currentPlayer = myGame.currentPlayer;
    var currentTerritoryDiv = document.getElementById('territory' + currentTerritory.id);
    var armyStackDiv = currentTerritoryDiv.firstElementChild;
    var armyStackAmount = armyStackDiv.firstElementChild;

    if (currentTerritory && deploymentPhase.territories[currentTerritory.id].add > 0) {
        deploymentPhase.unitsToDeploy++;
        deploymentPhase.territories[currentTerritory.id].add--;
        sound.tick.pause();
        sound.tick.currentTime = 0;
        sound.tick.play();

        //paint it;
        troopsToDeployAmountElem.innerHTML = deploymentPhase.unitsToDeploy;
        armyStackAmount.innerHTML =
            deploymentPhase.territories[currentTerritory.id].start +
            deploymentPhase.territories[currentTerritory.id].add;
    }
}

function deployPhasePlusClick() {
    var currentTerritory = deploymentPhase.currentTerritory;
    if (!currentTerritory) return;

    var troopsToDeployAmountElem = document.getElementById('troops-to-deploy');
    var currentPlayer = myGame.currentPlayer;
    var currentTerritoryDiv = document.getElementById('territory' + currentTerritory.id);
    var armyStackDiv = currentTerritoryDiv.firstElementChild;
    var armyStackAmount = armyStackDiv.firstElementChild;

    if (currentTerritory && deploymentPhase.unitsToDeploy > 0) {
        deploymentPhase.unitsToDeploy--;
        deploymentPhase.territories[currentTerritory.id].add++;
        sound.tick.pause();
        sound.tick.currentTime = 0;
        sound.tick.play();

        //paint it;
        troopsToDeployAmountElem.innerHTML = deploymentPhase.unitsToDeploy;
        armyStackAmount.innerHTML =
            deploymentPhase.territories[currentTerritory.id].start +
            deploymentPhase.territories[currentTerritory.id].add;
    }
}

function deployPhaseTerritoryClick() {
    var territoryID = parseInt(this.getAttribute('territoryID'));
    var territory = myGame.territories[territoryID - 1];
    var infoControlTerritoryElem = document.getElementById('to-territory');

    sound.stamp.pause();
    sound.stamp.currentTime = 0;
    sound.stamp.play();
    deploymentPhase.currentTerritory = territory;
    infoControlTerritoryElem.innerHTML = territory.name;
}

function renderDeployPhaseControls() {

    var infoBoxControlsDiv = document.getElementById('info-box-controls');
    infoBoxControlsDiv.innerHTML = "";
    var player = myGame.currentPlayer;
    var troopsRemainingHeadingElem = document.createElement('p');
    var troopRemainingAmountElem = document.createElement('p');
    var territoryElem = document.createElement('span');
    var troopsToDeployElem = document.createElement('span');
    var minusButton = document.createElement('button');
    var plusButton = document.createElement('button');
    var resetButton = document.createElement('button');
    var doneButton = document.createElement('button');
    var recruitsReceived = myGame.distributeReinforcements(player.id);
    var statusBoxText = "Player " + player.id + " received " + recruitsReceived +
          " troops.";

    if (!player.alive) {
        distributeAndPaintNeutrals();
        myGame.changePlayer();
        renderDeployPhaseControls();
        return;
    }

    renderInfoBoxInfo(" : DEPLOY", "Deploy your recruits to your " +
        "territories.");
    renderStatusBoxInfo(statusBoxText);


    troopsRemainingHeadingElem.setAttribute('class', 'info-box-controls-heading');
    troopRemainingAmountElem.setAttribute('class', 'info-box-controls-amount');
    troopRemainingAmountElem.id = 'troops-to-deploy';
    territoryElem.setAttribute('class', 'info-box-controls-territory');
    territoryElem.id = 'to-territory';
    //troopsToDeployElem.setAttribute('class', 'info-box-controls-amount');
    minusButton.setAttribute('class', 'info-box-controls-math-button');
    minusButton.id = 'minus-button';
    plusButton.setAttribute('class', 'info-box-controls-math-button');
    plusButton.id = 'plus-button';
    resetButton.setAttribute('class', 'info-box-controls-action-button');
    resetButton.id = 'reset-button';
    doneButton.setAttribute('class', 'info-box-controls-action-button');
    doneButton.id = 'done-button';

    troopsRemainingHeadingElem.innerHTML = "Troops to Deploy:";
    troopRemainingAmountElem.innerHTML = player.unitsToDeploy;
    minusButton.innerHTML = '-';
    plusButton.innerHTML = '+';
    resetButton.innerHTML = 'RESET';
    doneButton.innerHTML = 'DEPLOY';

    infoBoxControlsDiv.append(troopsRemainingHeadingElem);
    infoBoxControlsDiv.append(troopRemainingAmountElem);
    infoBoxControlsDiv.append(minusButton);
    infoBoxControlsDiv.append(territoryElem);
    infoBoxControlsDiv.append(plusButton);
    //infoBoxControlsDiv.append(resetButton);
    infoBoxControlsDiv.append(doneButton);

    deploymentPhase = new DeploymentPhase(myGame);
    var territoryCenterDivs = document.getElementsByClassName('territory-center');
    for (var i = 0; i < territoryCenterDivs.length; ++i) {
        var territoryCenterDiv = territoryCenterDivs[i];
        var armyStackDiv = territoryCenterDiv.getElementsByClassName('army-stack')[0];
        var divTerritoryID = parseInt(territoryCenterDiv.getAttribute('territoryID'));
        if (myGame.currentPlayer.territories.includes(divTerritoryID)) {
            armyStackDiv.onclick = deployPhaseTerritoryClick;
        }
    }

    plusButton.onclick = deployPhasePlusClick;
    minusButton.onclick = deployPhaseMinusClick;
    // set reset button onclick
    doneButton.onclick = doneClick;
}

function distributeAndPaintNeutrals() {
    var player = myGame.currentPlayer;
    myGame.deployUnitsEvenly(player.id);

    var armyStackDivs = document.getElementsByClassName('army-stack');
    for (var i = 0; i < armyStackDivs.length; ++i) {
        var armyStackDiv = armyStackDivs[i];
        var territoryID = parseInt(armyStackDiv.getAttribute('territoryID'));
        var territory = myGame.territories[territoryID - 1];
        armyStackDiv.firstElementChild.innerHTML = territory.occupyingUnits;
    }
}

function initialDeploymentTerritoryClick() {
    //add a unit to current players territory
    //change currentPlayer and call renderInitialDeployment

    var player = myGame.currentPlayer;
    var territoryID = parseInt(this.getAttribute('territoryID'));
    var territory = myGame.territories[territoryID - 1];
    var armyStackAmountElem = this.firstElementChild;
    var statusBoxText = "Player " + player.id + " place a unit in " +
            territory.name;

    if (player.ownTerritory(territoryID)) {
        player.unitsToDeploy--;
        myGame.deploy(territoryID, 1);
        armyStackAmountElem.innerHTML = territory.occupyingUnits;
        sound.stamp.pause();
        sound.stamp.currentTime = 0;
        sound.stamp.play();
        renderStatusBoxInfo(statusBoxText);
        myGame.changePlayer();
        renderInitialDeployment();
    }
}

function renderInitialDeployment() {
    var infoBoxControlsDiv = document.getElementById('info-box-controls');
    infoBoxControlsDiv.innerHTML = "";

    var player = myGame.currentPlayer;
    var troopsRemainingHeadingElem = document.createElement('p');
    var troopRemainingAmountElem = document.createElement('p');

    if (!player.alive) {
        distributeAndPaintNeutrals();
        myGame.changePlayer();
        renderInitialDeployment();
        return;
    } else if (player.unitsToDeploy === 0) {
        myGame.changePhase();
        renderDeployPhaseControls();
        return;
    } else {
        renderInfoBoxInfo(" : INITIAL DEPLOYMENT", "Choose one of your territories" +
            " to place a unit. We alternate players until all troops are deployed.");

        troopsRemainingHeadingElem.setAttribute('class', 'info-box-controls-heading');
        troopRemainingAmountElem.setAttribute('class', 'info-box-controls-amount');
        troopRemainingAmountElem.id = 'troops-to-deploy';
        troopsRemainingHeadingElem.innerHTML = "Troops to Deploy:";
        troopRemainingAmountElem.innerHTML = player.unitsToDeploy;

        infoBoxControlsDiv.append(troopsRemainingHeadingElem);
        infoBoxControlsDiv.append(troopRemainingAmountElem);

        var territoryCenterDivs = document.getElementsByClassName('territory-center');
        for (var i = 0; i < territoryCenterDivs.length; ++i) {
            var armyStackDiv = territoryCenterDivs[i].firstElementChild;
            armyStackDiv.onclick = initialDeploymentTerritoryClick;
        }
    }
}

function initialDeployment() {
    myGame.currentPlayer = myGame.players[0];

    // for testing, deploy units and skip inital deployment.
    distributeAndPaintNeutrals();
    myGame.currentPlayer = myGame.players[1];
    distributeAndPaintNeutrals();
    myGame.currentPlayer = myGame.players[2];
    distributeAndPaintNeutrals();
    myGame.currentPlayer = myGame.players[0];

    renderInitialDeployment();
}

function createStacks() {
    var territory_centerDivs = document.getElementsByClassName('territory-center');
    for (var i = 0; i < territory_centerDivs.length; ++i) {
        var territory_centerDiv = territory_centerDivs[i];
        var territoryID = parseInt(territory_centerDiv.getAttribute('territoryID'));
        var territory = myGame.territories[territoryID - 1];
        var ownerID = territory.owner;
        var owner = myGame.players[ownerID - 1];
        var army_stack = document.createElement('div');
        var stackSize = document.createElement('p');
        stackSize.innerHTML = territory.occupyingUnits;
        army_stack.setAttribute('class', 'army-stack');
        army_stack.setAttribute('territoryID', territoryID);
        army_stack.setAttribute('style', 'background-color: ' + owner.color);
        army_stack.append(stackSize);
        territory_centerDiv.append(army_stack);
    }
}

/*
 *  Uncolor the mapPixels from start screen.
 */
function removeBackgroundColorOfDivs() {
    var divs = document.getElementsByClassName('territory');
    for (var i = 0; i < divs.length; ++i) {
        var div = divs[i];
        div.setAttribute('style', "background: rgba(54, 25, 25, 0)");
    }
}

function startButtonClick (){
  var titleBox = document.getElementById('title-box');
  titleBox.setAttribute('style', 'visibility: hidden');
  sound.rtw.pause();
  sound.currentTime = 0;
  sound.autumn.play();
  removeBackgroundColorOfDivs();
  renderStatusBoxInfo('');
  createStacks();
  initialDeployment();
}

function startGame() {
    var boardDiv = document.getElementById('board');
    var infoBoxControlsDiv = document.getElementById('info-box-controls');
    var titleBox = document.createElement('div');
    titleBox.id = 'title-box';
    boardDiv.append(titleBox);

    var startButton = document.createElement('button');
    var statusBoxText = "Player 1 (blue) will compete with Player" +
      " 2 (red) to take over the world. Each player is assigned territories at" +
      " random. Neutral player (grey) will mind his own business," +
      " but will defend himself if attacked. Deploy your troops efficiently to have" +
      " success on the battlefield.";
    startButton.setAttribute('class', 'info-box-controls-action-button');
    startButton.id = 'start-button';
    startButton.innerHTML = 'START';
    startButton.onclick = startButtonClick;

    infoBoxControlsDiv.append(startButton);
    renderInfoBoxInfo('RISK', messages.welcome);
    renderStatusBoxInfo(statusBoxText);
    sound.rtw.play();
}

/*
 *  Walks the mapPixels in index.html and assigns territory-centers based
 *  on territoryCenters.
 */
function setTerritoryCenters(territoryCenters) {
    for (var i = 1; i < territoryCenters.length; ++i) {
        var territoryCenterRow = territoryCenters[i][0];
        var territoryCenterCol = territoryCenters[i][1];
        var territoryDivs = document.getElementsByClassName('territory' + i);
        for (var j = 0; j < territoryDivs.length; ++j) {
            var territoryDiv = territoryDivs[j];
            if (territoryDiv.getAttribute('row') == territoryCenterRow &&
                territoryDiv.getAttribute('col') == territoryCenterCol) {
                territoryDiv.setAttribute('id', 'territory' + i);
                territoryDiv.className += " territory-center";
            }
        }
    }
}

setTerritoryCenters(territoryCenters);
myGame.start([new Player(1, 'anthony', "#2DC2BD"), new Player(2, 'gio', "#FC7A57")]);
startGame();
