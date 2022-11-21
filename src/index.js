import "./styles.scss";

var rows = 4;
var columns = 5;

var currentPiece;
var newPiece;

var moves = 0;

// Initialize the puzzle board.
// TODO: Start with the option of choosing one of multiple puzzles.
window.onload = function() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let place = document.createElement("img");
      place.src = "images/white.png";
      
      addDragEvents(place);
      
      document.getElementById("board").append(place);
    }
  }
  
  //Add numbers for pieces in array
  let pieces = [];
  for (let i = 1; i <= rows*columns; i++) {
    pieces.push(i.toString());
  }
  
  //Shuffle pieces
  for (let i = 0; i < pieces.length; i++) {
    let randomIndex = Math.floor(Math.random() * pieces.length);
    
    [pieces[i], pieces[randomIndex]] = [pieces[randomIndex], pieces[i]];
  }
  
  //Add image elements for each puzzle piece
  for (let i = 0; i < pieces.length; i++) {
    let piece = document.createElement("img");
    piece.src = "images/tree" + pieces[i] + ".png";
    
    addDragEvents(piece);
    
    document.getElementById("pieces").append(piece);
  }
}


// Functionality to drag pieces
//TODO: Add functionality to make the game more accessible by swapping pieces with keyboard prompts
function addDragEvents(piece) {
  piece.addEventListener("dragstart", dragStart);
  piece.addEventListener("dragover", dragOver);
  piece.addEventListener("dragenter", dragEnter);
  piece.addEventListener("dragleave", dragLeave);
  piece.addEventListener("drop", dragDrop);
  piece.addEventListener("dragend", dragEnd);
}

// Drag puzzle pieces functions
function dragStart() {
   currentPiece = this;
}

function dragOver (event) {
  event.preventDefault();
}

function dragEnter (event) {
  event.preventDefault();
}

function dragLeave () {}

function dragDrop () {
  newPiece = this;
}

//Swap the current puzzle piece with the one where it is dropped.
function dragEnd() {
  if (currentPiece.src.includes("white")) {
    return;
  }
  let currentImage = currentPiece.src;
  let newImage = newPiece.src;
  currentPiece.src = newImage;
  newPiece.src = currentImage;
 
  // TODO: Only update moves when pieces are moved on the actual board.
  moves += 1;
  document.getElementById("moves").innerText = moves;
  checkForWin(); // Checks to see if the puzzle is solved when a new piece has been placed.
}



function checkForWin() {
  let placeCounter = 1;
  let currentPuzzle = document.getElementById("board") // Gets all the currently places puzzle pieces.
  
  let firstPiece = currentPuzzle.children[0].src;
  
  if (!firstPiece.includes("white")) {
    for (let child of currentPuzzle.children) {
      if (child.src.includes("tree" + placeCounter + ".png")) {
        placeCounter++;
      }
    }
  }
  
  if (placeCounter === 21) {
    document.getElementById("status").innerText = "PUZZLE COMPLETE! :)";
  }
}