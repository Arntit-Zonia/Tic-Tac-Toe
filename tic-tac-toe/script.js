// selectors
let block = document.querySelectorAll(".block");
let resetBtn = document.getElementById("reset");

let zero = document.getElementById("block0");
let one = document.getElementById("block1");
let two = document.getElementById("block2");
let three = document.getElementById("block3");
let four = document.getElementById("block4");
let five = document.getElementById("block5");
let six = document.getElementById("block6");
let seven = document.getElementById("block7");
let eight = document.getElementById("block8");

let round = 0; // will count how many rounds have passed

ticTacToe();

function ticTacToe() {
    playerMove();
    restart();
}

// adds the "X" character on click 
// if a block that is not empty is clicked the value won't change, it's immutable
// every playerMove adds 1 to round 
function playerMove() {
    for(let elm of block) {
        elm.addEventListener("click", (e)=> {
            if(elm.textContent !== "") {
                e.target.textContent = elm.textContent;
            }
            else {
                e.target.textContent = "X";
                round++
                computerMove();
            }
            winCondition(); // checks if there is a win condition before computerMove runs
        });
    }
}

// runs after playerMove and adds the "O" character to a random unassigned block
// if a block that is not empty is clicked the value won't change, it's immutable
// every computerMove adds 1 to round
function computerMove() {
    setTimeout(() => {
        winCondition(); // checks if there is a win condition, then runs the rest of the code
        for(let elm of block) {
            // checks if block is empty then randomly assigns the "O" character to one of the empty blocks
            if(elm.textContent === "") {
                let randomBlock = block[Math.floor(Math.random() * block.length)]; // random block assignment
                if(randomBlock.textContent === "") {
                    randomBlock.textContent = "O";
                    round++;
                }
                // if the block is not empty it runs the function again to check another block
                else computerMove();
                return randomBlock.textContent;
            }
        }
    },200);
}

// ---------------------------------------------

// checks if there are 3 characters in a row horizontally, vertically or diagonally
// if true we have a winner
// if there is a winner the text color of the specified combination is changed to crimson to indicate that

// checks if  the value of round is 9 which is the max number of blocks
// if true the game ended in a draw
// in both cases after a win or a draw the board is cleared
// and the losing side has the first move

function winCondition() {
    horizontal();
    vertical();
    diagonal();
    draw();
}

function horizontal() {
    setTimeout(() => {
        for(let elm of block) {
            if(elm.textContent !== "") {
                if([zero, one, two].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    zero.classList.add("victory");
                    one.classList.add("victory");
                    two.classList.add("victory");
                    reset();
                }
                else if([three, four, five].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    three.classList.add("victory");
                    four.classList.add("victory");
                    five.classList.add("victory");
                    reset();
                }
                else if([six, seven, eight].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    six.classList.add("victory");
                    seven.classList.add("victory");
                    eight.classList.add("victory");
                    reset();
                }
            }    
        }
    },0);
}

function vertical() {
    setTimeout(() => {
        for(let elm of block) {
            if(elm.textContent !== "") {
                if([zero, three, six].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    zero.classList.add("victory");
                    three.classList.add("victory");
                    six.classList.add("victory");
                    reset();
                }
                else if([one, four, seven].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    one.classList.add("victory");
                    four.classList.add("victory");
                    seven.classList.add("victory");
                    reset();
                }
                else if([two, five, eight].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    two.classList.add("victory");
                    five.classList.add("victory");
                    eight.classList.add("victory");
                    reset();
                }
            }
        }
    },0);
}
 
function diagonal() {
    setTimeout(() => {
        for(let elm of block) {
            if(elm.textContent !== "") {
                if([zero, four, eight].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    zero.classList.add("victory");
                    four.classList.add("victory");
                    eight.classList.add("victory");
                    reset();
                }
                else if([two, four, six].every((a, b, c) => a.textContent !== "" && a.textContent === c[0].textContent)) {
                    two.classList.add("victory");
                    four.classList.add("victory");
                    six.classList.add("victory");
                    reset();
                }
            }
        }
    },0);
}

function draw() { // automatically resets the board if there is a draw
    setTimeout(() => {
        if(round > 8) {
            reset();
            round = 0;
        }
    }, 200);
}

// -------------------------------------------------------

function restart() { // resets board at any given point by clicking the button
    for(let elm of block) {
        resetBtn.addEventListener("click", () => {
            elm.textContent = "";
            elm.classList.remove("victory");
            round = 0;
        });
    }
}

function reset() { // automatically resets the board if there is a winner
    setTimeout( () => {
        for(let elm of block) {
            elm.textContent = "";
            elm.classList.remove("victory");
            round = 0;
        }
    }, 180); // decreased value for smoother turn transition after "X" won
}