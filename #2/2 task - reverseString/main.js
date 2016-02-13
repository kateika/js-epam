/*
Написать функцию, которая принимает строку и возвращает ее в обратном порядке.
слово -> оволс*/

function reverse(str) {
  //не указываем разделитель для split и строка разбивается побуквенно
  var arr = str.split("");
  console.log(arr);
  //переворачиваем массив наоборот
  arr = arr.reverse();
  //объединям массив в строку без разделителя - просто склеивает буквы обратно
  arr = arr.join("");
  return arr;
}

console.log(reverse("me"));
console.log(reverse("All you need is love"));
console.log(reverse("слово"));