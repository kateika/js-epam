//Написать функцию, которая определяет, является число описанием себя или нет.
//https://en.wikipedia.org/wiki/Self-descriptive_number
//Например для 3211000 или 2020 вернет true, должна работать для всех двенадцатизначных и менее знаков чисел

function selfDescriptive(num) {
  var numString = num.toString();
  for (var i = 0; i < numString.length; i++) {
    var counter = 0;
    for (var j = 0; j < numString.length; j++) {
      if(i == numString[j]) {
        counter += 1;
      }
    }
    if (numString[i] != counter) return false;
  }
  return true;
}

console.log(selfDescriptive(3211000));
console.log(selfDescriptive(2020));
console.log(selfDescriptive(1245));


