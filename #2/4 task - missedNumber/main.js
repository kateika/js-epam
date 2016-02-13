/*
Напишите функцию, которая принимает массив чисел и возвращает пропущенное число
Пример: 
[0, 5, 1, 3, 2, 9, 7, 6, 4]  // returns 8
[9, 2, 4, 5, 7, 0, 8, 6, 1]  // returns 3*/


function catchMissedNumber(arr) {
  //Сортируем элементы как числа, а не строки
  var sortArray = arr.sort(function(a,b){return a - b});
  //Узнаем пропущенный элемент, разница между ними должны быть 1, даже у отрицательных (-1--2=1), так как выше мы отсортировали массив в порядке возрастания (следующее число больше предыдущего)
  for(var i = 0; i < sortArray.length-1; i++) {
    if(sortArray[i+1] - sortArray[i] != 1) {
      return sortArray[i] + 1;
    }
  }
}


console.log(catchMissedNumber([0, 5, 1, 3, 2, 9, 7, 6, 4])); // 8

console.log(catchMissedNumber([10, 2, 5, 6, 8, 1, 9, 7, 3])); // 4

console.log(catchMissedNumber([-1, -2, -4, -5, -7, -6])); // -3

console.log(catchMissedNumber([-1, -2, 1, 3, 4, 0])); // 2