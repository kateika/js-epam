/*Написать функцию, которая принимает одну строку (предложение/слово) в качестве аргумента. Эта функция должна возвращать упорядоченный массив, содержащий индексы всех строчных букв в строке.*/

function getArrIndex(str) {
  var arr = [];
  for(var i = 0; i < str.length; i++) {
    //способ с toLowerCase() не использую, так как нет способа отфильтровать ВСЕ спецсимволы, которые есть в юникоде
    if(str[i] >= "a" && str[i] <= "z") {
      arr.push(i);
    }
  }
  return arr;
}

console.log(getArrIndex("MOTHer1"));//[4,5]
console.log(getArrIndex("!Mothe!r an;d Fath?er"));
//[2, 3, 4, 5, 7, 9, 10, 12, 15, 16, 17, 19, 20]

