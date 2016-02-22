var thead = document.getElementById("thead");
var tbody = document.getElementById("tbody");
var titles = document.getElementsByClassName("title");
var tdHead = thead.getElementsByTagName("td");


tbody.addEventListener("click", handleClick);
tbody.addEventListener("mouseover", handleHover);


//Нужна, чтобы запоминать предыдущую кликнутую ячейку
var selectedTD;

//Строим начальный вариант таблицы
for(var i = 0; i < titles.length; i++) {
  for(var j = 0; j < 16; j++) {
    createLine(titles[i]);
  }
}

//Функция делегирования обязанностей
function handleClick(event) {
  var target = event.target;
  var line = target.closest("tr");

  //Проверяю, что нажали на ссылку.
  if(target.tagName.toLowerCase() == "a") {
    //Чтобы при прокрутке во время удаления-добавления линии таблица не прыгала
    event.preventDefault();
    //Вызываю функцию создания линии, передавая в аргументе "секцию",в которой произошел клик
    if (target.classList.contains("add")) {createLine(line)};
    else {deleteLine(line)};
  }
  
  if(target.tagName.toLocaleLowerCase() == "td") {
    var firstTD = line.firstElementChild;
    var lastTD = line.lastElementChild;
    var index;
    
    //Проверяю та же ли это ячейка, на которую нажали в прошлый раз
    var same = selectedTD == target;

    //Если ячейка та же,что выбрана в прошлый раз или другая выбранная - в любом случае надо снять выделение.
    if(selectedTD) {
      var selectedFirstTD = selectedTD.closest("tr").firstElementChild;
      index = indexOf(selectedTD);
      
      tdHead[index].style.fontWeight = "normal";
      selectedFirstTD.style.fontWeight = "normal";
  
      //"Забываю", что ячейка была выбрана
      selectedTD = null;
    }
    
    //Если выбрана не та же самая ячейка + не первая + не последняя, что в прошлый раз - ее надо выделить
    if(!same && target != firstTD && target != lastTD) {
      index = indexOf(target);
      tdHead[index].style.fontWeight = "bold";
      firstTD.style.fontWeight = "bold";
    
      //"Запоминаю", что эта ячейка была выбрана
      selectedTD = target;
    }
  }
}

function indexOf(target) {
  //Нахожу индекс, считая, сколько элементов было до него
  var index = 0, countTD = target;
  while(countTD = countTD.previousElementSibling) {index++};
  return index;
}

function createLine(section) {
  var line = document.createElement("tr");
  var td, nextLine;
  //Мы знаем, что ячеек 5
  var tdQuantity = 5;
  for(var i = 0; i < tdQuantity; i++) {
    td = document.createElement("td");
    
    //В последнюю ячейку добавляем ссылку с нужным классом и т.п.
    if (i == tdQuantity-1) {
      td.innerHTML = "<a href='#' class='action delete'>Удалить строку - </a>";
    }
    
    //Линия создана с ячейками
    line.appendChild(td);
  }
  
  nextLine = findNextSection(section);
  
  //Нужно обработать специальный кейс, когда строчка добавляется в последнюю секцию (без проверки функция работает нестабильно, так как nextLine = null)
  if(nextLine) {
    tbody.insertBefore(line, nextLine);
  } else {
    //Поэтому вместо вставки ДО следующей секции, просто вставляем линию в конец таблицы
    tbody.appendChild(line);
  }
  
  //Передаем функции-счетчику секцию, в которой произошел клик
  count(section);
}

function deleteLine(line) { 
  var section = findCurrentSection(line);
  tbody.removeChild(line);
  count(section);
}

function isSection(line) {
  return line.classList.contains("title");
}

function count(section) {
  var line = section.nextElementSibling;
  var counter = 0;
  while(line) {
    //Передаем проверку,является ли строка заголовком секции, другой функции
    if(isSection(line)) {
      // Когда дошли до следующей секции - останавливаемся
      return;
    }
    counter++;
    line.firstElementChild.innerHTML = counter;
    line = line.nextElementSibling;
  }
}

