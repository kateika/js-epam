/*Напишите функцию, которая находит все уникальные элементы в массиве*/




function unique(arr) {
  //использую объект, чтобы посчитать, сколько раз встречается элемент
  var obj = {};
  arr.forEach(function(element){
    //если раньше элемент не встречался, то заводим для него счетчик - начинаем с 1.
    if (!obj[element]) {
      obj[element] = 1;
    } else { //Если слово еще раз встретилось - плюсуем один
      obj[element] +=1;
    }
  })
  
  var uniqueArr = [];
  //проверяем наши счетчики, те у кого счетчик = 1 - уникальные элементы и добавляются в массив
  for (var key in obj) {
    if (obj[key] == 1) uniqueArr.push(key);
  }
  return uniqueArr;
}

var string = ["flat", "window", "good", "bad",
  "flat", "weather", "flat", "window"];


 console.log(unique(string));
 console.log(unique([1, 77, 3, 12, 77, 1]));

