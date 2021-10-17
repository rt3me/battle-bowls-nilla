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
  player.health = 10;
  player.attackDmg = Math.floor(Math.random() * 3);
  playerNameSpan.innerText = player.name;
}

function initializeEnemy () {
  // Create enemy with 10 health and random attack damage between 1 and 3
  enemy.name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
  enemy.health = 10;
  enemy.attackDmg = Math.floor(Math.random() * 3);
  enemyNameSpan.innerText = enemy.name;
}

function startGame() {
  initializePlayer();
  initializeEnemy();
  updateUI();
}

function updateUI() {
  userHealthSpan.innerText = player.health;
  userDmgSpan.innerText = player.attackDmg;
  enemyHealthSpan.innerText = enemy.health;
  enemyDmgSpan.innerText = enemy.attackDmg;
}

function deadOrAlive() {
  if (enemy.health <= 0) {
    alert("You win!");
  } else if (player.health <= 0) {
    alert("You dead!");
  }
}

function playerAttack() {
  // Player attacks
  enemy.health = enemy.health - player.attackDmg;
  // Enemy returns attack
  player.health = player.health - enemy.attackDmg;
  updateUI();
  deadOrAlive();
}

startGameBtn.addEventListener("click", startGame);
attackButton.addEventListener("click", playerAttack);