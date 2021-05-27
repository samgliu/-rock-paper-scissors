let playerw = 0;
let computerw = 0;
let arr = ["#rock", "#paper", "#scissors"];
let comsel;
let indx = 0;
let startimescale = 150;
let endtimescale = 200;
let offs = 14;

window.onload = function(){
    addListener();
}

function addListener() {
    document.getElementById("imgrock").addEventListener('click', rock);
    document.getElementById("imgpaper").addEventListener('click', paper);
    document.getElementById("imgscissors").addEventListener('click', scissors);
}

function removeListener(){
    document.getElementById("imgrock").removeEventListener('click', rock);
    document.getElementById("imgpaper").removeEventListener('click', paper);
    document.getElementById("imgscissors").removeEventListener('click', scissors);
}

function rock(e){game("rock", e)}
function paper(e){game("paper", e)}
function scissors(e){game("scissors", e)}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('select');
  }

function computerPlay (res,e){
    let rand = Math.floor(Math.random() * 3);
    let lo = 0;
    while (indx != rand || lo <= 5){
        let tempdiv = document.querySelector(`${arr[indx]}`);
        delayAdd(tempdiv, lo);
        delayDel(tempdiv, lo);
        
        indx++;
        indx = (indx + 3) % 3;
        lo++;
    }

    sleep((endtimescale - offs) * (--lo)).then(() => { 
        
       
        if (rand === 0){
            console.log("rock");
            comsel = "rock"
        } else if (rand === 1){ 
            console.log("paper");
            comsel = "paper";
        } else {
            console.log("scissors");
            comsel = "scissors";
        }
        //comsel = computerPlay (e);
        addShadow(comsel);
        playSound();
        let result = playRound(res, comsel);
        

        if (result == "Player Won"){
            playerw++;
        } else if (result == "Computer Won") {
            computerw++;
        }
        document.getElementById("results").innerHTML = result;
        document.getElementById("playerwon").innerHTML = "Player - Won: " + playerw;
        document.getElementById("comwon").innerHTML = "Computer - Won: " + computerw;

        

        if (playerw >= 5){
            document.getElementById("results").innerHTML = "Congratulations! You Won 5 games";
            document.getElementById("resultcontainer").style.boxShadow =  "0 0 13px rgb(38 49 206 / 80%)";
            restartgame()
        } else if ( computerw >= 5){
            document.getElementById("results").innerHTML = "You lose! Computer Won 5 games";
            document.getElementById("resultcontainer").style.boxShadow =  "0 0 13px rgb(238 58 4 / 80%)";
            restartgame()
        }
     });
    
}

function delayAdd(tempdiv, i){
    setTimeout(function(){ 
       tempdiv.classList.add('select');
       playSound();
}, i * startimescale);
}

function delayDel(tempdiv, i){
    setTimeout(function(){ 
       tempdiv.classList.remove('select');
},i * endtimescale);
}

function playRound(playerSelection, computerSelection) {
    addListener();
    if (playerSelection == "rock"){
        if (computerSelection == "rock"){
            return "It is s a Tie";
        } else if (computerSelection == "paper"){
            return "Computer Won";
        } else {
            return "Player Won";
        }
    } else if (playerSelection == "paper"){
        if (computerSelection == "rock"){
            return "Player Won";
        } else if (computerSelection == "paper"){
            return "It is s a Tie";
        } else {
            return "Computer Won";
        }
    } else { // player == "scissors"
        if (computerSelection == "rock"){
            return "Computer Won";
        } else if (computerSelection == "paper"){
            return "Player Won";
        } else {
            return "It is s a Tie";
        }
    }
}

function game(res, e){
    removeListener();
    playSound();
    if (comsel != undefined){
        console.log(comsel);
        removeShadow(comsel);
        document.getElementById("resultcontainer").style.boxShadow = "none";
    }
    computerPlay(res, e);
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addShadow(theid){
    document.getElementById(theid).style.boxShadow =  "0 0 13px rgb(238 58 4 / 80%)";
}

function removeShadow(theid){
    document.getElementById(theid).style.boxShadow =  "none";
}

function startgame(){
    playSound();
    document.getElementById("results").innerText = "Click on Pictures to play.";
    document.getElementById("mybutton").style="display:none;";
}

function restartgame(){
    playerw = 0;
    computerw = 0;
}

function playSound(){
    const audio = document.querySelector(`audio[id="sound"]`);
    audio.currentTime = 0;
    audio.play();
}

//const imgs = Array.from(document.querySelectorAll('.computer > img'));
//imgs.forEach(im => im.addEventListener('transitionend', removeTransition));