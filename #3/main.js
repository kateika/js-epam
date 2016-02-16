var body = document.body;
body.style.backgroundColor = "white";

//---------------1 заданиe-----------//
//функция построения и для добавления хидера
function buildHeader() {
  var header = createHeader();//надо новую переменную или задать в глобальной \
  //области переменную header и везде юзать
  
  //наполняем хидер созданными элементами
  header.appendChild(createLogo());
  header.appendChild(createButton("Btn 1"));
  header.appendChild(createButton("Btn 2"));
  header.appendChild(createButton("Btn 3"));
  header.appendChild(createButton("Btn 4"));
  
  //добавляем header в body
  return body.appendChild(header);
}

//создаем хидeр
function createHeader() {
  var header = document.createElement("header");
  header.style.backgroundColor = "#ccc";
  header.style.height = "120px";
  header.style.padding = "20px 20px";
  return header;
}

//создаем логотип
function createLogo() {
  var logo = document.createElement("img");
  logo.setAttribute("src", "koala-4.jpg");
  logo.setAttribute("alt", "cool koala");
  logo.style.width = "214px";
  logo.style.height = "100px";
  logo.style.marginRight = "20px";
  return logo;
}

//создаем кнопку
function createButton(label) {
  var button = document.createElement("button");
  button.innerHTML = label;
  button.style.width = "70px";
  button.style.marginRight = "8px";
  return button;
}


//---------------2 заданиe-----------//
function addClock() {
  var header = document.getElementsByTagName("header")[0];
  header.appendChild(createClock());
}

//Создаем часы
function createClock() {
  var clock = document.createElement("time");
  clock.className = "clock-position";
  clock.innerHTML = setClock();
  return clock;
}

function setClock() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  
  //если часы или минуты - это одна цифра, то добавляем в начало ноль
  return ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2);
}



//---------------3 задание-----------//
//функция построения и добавления main
function buildMain() {
  var main = createMain();
  main.appendChild(createLeftColumn());
  main.appendChild(createRightColumn());
  
  //добавляем main в body
  return body.appendChild(main);
}

//Создаем main
function createMain() {
  var main = document.createElement("main");
  main.style.backgroundColor = "#eee";
  main.style.padding = "8px 12px";
  return main;
}

//Создаем левую колонку
function createLeftColumn() {
  var leftColumn = document.createElement("aside");
  leftColumn.classList.add("left-column-styles");
  var list = leftColumn.appendChild(createList());
  var textNode = document.createTextNode("This is my list ->")
  //Я просто хотела использовать insertBefore для разнообразия :)
  leftColumn.insertBefore(textNode, list);
  return leftColumn;
}

//Создаем список
function createList() {
  var ul = document.createElement("ul");
  var li;
  for(var i = 1; i <= 6; i++) {
    li = document.createElement("li");
    li.innerHTML = "Point " + i;
    ul.appendChild(li);
  }
  return ul;
}

//Создаем правую колонку
function createRightColumn() {
  var rightColumn = document.createElement("div");
  rightColumn.classList.add("right-column-styles");
  
  //добавляем 6 параграфов, мне захотелось с разным текстом, поэтому коротко записать не получилось
  var p;
  
  p = createParagraph("1 Говорят, зло не имеет лица. Действительно, на его лице \
не отражалось никаких чувств. Ни проблеска сочувствия не было на нем, а ведь \
боль просто невыносима. Разве он не видит ужас в моих глазах и панику на моем \
лице? Он спокойно, можно сказать, профессионально выполнял свою грязную работу,\
 а в конце учтиво сказал: «Прополощите рот, пожалуйста».");
  rightColumn.appendChild(p);
  
  p = createParagraph("2 Был только один выход, ибо наши жизни сплелись в слишком \ запутанный узел гнева и блаженства, чтобы решить все как-нибудь иначе. \
Доверимся жребию: орел — и мы поженимся, решка — и мы расстанемся навсегда.\
Монетка была подброшена. Она звякнула, завертелась и остановилась. Орел. Мы \
уставились на нее с недоумением. Затем, в один голос, мы сказали: Может, еще \
разок?");
  p.setAttribute("id", "flag");
  rightColumn.appendChild(p);
  
  p = createParagraph("3 Блестящие колготки туго и соблазнительно облегали \
прекрасные бедра — чудесное дополнение к легкому вечернему платью. От самых \
кончиков бриллиантовых сережек до носков изящных туфелек на тонких шпильках — \
все было просто шикарно. Глаза с только что наведенными тенями рассматривали \
отражение в зеркале, и накрашенные яркой красной помадой губы растягивались от \
удовольствия. Внезапно сзади послышался детский голос: «Папа?!» ");
  p.setAttribute("data-isDeleted", "true");
  rightColumn.appendChild(p);
  
  p = createParagraph("4 Она почти слышала, как двери ее тюрьмы захлопываются. \
Свобода ушла навсегда, теперь ее судьба в чужих руках, и никогда ей не увидеть \
воли. В голове ее замелькали безумные мысли о том, как хорошо бы сейчас улететь \
далеко-далеко. Но она знала, что скрыться невозможно. Она с улыбкой повернулась \
к жениху и повторила: «Да, я согласна».");
  p.setAttribute("data-isDeleted", "true");
  rightColumn.appendChild(p);
  
  p = createParagraph("5 Последний человек на Земле сидел в комнате. В дверь \
постучались...");
  rightColumn.appendChild(p);
  
  p = createParagraph("6 Раньше у меня было гладкое лицо и мятая юбка, а теперь — \
наоборот.");
  rightColumn.appendChild(p);
  
  return rightColumn;
}

