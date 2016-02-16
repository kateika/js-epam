//Написать функцию, которая возвращает следующий ближайший квадрат переданного числа или -1, если такого нет
//findNextSquare(121) --> 144
//findNextSquare(625) --> 676
//findNextSquare(114) --> -1

function findNextSquare(num) {
  var nextNum;
  var currentNum = Math.sqrt(num);
  if (Math.floor(currentNum) == currentNum) {
    nextNum = currentNum + 1;
    return nextNum * nextNum;
  }
  return -1;
}

console.log(findNextSquare(114));
console.log(findNextSquare(121));