function findNextSection(line) {
  //Начинаем искать следующую строку с классом "title",проходя через всех соседей на пути
  var nextLine = line.nextElementSibling;
  while(nextLine) {
    //Если нашлась такая строчка, то перестань искать.
    if(isSection(nextLine)) {
      //возвращаем nextline - на данном этапе тут как раз нужная строка с "title"
      return nextLine;
    }
    nextLine = nextLine.nextElementSibling;
  }
}

function findCurrentSection(previousLine) {
  var previousLine = previousLine.previousElementSibling;
  while(previousLine) {
    //Если нашлась такая строчка, то перестань искать. В previousLine на данном этапе у нас как раз нужная строка с "title"
    if(isSection(previousLine)) {
      return previousLine;
    }
    previousLine = previousLine.previousElementSibling;
  }
}


/***********************Handle Hover****************/
//Для запоминания состояний ячеек
var hoveredTD, prevHoveredTD;

function handleHover(event) {
  var target = event.target;
  if(target.tagName.toLocaleLowerCase() != "td") {return};
  
  var line = target.closest("tr");
  var firstTD = line.firstElementChild;
  var lastTD = line.lastElementChild;

  var index;
  
  //Очищаю все, если ховер попал на первую,последнюю ячейку или ячейку с Отчет№
  if(line.classList.contains("title") || target == lastTD || target == firstTD) {
    //Здесь в hoveredTD запомнена предыдущая ячейка,на которую навели и мы ищем ее\
    //заголовки сверху и сбоку и очищаем их
    if(hoveredTD) {
      var hoveredFirstTD = hoveredTD.closest("tr").firstElementChild;
      index = indexOf(hoveredTD);
      tdHead[index].style.backgroundColor = "transparent";
      hoveredFirstTD.style.backgroundColor = "transparent";
      hoveredTD.style.backgroundColor = "transparent";
    }
    
    //Здесь запомнено пред-предыдущее состояние (до оранжевого). Очищаем бэкграунд и состояния, так как при наведении на первую,последнюю и ячейку с заголовком в таблице не должно быть никаких цветов
    if(prevHoveredTD)
      prevHoveredTD.style.backgroundColor = "transparent";
      prevHoveredTD = hoveredTD = null;
  }
  
  
  //Здесь запомнено пред-предыдущее состояние (до оранжевого).
  if(prevHoveredTD) {
    prevHoveredTD.style.backgroundColor = "transparent";
  }
  
  //Здесь запомнено предыдущее состояние (до оранжевого).
  if(hoveredTD) {
    var hoveredFirstTD = hoveredTD.closest("tr").firstElementChild;
    index = indexOf(hoveredTD);
    tdHead[index].style.backgroundColor = "transparent";
    hoveredFirstTD.style.backgroundColor = "transparent";
    hoveredTD.style.backgroundColor = "orange";
    //А тут запомнится как бы пред-предыдушее состояние
    prevHoveredTD = hoveredTD;
  }
  
  
  //Отсюда начинается запоминание состояний
  if(target != firstTD && target != lastTD) {
    var index = indexOf(target);
    tdHead[index].style.backgroundColor = "green";
    firstTD.style.backgroundColor = "green";
    target.style.backgroundColor = "green";
    //В этом моменте мы запоминаем ячейку, на которую навели, при следующем запуске
    //нам понадобится это как бы предыдущее состояние
    hoveredTD = target;
  }
}


/***********************Sticky Header************/
document.addEventListener("scroll", stickLine);
var clone = null;
var clone2 = null;
var clone3 = null;
var title1 = tbody.getElementsByClassName("title")[0];
var title2 = tbody.getElementsByClassName("title")[1];
var title3 = tbody.getElementsByClassName("title")[2];
var body = document.body;

