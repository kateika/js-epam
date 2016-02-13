/*
Напишите функцию, которая принимает список неотрицательных целых чисел и строк и возвращает новый список со отфильтрованными числами(строки будут удалены).
Пример:
[1,2,'a','b'] //[1,2]
[1,'a','b',0,15] //[1,0,15]*/

function arrayOfNumbers(arr) {
  var sortNumbers = arr.filter(function(item) {
    //те элементы массива, которые попадают под тип число, оказываются в новом массиве
    return typeof item == "number";
  })
  return sortNumbers;
}

console.log(arrayOfNumbers([1,2,'a','b']));
console.log(arrayOfNumbers([1,"2",'a','b']));//1 - специально не возвращаю строки
console.log(arrayOfNumbers([1,'a','b',0,15]));