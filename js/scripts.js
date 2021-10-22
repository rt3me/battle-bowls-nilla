const playerNameInput = document.querySelector("#nameInput");

const startGameBtn = document.querySelector("#startGame");
const attackButton = document.querySelector("#attackBtn");
const healButton = document.querySelector("#healBtn");

const playerNameSpan = document.querySelector("#playerName");
const enemyNameSpan = document.querySelector("#enemyName");
const playerHealthSpan = document.querySelector("#playerHealth");
const enemyHealthSpan = document.querySelector("#enemyHealth");
const playerDmgSpan = document.querySelector("#playerDmg");
const enemyDmgSpan = document.querySelector("#enemyDmg");
const enemiesDefeatedSpan = document.querySelector("#enemiesDefeated");
const playerHealCountSpan = document.querySelector("#healCount");
const gameLevelSpan = document.querySelector("#gameLevel");

const enemyNames = ["Shriek", "Figueroa", "Fuzz", "Dankey", "PuddinSnoots"];
const gameLevels = ["1", "2", "3", "4", "5"];

class Enemy {
  constructor(name, health, attackDmg) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDmg;
  }
  initializeEnemy () {
    // Create enemy with 10 health and random attack damage between 1 and 3
    this.name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
    enemyNameSpan.innerText = this.name;
    this.health = 10;
    enemyHealthSpan.innerText = this.health;
    this.attackDmg = Math.floor(Math.random() * 3) + 1; // Math.floor(Math.random() * (max - min + 1)) + min;
    enemyDmgSpan.innerText = this.attackDmg;
  }
}

class Player {
  constructor(name, health, attackDmg, healCount, enemiesDefeated) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDmg;
    this.healCount = healCount;
    this.enemiesDefeated = enemiesDefeated;
  }
  healPlayer () {
    if (this.health > 0 && this.health < 10 && this.healCount > 0) {
      this.healCount -= 1;
      playerHealCountSpan.innerText = this.healCount;
      this.health += 1;
      playerHealthSpan.innerText = this.health;
    }
  }
  initializePlayer() {
    // Initialize player with 10 health, random attack damage between 1 and 3,
    // heal count of 5, and initial enemies defeated of 0
    this.name = playerNameInput.value;
    playerNameSpan.innerText = this.name;
    this.health = 10;
    playerHealthSpan.innerText = this.health;
    this.attackDmg = Math.floor(Math.random() * 3) + 1; // Math.floor(Math.random() * (max - min + 1)) + min;
    playerDmgSpan.innerText = this.attackDmg;
    this.healCount = 10;
    playerHealCountSpan.innerText = this.healCount;
    this.enemiesDefeated = 0;
    enemiesDefeatedSpan.innerText = this.enemiesDefeated;
    this.level = 1;
    gameLevelSpan.innerText = gameLevels[this.level - 1];
  }
}

// Create player and enemy globally
const player = new Player(playerNameInput.value, 10, Math.floor(Math.random() * 3) + 1, 10, 0);
const enemy = new Enemy(enemyNames[Math.floor(Math.random() * enemyNames.length)], 10, Math.floor(Math.random() * 3) + 1);

function startGame() {
  if (playerNameInput.value) {
    player.initializePlayer();
    enemy.initializeEnemy();
  }
}

function playerAttack() {
  // Only allow attack if game is not over
  if (player.health && enemy.health) {
    // Player attacks
    // If enemy health is zero or greater after attack set it, otherwise set 0
    if (enemy.health - player.attackDmg >= 0) {
      enemy.health -= player.attackDmg;
    } else {
      enemy.health = 0;
    }
    enemyHealthSpan.innerText = enemy.health;

    // Only allow return attack if game is not over
    if (player.health && enemy.health) {
      // Enemy returns attack
      // If enemy health is zero or greater after attack, set it, otherwise set 0
      if (player.health - enemy.attackDmg >= 0) {
        player.health -= enemy.attackDmg;
      } else {
        player.health = 0;
      }
      playerHealthSpan.innerText = player.health;
    }

    // Why are the alerts occurring before the spans are being updated?
    if (enemy.health <= 0) {
      alert("You defeated an enemy!");
      player.level += 1;
      gameLevelSpan.innerText = gameLevels[player.level - 1];
      player.enemiesDefeated += 1;
      enemiesDefeatedSpan.innerText = player.enemiesDefeated;
      if (player.enemiesDefeated === 5) {
        alert("Game over, you won!")
      } else {
        enemy.initializeEnemy();
      }
    } else if (player.health <= 0) {
      alert("Game over, you dead!");
    }
  }
}

startGameBtn.addEventListener("click", startGame);
attackButton.addEventListener("click", playerAttack);
// Why did I have to use the arrow function to get the healPlayer method to work?
// Is it because the context of 'this' is being changed?
// https://stackoverflow.com/questions/7264656/using-an-object-method-as-an-event-listener
healButton.addEventListener("click", () => {
  player.healPlayer();
});