function stickLine() {
  var firstChildOftitle1 = title1.firstElementChild;
  var firstChildOftitle2 = title2.firstElementChild;
  var firstChildOftitle3 = title3.firstElementChild;
  var offsetWidth = firstChildOftitle1.offsetWidth;
  var offsetHeight = firstChildOftitle1.offsetHeight;
  var pointForAbsolute = offsetTop(title2);
  
  
  if(offsetTop(title1) <= body.scrollTop) {
    if(clone === null) {
      // stick title
      clone = title1.cloneNode(true);
      clone.className = "clone";
      clone.firstElementChild.style.borderBottom = "none";
      tbody.insertBefore(clone, title1);
      
      title1.style.top = null;
      title1.classList.add("sticky-header");
      firstChildOftitle1.style.width = offsetWidth + "px";
      firstChildOftitle1.style.height = offsetHeight + "px";
    }
  }
  
  if(clone) {
    if(offsetTop(clone) > body.scrollTop) {
      // unstick title
      tbody.removeChild(clone);
      clone = null;
      title1.classList.remove("sticky-header");
      title1.classList.remove("sticky-transition");
    }
    if(offsetTop(title1) > body.scrollTop && title1.classList.contains("sticky-transition")) {
      title1.style.top = null;
      title1.classList.add("sticky-header");
      title1.classList.remove("sticky-transition");
    }
  }
  
  // glue two titles together
  //+1/-1-это чтобы не удалять/добавлять нижние и верхние бордеры каждый раз
  if(offsetTop(title2) <= body.scrollTop + title1.offsetHeight - 1) {
    title1.classList.add("sticky-transition");
    title1.style.top = (pointForAbsolute - title1.offsetHeight + 1) + "px";
  }
  
  // stick title2
  if (pointForAbsolute <= body.scrollTop) {
    if(clone2 === null) {
      clone2 = title2.cloneNode(true);
      clone2.className = "clone";
      clone2.firstElementChild.style.borderBottom = "none";
      tbody.insertBefore(clone2, title2);
      
      title2.style.top = null;
      title2.classList.add("sticky-header");
      firstChildOftitle2.style.width = offsetWidth + "px";
      firstChildOftitle2.style.height = offsetHeight + "px";
    }
  }
  
 if (clone2) {
  if(offsetTop(clone2) > body.scrollTop) {
    tbody.removeChild(clone2);
    clone2 = null;
    title2.classList.remove("sticky-header");
    title2.classList.remove("sticky-transition");
  }
  if(offsetTop(title2) > body.scrollTop && title2.classList.contains("sticky-transition")) {
    title2.style.top = null;
    title2.classList.add("sticky-header");
    title2.classList.remove("sticky-transition");
  }
 }
  
    // glue two titles together (2-3)
  if(offsetTop(title3) <= body.scrollTop + title2.offsetHeight - 1) {
    title2.classList.add("sticky-transition");
    title2.style.top = (offsetTop(title3) - title2.offsetHeight + 1) + "px";
  }
  
  // stick title3
  if (offsetTop(title3) <= body.scrollTop) {
    if(clone3 === null) {
      clone3 = title3.cloneNode(true);
      clone3.className = "clone";
      clone3.firstElementChild.style.borderBottom = "none";
      tbody.insertBefore(clone3, title3);
      
      title3.style.top = null;
      title3.classList.add("sticky-header");
      firstChildOftitle3.style.width = offsetWidth + "px";
      firstChildOftitle3.style.height = offsetHeight + "px";
    }
  }
  
 if (clone3) {
  if(offsetTop(clone3) > body.scrollTop) {
    tbody.removeChild(clone3);
    clone3 = null;
    title3.classList.remove("sticky-header");
    title3.classList.remove("sticky-transition");
  }
 }
}

//Функция возавращает offsetTop от самого боди (с учетом изменения контекста позиционирования)
function offsetTop(node) {
  var top = node.offsetTop;
  while(node.offsetParent) {
    node = node.offsetParent;
    top += node.offsetTop;
  }
  return top;
}

