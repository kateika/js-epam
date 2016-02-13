/*Напишите функцию, которая удаляет из массива все повторяющиеся элементы*/

function deleteRepeat(arr) {
  var obj = {};
  //Использую объект, так как удобно, что ключи затираются, если появляются аналогичные
  arr.forEach(function(element) {
    obj[element] = true;
  })
  
  var arr = [];
  //Просто добавляю в массив ключи
  for(var key in obj) arr.push(key);
  return arr;
}

              
var string = ["flat", "window", "good", "bad", "flat", "weather", "flat", "window"];


console.log(deleteRepeat(string));
console.log(deleteRepeat([1, 77, 3, 12, 77, 1]));