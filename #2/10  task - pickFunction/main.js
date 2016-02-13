//Реализовать функцию pick(obj, keys), которая принимает аргументами объект и массив строк (названия ключей). Возвращает новый объект, куда вошли все ключи, указанные в массиве keys, и соответствующие значения из объекта obj. Если в объекте obj, нет ключа, указанного в массиве keys, в результирующем объекте этот ключ не должен присутствовать.


function pick(obj, keys) {
  var newObj = {};
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    //Проверка, есть ли ключ в исходном объекте
    if(obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}




var user = {
    name: 'Sergey',
    age: 30,
    email: 'sergey@gmail.com',
    friends: ['Sveta', 'Artem']
}
console.log(pick(user, ['name'])); // {name: 'Sergey'}
console.log(pick(user, ['name', 'second-name'])); // {name: 'Sergey'}
console.log(pick(user, ['name', 'friends'])); // {name: 'Sergey', friends:['Sveta', 'Artem']}

