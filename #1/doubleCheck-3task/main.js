//Функция doubleCheck(str), которая определяет, есть ли в строке два подряд идущих одинаковых символа или нет.

function doubleCheck(str) {
  var symbol = str[0], nextSymbol;
  for(var i = 1; i < str.length; i++) {
    nextSymbol = str[i];
    if(symbol == nextSymbol) {
      return "Two symbols " +symbol + " " + nextSymbol + " was found";
    };
    symbol = nextSymbol;
  }
  return "I didn't find anything";
}

console.log(doubleCheck("kate,,"));
console.log(doubleCheck("kate"));
console.log(doubleCheck(""));