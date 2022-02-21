//function to generate a random numeric value
let randomNumber = function (min, max) {
  let value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

//function to set player name
let getPlayerName = function() {
  //initialize name variable BEFORE the while loop to guarantee entering the loop at least once
  let name = '';
  while (name === '' || name === null) {
    name = prompt('What is your robots name?');
  }
  console.log('Your robots name is ' + name);
  return name;
};

//PLAYER INFO
//FUNCTION WITHIN OBJECTS
let playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert('Refilling players health by 20 for 7 dollars.');
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert('You dont have enough money!');
    }
  },
  upgradeAttack: function () {
    if (this.money >=7) {
      window.alert('Upgrading players attack by 6 for 7 dollars.');
    this.attack += 6;
    this.money -= 7;
    } else {
      window.alert('You dont have enough money!');
    }
  }
};

//ENEMY INFO
let enemyInfo = [
  {
    name: 'Roborto',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Amy Android',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Robo Trumble',
    attack: randomNumber(10, 14)
  }
];
//above section was previously written out as:
// let enemy.names = ['Roborto', 'Amy Android', 'Robo Trumble'];
// let enemy.health = Math.floor(Math.random() * 21) + 40;      /* will pick random number from 20-60*/
// let enemy.attack = 12;



// FIGHT FUNCTION
let fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    let promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      let confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }
    //if player chooses to fight, fight
    if (promptFight === 'fight' || promptFight === 'FIGHT') {
      // generate random damage value based on player's attack power
      let damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
    }

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;
      console.log('player now has ' + playerInfo.money);

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // generate random damage value based on enemy's attack power
    let damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

//START GAME
let startGame = function () {
  // reset player stats
  playerInfo.reset();

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (let i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemy.names array
      let pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if player wants to use the store before next round
        let storeConfirm = window.confirm('The fight is over, visit the store before the next round?');

        //if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      } // if player isn't alive, stop the game
      else {
        //after loop ends, player is either out of health or enemies to fight so run endgame function
        endGame();
        break;
      }
    }
  }
};

//END GAME
let endGame = function () {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  let playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

//SHOP FUNCTION
let shop = function () {
  //ask player what they'd like to do
  let shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.'
  );
  //PARSEINT() METHOD TO CONVERT STRING DATA TYPE TO INTEGER
  shopOptionPrompt = parseInt(shopOptionPrompt);
  //SWITCH CONTROL FLOW STATEMENT
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert('Leaving the store.');
      //do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again');
      //call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// start the game when the page loads
startGame();
