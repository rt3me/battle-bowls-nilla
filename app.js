const playerNameSpan = document.querySelector("#playerName");
const enemyNameSpan = document.querySelector("#enemyName");
const playerNameInput = document.querySelector("#nameInput");
const startGameBtn = document.querySelector("#startGame");

const userHealthSpan = document.querySelector("#userHealth");
const enemyHealthSpan = document.querySelector("#enemyHealth");
const userDmgSpan = document.querySelector("#userDmg");
const enemyDmgSpan = document.querySelector("#enemyDmg");

const attackButton = document.querySelector("#attackBtn");

const enemyNames = ["Shriek", "Figueroa", "Fuzz", "Dankey", "PuddinSnoots"];

class Player {
  constructor(name, health, attackDmg) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDmg;
  }
}
class Enemy {
  constructor(name, health, attackDmg) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDmg;
  }
}

// Declare player and enemy variable globally
const player = new Player();
const enemy = new Enemy();

function initializePlayer() {
  // Create player with 10 health and random attack damage between 1 and 3
  player.name = playerNameInput.value;
  playerNameSpan.innerText = player.name;
  player.health = 10;
  userHealthSpan.innerText = player.health;
  player.attackDmg = Math.floor(Math.random() * 3) + 1; // Math.floor(Math.random() * (max - min + 1)) + min;
  userDmgSpan.innerText = player.attackDmg;
}

function initializeEnemy () {
  // Create enemy with 10 health and random attack damage between 1 and 3
  enemy.name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
  enemyNameSpan.innerText = enemy.name;
  enemy.health = 10;
  enemyHealthSpan.innerText = enemy.health;
  enemy.attackDmg = Math.floor(Math.random() * 3) + 1; // Math.floor(Math.random() * (max - min + 1)) + min;
  enemyDmgSpan.innerText = enemy.attackDmg;
}

function startGame() {
  if (playerNameInput.value) {
    initializePlayer();
    initializeEnemy();
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
      enemy.health = 0
    }
    enemyHealthSpan.innerText = enemy.health;
    // Enemy returns attack
    // If enemy health is zero or greater after attack set it, otherwise set 0
    if (player.health - enemy.attackDmg >= 0) {
      player.health -= enemy.attackDmg;
    } else {
      player.health = 0
    }
    userHealthSpan.innerText = player.health;

    if (enemy.health <= 0) {
      alert("You win!");
    } else if (player.health <= 0) {
      alert("You dead!");
    }
  }
}

startGameBtn.addEventListener("click", startGame);
attackButton.addEventListener("click", playerAttack);