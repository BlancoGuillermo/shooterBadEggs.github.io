var myGunSound = new Audio("bang.mp3");
var enemyGunSound = new Audio("bang.mp3");
enemyGunSound.volume = 0.6; // bajamos el volumen del disparo del enemigo
var  music = new Audio("music.mp3");
music.loop = true;


//función del ataque del enemigo
function enemyShootsMe(enemy){

	enemyGunSound.play();

	if(!enemy.classList.contains("dead")) {  //si no tiene la clase dead, pueden disparar

			enemy.classList.add("shooting");

			updateHealthPoints(healthPoints - 20); //cada disparo quita 20% de vida

			setTimeout(()=> {
				enemy.classList.remove("shooting");
			}, 200);

		}
}

//función aparicion del enemigo
function enemyAttacksMe(enemy){

	enemy.classList.add("showing"); //agrega la clase showing

	//Llamamos a la función de disparo
	setTimeout(()=>{
		enemyShootsMe(enemy);
	}, 1000);

	setTimeout( ()=> {
		enemy.classList.remove("showing");
	}, 3000); // quita la clase "showing" despues de 3 milisegundos
}

//función retorna los enemigos que no tienen la clase "dead"
function livingEnemies(){

	return document.querySelectorAll(".enemy:not(.dead)");
}

//función que elige de forma random a los enemigos que nos atacaran
function randomEnemyAttacks(){

	//utilizamos la libreria Math
	var randomEnemyNo = Math.random() * livingEnemies().length;
	randomEnemyNo = Math.floor(randomEnemyNo);
	var enemy = livingEnemies()[randomEnemyNo];

	var randomDelay = Math.random() * 2000 + 1000;

	setTimeout(()=> {
		enemyAttacksMe(enemy);
		randomEnemyAttacks(); //llamamos a la funcion desde aqui para crear un loop
	}, randomDelay);

}

//funcion de disparo
function iShoot(enemy){
	//alert("boom");
	enemy.classList.add("dead"); //add a class to our enemy element

	if(!livingEnemies().length){
		alert("You win!!");
		window.location.reload();
	}
}

//healthBar
var healthPoints = 100;

function updateHealthPoints(points){

	healthPoints = points;
	var healthBar = document.querySelector("#healthBar");

	healthBar.style.width = points + "%";

	if(healthPoints < 1){
		alert("Game Over!");
		window.location.reload(); //recarga la página dejando todo en 0
	}
}


function newGame(){

	randomEnemyAttacks();
	document.querySelector("button").style.display = "none";

	music.play();
}


/*
var enemy1 = document.querySelector("#enemy1");
enemyAttacksMe(enemy1);
*/

