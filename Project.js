//1]..Deposit Some money
//2]..Determine number of line to bet
//3]..Collect a bet amount
//4]..Spin the slot machine
//5]..Check if the user Won
//6]..Give the user their wons
//7]..play again

//INitialize prompt-sync:

let prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMN = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};
//1
const deposit = () => {
  while (true) {
    let depositAmount = prompt("Enter Your Deposit Amount: ");
    //Convert String to number
    const numberDepositeAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0) {
      console.log("Invalid Deposit Amount,try again");
    } else {
      return numberDepositeAmount;
    }
  }
};
//2

function getNumberOfLines() {
  while (true) {
    let lines = prompt("Enter the number of lines to bet on (1-3) : ");
    //Convert String to number
    let numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again");
    } else {
      return numberOfLines;
    }
  }
}
//3

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter your bet per lines : ");
    //Convert String to number
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid your bet amount,try again");
    } else {
      return numberBet;
    }
  }
};
//4

const spin = () => {
  let symbols = [];

  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];

  for (let i = 0; i < COLUMN; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];

      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};
//5;
const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);

    for (let j = 0; j < COLUMN; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};
//6
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";

    for (const [i, symbol] of rows.entries()) {
      rowString += symbol;

      if (i != row.length - 1) {
        rowString += "|";
      }
    }
    console.log(rowString);
  }
};
//7
const getWinnings=(rows,bet,lines)=>{
  let winnings=0;

  for(let row=0;row<lines;row++){
    const symbols=rows[row];
    let allSame=true;

    for(const symbol of symbols){
      if(symbol != symbols[0]){
        allSame=false;
        break;
      }
    }
    if(allSame){
      winnings+=bet*SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

//8
const game=()=>{
  let balance = deposit();

  while(true){
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings=getWinnings(rows,bet,numberOfLines);
    balance +=winnings;
    console.log(`You won $ ${winnings.toString()}`);

    if(balance<=0){
      console.log('You ran out of money!')
      break;
    }

    const playAgain=prompt('Do you want to play - ');

    if(playAgain!="y") break;
  }

}

game();

