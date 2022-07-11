let cards = [
  {
    id: 1,
    name: `A_Clubs`,
    type: "Clubs",
    image: "./image/Playing_card_club_A.svg",
  },
  {
    id: 2,
    name: "2_Clubs",
    type: "Clubs",
    image: "./image/Playing_card_club_2.svg",
  },
  {
    id: 3,
    name: "3_Clubs",
    type: "Clubs",
    image: "./image/Playing_card_club_3.svg",
  },
  {
    id: 4,
    name: "4_Clubs",
    type: "Clubs",
    image: "./image/Playing_card_club_4.svg",
  },
  {
    id: 5,
    name: "2_Diamonds",
    type: "Diamonds",
    image: "./image/Playing_card_diamond_2.svg",
  },
  {
    id: 6,
    name: "3_Diamonds",
    type: "Diamonds",
    image: "./image/Playing_card_diamond_3.svg",
  },
  {
    id: 7,
    name: "4_Diamonds",
    type: "Diamonds",
    image: "./image/Playing_card_diamond_4.svg",
  },
  {
    id: 8,
    name: "A_Diamonds",
    type: "Diamonds",
    image: "./image/Playing_card_diamond_A.svg",
  },
];

let cols = 4;
let rows = 4;

let number_cells = cols * rows;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

let arrayCards = [...cards, ...cards];
shuffle(arrayCards);

let boardGame = document.querySelector(".main");
const grid = document.createElement("section");
grid.setAttribute("class", "grid");
grid.setAttribute("style", `--col:${cols}`);
boardGame.appendChild(grid);

for (let i = 0; i < arrayCards.length; i++) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = arrayCards[i].name;

  //front of the card
  let front = document.createElement("div");
  front.classList.add("front");

  //back of the card
  let back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${arrayCards[i].image})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

let firstGuess = "";
let secondGuess = "";

let count = 0;

let previousTarget = null;
let delay = 1000;

let match = function () {
  let selected = document.querySelectorAll(".selected");
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.add("match");
  }
   // check end
   let numberMatch = document.querySelectorAll(".match").length;
   if (numberMatch === number_cells) {
     endGame();
   }
};

const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll(".selected");
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.remove("selected");
  }
};

grid.addEventListener("click", (event) => {
  let clicked = event.target;
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("match") ||
    clicked.parentNode.classList.contains("selected")
  ) {
    return;
  }

  if (count < 2) {
    count++;
   
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }

    previousTarget = clicked;
  }
});

// end:
function endGame() {
  if (confirm("Bạn đã chiến thắng trò chơi, bạn muốn chơi lại không")) {
    location.reload();
  }
}
