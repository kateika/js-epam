/*При разработке веб-сайта, вы обнаружите, что у некоторых пользователей есть проблемы входа в систему. Поискав по коду, вы обнаружили, что все логины, заканчивающиеся на "_" создают проблемы. Итак, вы хотите, написать функцию, которая принимает массив пар логина и электронной почты, и выводит массив всех пар логин-электронная почта входного массива, которые заканчиваются на "_".*/


function problemLogin(arr) {
  var login;
  //фильтруем исходный массив
  var problem = arr.filter(function(user) {
    login = user.login;
    //начинаем поиск "_" с конца и чтобы понять что "_" именно в конце, а не середине - сравниваем найденный индекс с индексом последнего символа
    return login.length-1 == login.lastIndexOf("_");
  });
  return problem;
}

var arr = [
  {email: "kate@me.com", login: "kate"},
  {email: "kates@me.com", login: "kate_s"},
  {email: "kate1@me.com", login: "kate_"},
  {email: "alex@me.com", login: "alex_"}
]

console.log(problemLogin(arr));