//создание параграфа
function createParagraph(text) {
  var p = document.createElement("p");
  p.style.marginTop = "0";
  p.innerHTML = text;
  return p;
}

//--------------- 4 заданиe-----------//
//Меняю начертание текста и размер
function changeParagraphText() {
  var main = body.getElementsByClassName("right-column-styles")[0];
  main.style.fontStyle = "italic";
  main.firstChild.style.color = "green";
  main.firstChild.style.fontSize = "20px";
  main.lastChild.style.color= "green";
  main.lastChild.style.fontSize = "20px";
}

//--------------5 задание------------//
//Изменение порядка элементов на обратный у списка
function reverseList() {
  var ul = body.getElementsByTagName("ul")[0];
  
  //Создаем новый массив, в который добавляем элементы в обратном порядке
  var reverseLi = [];
  for (var i = ul.children.length-1; i >= 0; i--) {
    reverseLi.push(ul.children[i]);
  }

  //Вставляет элементы в обратном порядке
  for (var i = 0; i < reverseLi.length; i++) {
    ul.appendChild(reverseLi[i])
  }
  
}

//--------------6 задание------------//
//функция построения и добавления футера
function buildFooter() {
  var footer = document.createElement("footer");
  footer.style.backgroundColor = "#ccc";
  footer.style.height = "120px";
  footer.style.padding = "20px 20px";
  var span;
  span = document.createElement("span");
  span.innerHTML = "What is love? ";
  footer.appendChild(span);
  span = document.createElement("span");
  span.innerHTML = "Baby don't hurt me, don't hurt me, no more.";
  footer.appendChild(span);
  return body.appendChild(footer);
}

//--------------7 задание------------//
//удаляю элементы с data-isDeleted
function deleteIsDeleted() {
  var paragraphs = body.querySelectorAll("[data-isDeleted=true]");
  var p;
  for (var i = 0; i < paragraphs.length; i++) {
    p = paragraphs[i];
    p.parentElement.removeChild(p);
  }
}

//--------------8 задание------------//
//Меняю бэкграунд у соседей параграфа с id=flag
function changeBackground() {
  var pWithFlag = document.getElementById("flag");
  pWithFlag.previousElementSibling.style.backgroundColor = "yellow";
  pWithFlag.nextElementSibling.style.backgroundColor = "blue";
}

//--------------9 задание------------//
//Меняю текст у нечетных элементов списка
function changeText() {
  var listItems = body.getElementsByTagName("li");
  for (var i = 0; i < listItems.length; i++) {
    //проверка на нечетность
    if (!(i % 2)) {
      listItems[i].innerHTML = "Быть или не быть";
    }
  }
}

//--------------10 задание------------//
//Устанавливаю атрибут у четных элементов списка
function setAttribute() {
  var listItems = body.getElementsByTagName("li");
  for (var i = 0; i < listItems.length; i++) {
    //проверка на четность
    if (i % 2) {
      listItems[i].setAttribute("newAttribute","true");
    }
  }
}

//--------------11 задание------------//
//Изменяю положение кнопок
function changeBtnPosition() {
  var buttons = body.getElementsByTagName("button");
  
  //offsetTop
  var btn1 = buttons[0];
  btn1.parentElement.style.position = "relative";
  btn1.style.position = "absolute";
  btn1.style.top = "100px";
  btn1.style.left = "500px"; // подвигаю, чтобы не перекрывала другие кнопки
  console.log("offsetTop", btn1.offsetTop); // 100
  
  //ClientTop
  var btn2 = buttons[1];
  btn2.style.borderTop = "100px solid white";
  console.log("clientTop", btn2.clientTop); // 100
  
  //scrollTop
  btn2.style.height = "20px";
  btn2.style.overflow = "scroll";
  btn2.innerHTML = "Down Down Down Down Down Down Down Down Down";
  btn2.scrollTop = 100;
  console.log("scrollTop", btn2.scrollTop); // 100 
}

var steps = [
  buildHeader,
  addClock,
  buildMain,
  changeParagraphText,
  reverseList,
  buildFooter,
  deleteIsDeleted,
  changeBackground,
  changeText,
  setAttribute,
  changeBtnPosition
];

var step;
//использую setInterval,а не трюк с двумя setTimeout, так как не очень важна точность
var interval = setInterval(function() {
  if(steps.length) {
    step = steps.shift();
    step();
  } else {
    clearInterval(interval);
  }
}, 2000);
