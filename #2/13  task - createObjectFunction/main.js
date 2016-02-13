/*
Реализовать функцию createObject(arrOfKeys, arrOfData), которая принимает аргументами два массива, и возвращает объект, в котором названия ключей это строки из массива arrOfKeys, а значения - элементы из массива arrOfData. В ключ, стоящий на первом месте массива arrOfKeys должно быть записано значение, стоящее на первом месте arrOfData. Если данных меньше, чем ключей, заполняй значения ключей как undefined.
*/

function createObject(arrOfKeys, arrOfData) {
  var obj = {};
  var key;
  for (var i = 0; i < arrOfKeys.length; i++) {
    key = arrOfKeys[i];
    obj[key] = arrOfData[i];
  }
  return obj;
}

console.log(createObject(['foo'], ['bar'])); // {foo: 'bar'}
console.log(createObject(['foo', 'extra'], ['bar'])); // {foo: 'bar', extra: undefined}

