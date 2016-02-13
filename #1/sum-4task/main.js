//Написать функцию, которая считает сумму всех чисел между двумя переданными, включая их самих. Можно передавать отрицательные числа. Если передать два одинаковых числа, выдаст одно из них.

function sum(n1, n2) {
  if (n1 == n2) return n1;

  num1 = Math.min(n1, n2);
  num2 = Math.max(n1, n2);
  
  var sum = 0;
  
  for (var i = num1; i <= num2; i++) {
    sum = sum + i;
  }
  
  return sum;
}

console.log(sum(1, 5)); //15
console.log(sum(-5, 5)); //0
console.log(sum(-5, -5)); //-5
console.log(sum(-5, -15)); //-110
