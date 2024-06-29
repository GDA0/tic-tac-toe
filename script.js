const playersDetailsForm = document.querySelector("form");
const playersModal = document.querySelector("#players-modal");
const closeModalBtns = document.querySelectorAll(".close-modal");

closeModalBtns.forEach((closeModalBtn) => {
  closeModalBtn.addEventListener("click", () => {
    playersDetailsForm.reset();
    playersDetailsForm.classList.remove("was-validated");
  });
});

playersDetailsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!playersDetailsForm.checkValidity()) {
    event.stopPropagation();
  }

  playersDetailsForm.classList.add("was-validated");

  if (playersDetailsForm.checkValidity()) {
    let { playerXName, playerOName } = getPlayerNames();

    let { playerX, playerO } = createPlayers(playerXName, playerOName);

    const modal = bootstrap.Modal.getInstance(playersModal);
    modal.hide();

    playersDetailsForm.reset();
    playersDetailsForm.classList.remove("was-validated");
  }
});

function getPlayerNames() {
  let playerXName = playersDetailsForm.querySelector("#player-X-name").value;
  let playerOName = playersDetailsForm.querySelector("#player-O-name").value;

  return { playerXName, playerOName };
}

function createPlayers(playerXName, playerOName) {
  const playerX = Player(playerXName, "X");
  const playerO = Player(playerOName, "O");

  return { playerX, playerO };
}

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const updateBoard = (player, index) => {
    if (board[index] === "") {
      board[index] = player.getSymbol();
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getBoard,
    updateBoard,
    resetBoard,
  };
})();

const Player = (name, symbol) => {
  let score = 0;

  const getName = () => name;
  const getScore = () => score;
  const increaseScore = () => score++;
  const getSymbol = () => symbol;

  return {
    increaseScore,
    getScore,
    getName,
    getSymbol,
  };
};
