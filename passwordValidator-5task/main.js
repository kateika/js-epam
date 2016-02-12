//Создать простую функцию - валидатор пароля, на входе она получает строку и возвращает true, если все условия выполнены и false, если нет.
//Должны выполняться следующие условия:
//минимум одна буква в верхнем регистре
//минимум одна в нижнем
//минимум одно число
//должно быть минимум 8 знаков

function validatePassword(str) {
  if (str.length < 8) return false;
  
  //Начальное состояние - как будто мы ничего не нашли
  var number = false,
      capital = false,
      little = false;
  
  for (var i = 0; i < str.length; i++) {
    var symbolNumber = parseInt([str[i]]);
    
    if(!isNaN(symbolNumber)) {
      number = true;
    } else { // "1".toUpperCase() == "1"  
      if (str[i] == str[i].toUpperCase()) {
        capital = true;
      }
      if (str[i] == str[i].toLowerCase()) {
        little = true;
      }
    }
  }
  
  return number && capital && little;
}

console.log(validatePassword("nKsk19ek")); // true
console.log(validatePassword("nsk19ekhts")); // false
console.log(validatePassword("nskekkkk")); // false
console.log(validatePassword("SNHHSHTG")); // false
