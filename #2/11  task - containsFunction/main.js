/*
Написать функцию contains(where, what). Если все элементы массива what содержатся в массиве where, функция должна возвращать true. Пустой массив является подмножеством любого массива. Порядок вхождения элементов в массив не имеет значения.*/



function contains(where, what) {
  var found;
  //Ищем элементы из what (то, что мы ищем) в where (где ищем)
  for (var i = 0; i < what.length; i++) {
    // Мы зашли в массив, значит есть данные в what, но пока мы не знаем, есть ли они в where
    found = false;
    
    for (var j = 0; j < where.length; j++) {
      //Если элемент из what нашелся по какому-то индексу в where
      if(what[i] == where[j]) {
        //То перезапиши false на true
        found = true;
        //И перестань искать
        break;
      }
    }
    //Если после итерации found не перезаписался на true, то элемента из what нет в where
    if(!found) return false;
  }
  //Выводит конечный результат и решает задачу с "пустой массив является подмножеством элементов"
  return true;
}

console.log(contains([1,2,3], [3,2])); // true
console.log(contains([1,2,3], [3,2,1,2,3])); // true
console.log(contains([1,2,3], [])); // true
console.log(contains([1,2,3], [5,4,1,6,7])); // false
console.log(contains([1,2,3], [5,4,8,6,7])); // false
