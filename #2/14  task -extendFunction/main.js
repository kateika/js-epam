/*
Реализовать функцию extend(obj1, obj2), которая скопирует свойства из объекта obj2 в объект obj1. Функция должна возвращать obj1. Значения одинаковых ключей должны перетирать оригинальные. */


function extend(obj1, obj2) {
  for(var key in obj2) {
    obj1[key] = obj2[key];
  }
  return obj1;
}

var o = { foo: true };
o.__proto__ = { zoop: 0 };

console.log(extend({foo: 'bar', baz: 1}, {foo: true, zoop: 0})); // {foo: true, baz: 1, zoop: 0}

