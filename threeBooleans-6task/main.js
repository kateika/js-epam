//Написать функцию, которая на входе получает число, а на выходе возвращает массив из 3-х boolean элиментов, где первый - это является ли число нечетным, второй - является ли оно простым, и, наконец, делится ли число на 3.


function threeBooleans(num) {
  var odd = (num % 2 != 0);
  var divisionThree = (num % 3 == 0);
  var prime = isPrime(num);
  return [odd, prime, divisionThree];
}

function isPrime(num) {
  for (var i = 2; i < num; i++) {
    if (num % i == 0) {
      return false
    }
  }
  return true;
}


console.log(threeBooleans(7));
console.log(threeBooleans(8));
console.log(threeBooleans(9));