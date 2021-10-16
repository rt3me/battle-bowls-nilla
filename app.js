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

function updateUIStats() {
  userHealthSpan.innerText = player.health;
  userDmgSpan.innerText = player.attackDmg;
  enemyHealthSpan.innerText = enemy.health;
  enemyDmgSpan.innerText = enemy.attackDmg;
}

function startGame() {
  const player = new Player(playerNameInput.value, 10, 0);
  playerNameSpan.innerText = player.name;
  const enemy = new Enemy(enemyNames[Math.floor(Math.random() * enemyNames.length)], 10, 0)
  enemyNameSpan.innerText = enemy.name;
  updateUIStats();
}

function enemyAttack() {
  player.health = player.health - enemy.attackDmg;
}

function playerAttack() {
  enemy.health = enemy.health - player.attackDmg;
  updateUIStats();
  if (enemy.health <= 0) {
    alert("you win!");
  }
  enemyAttack();
}

startGameBtn.addEventListener("click", startGame);
attackButton.addEventListener("click", playerAttack);
