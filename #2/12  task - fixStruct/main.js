/*
Есть структура вида:
[{
    delta: 5,
    value: 5
}, {
    delta: -3,
    value: 2
}, {
    delta: 5,
    value: 7
}, {
    delta: 0,
    value: 7
}]
Она подчиняется следющему правилу: каждый последующий объект массива содержит объект со свойствами delta и value. delta - разница значений value с предыдущим объектом.
У тебя есть экземпляр структуры, и достоверно известно, что один (и только один) из элементов имеет неверное значение delta и value, и что этот элемент не является ни первым, ни последним. Необходимо написать функцию fixStruct(struct), которая изменяет неверное значение таким образом, чтобы его delta и value снова подчинялись правилу, описанному выше. */
var struct = [{
    delta: 0,
    value: 1
}, {
    delta: 1,
    value: 2
}, { //сломана
    delta: 5,
    value: 2
}, {
    delta: 2,
    value: 7
}];

var struct2 = [{
    delta: 0,
    value: 1
}, { //сломана
    delta: 4,//1
    value: 6 //2
}, { //сломана
    delta: 3,
    value: 5
}, {
    delta: 2,
    value: 7
}];

function fixStruct(struct) {
  var previousObj, currentObj, nextObj;
  for (var i = 1; i < struct.length-1; i++) {
    previousObj = struct[i-1];
    currentObj = struct[i];
    nextObj = struct[i+1];
    //Проверяем где сломана цепочка, чтобы случайно не перезаписать верные значения (тогда вообще все будет неверно)
    if(currentObj.value - previousObj.value != currentObj.delta) {
      currentObj.value = nextObj.value - nextObj.delta;
      currentObj.delta = currentObj.value - previousObj.value;
    }
  }
  return struct;
}

console.log(fixStruct(struct));
//var struct = [{
//    delta: 0,
//    value: 1
//}, {
//    delta: 1,
//    value: 2
//}, {
//    delta: 3,
//    value: 5
//}, {
//    delta: 2,
//    value: 7
//}];

console.log(fixStruct(struct2));
//var struct2 = [{
//    delta: 0,
//    value: 1
//}, { //сломана
//    delta: 1,
//    value: 2
//}, { //сломана
//    delta: 3,
//    value: 5
//}, {
//    delta: 2,
//    value: 7
//}];