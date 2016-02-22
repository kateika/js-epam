(function () {
  var thead = document.getElementById("thead");
  var tbody = document.getElementById("tbody");
  var sections = document.getElementsByClassName("section");
  var tdHead = thead.getElementsByTagName("td");


  tbody.addEventListener("click", handleClick);
  tbody.addEventListener("mouseover", handleHover);


  //Нужна, чтобы запоминать предыдущую кликнутую ячейку
  var selectedTD;

  //Строим начальный вариант таблицы
  for(var i = 0; i < sections.length; i++) {
    for(var j = 0; j < 16; j++) {
      createLine(sections[i]);
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
      if (target.classList.contains("add")) {
        createLine(line);
      } else if (target.classList.contains("delete")) {
        deleteLine(line);
      };
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
    while(countTD = countTD.previousElementSibling) {
      index++;
    };
    return index;
  }

  function createLine(section) {
    var line = document.createElement("tr");
    var td, nextSection;
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

    nextSection = findNextSection(section);

    //Нужно обработать специальный кейс, когда строчка добавляется в последнюю секцию (без проверки функция работает нестабильно, так как nextSection = null)
    if(nextSection) {
      tbody.insertBefore(line, nextSection);
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
    return line.classList.contains("section");
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
    //Начинаем искать следующую секцию ,проходя через всех соседей на пути
    var nextLine = line.nextElementSibling;
    while(nextLine) {
      //Если нашлась такая строчка, то перестань искать.
      if(isSection(nextLine)) {
        //возвращаем nextline - на данном этапе тут как раз искомая секция
        return nextLine;
      }
      nextLine = nextLine.nextElementSibling;
    }
  }

  function findCurrentSection(line) {
    var previousLine = line.previousElementSibling;
    while(previousLine) {
      //Если нашлась такая строчка, то перестань искать. В previousLine на данном этапе у нас как раз нужная строка с "section"
      if(isSection(previousLine)) {
        return previousLine;
      }
      previousLine = previousLine.previousElementSibling;
    }
  }


  /***********************Handle Hover****************/
  //Для запоминания состояний ячеек
  var hoveredTD, prevHoveredTD, hoveredFirstTD;

  function handleHover(event) {
    var target = event.target;
    if(target.tagName.toLocaleLowerCase() != "td") {
      return;
    };

    var line = target.closest("tr");
    var firstTD = line.firstElementChild;
    var lastTD = line.lastElementChild;

    var index;

    //Очищаю все, если ховер попал на первую,последнюю ячейку или ячейку с Отчет№
    if(isSection(line) || target == lastTD || target == firstTD) {
      //Здесь в hoveredTD запомнена предыдущая ячейка,на которую навели и мы ищем ее\
      //заголовки сверху и сбоку и очищаем их
      if(hoveredTD) {
        hoveredFirstTD = hoveredTD.closest("tr").firstElementChild;
        index = indexOf(hoveredTD);
        tdHead[index].classList.remove("hover");
        hoveredFirstTD.classList.remove("hover");
        hoveredTD.classList.remove("hover");
      }

      //Здесь запомнено пред-предыдущее состояние (до оранжевого). Очищаем бэкграунд и состояния, так как при наведении на первую,последнюю и ячейку с заголовком в таблице не должно быть никаких цветов
      if(prevHoveredTD) {
        prevHoveredTD.classList.remove("prev-hover");
        prevHoveredTD.classList.remove("hover");
        prevHoveredTD = hoveredTD = null;  
      }
    }


    //Здесь запомнено пред-предыдущее состояние (до оранжевого).
    if(prevHoveredTD) {
      prevHoveredTD.classList.remove("hover");
      prevHoveredTD.classList.remove("prev-hover");
    }

    //Здесь запомнено предыдущее состояние (до оранжевого).
    if(hoveredTD) {
      hoveredFirstTD = hoveredTD.closest("tr").firstElementChild;
      index = indexOf(hoveredTD);
      tdHead[index].classList.remove("hover");
      hoveredFirstTD.classList.remove("hover");
      tdHead[index].classList.remove("prev-hover");
      hoveredFirstTD.classList.remove("prev-hover");
      hoveredTD.classList.add("prev-hover");
      //А тут запомнится как бы пред-предыдушее состояние
      prevHoveredTD = hoveredTD;
    }


    //Отсюда начинается запоминание состояний
    if(target != firstTD && target != lastTD) {
      var index = indexOf(target);
      tdHead[index].classList.add("hover");
      firstTD.classList.add("hover");
      target.classList.add("hover");
      //В этом моменте мы запоминаем ячейку, на которую навели, при следующем запуске
      //нам понадобится это как бы предыдущее состояние
      hoveredTD = target;
    }
  }


  /***********************Sticky Header************/
  document.addEventListener("scroll", stickLine);
  var sections = tbody.getElementsByClassName("section");
  //Нам надо создать столько клонов, сколько у нас секций
  var clones = new Array(sections.length);
  clones.fill(null);

  var body = document.body;

  function stickLine() {
    for (var i = 0; i < sections.length; i++) {
      //Когда верхний бордер становится вровень с верхней границей окна браузера делаем position = fixed
      if (offsetTop(sections[i]) <= body.scrollTop) {
        //При скролле вниз смотрим, создавался ли клон, чтоб они не плодились при скролле
        if (clones[i] === null) {
          clones[i] = createClone(sections[i]);
          setStickyState(sections[i]);
        }
      }

      if (clones[i]) {
        //При скролле наверх удаляется клон
        if (offsetTop(clones[i]) > body.scrollTop) {
          returnToNormalPlace(clones[i], sections[i]);
          clones[i] = null;
        }
        //position меняется на fixed, когда заголовки "разлепляются"
        if (offsetTop(sections[i]) > body.scrollTop && sections[i].classList.contains("sticky-transition")) {
          setStickyState(sections[i]);
        }
      }

      /*+1/-1-это чтобы не удалять/добавлять нижние и верхние бордеры каждый раз при скролле туда-сюда (из-за отрисовки браузера при соединение заголовков бордеры кажутся двойными). Последнему элементу не надо добавлять "переходное" состояние*/
      if (i != sections.length - 1) {
        if (offsetTop(sections[i+1]) <= body.scrollTop + sections[i].offsetHeight - 1) {
        setTransitionState(sections[i], sections[i+1]);
        }
      }
    }
  }

  function createClone(section) {
    var clone = section.cloneNode(true);
    clone.className = "clone";
    clone.firstElementChild.style.borderBottom = "none";
    tbody.insertBefore(clone, section);
    return clone;
  }

  //делает position=static и удаляет клона
  function returnToNormalPlace(clone, section) {
    tbody.removeChild(clone);
    section.classList.remove("sticky-header");
    section.classList.remove("sticky-transition");
  }

  function setStickyState(section) {
    //удаляем инлайновые стили иначе класс в css не перезаписывает их
    section.style.top = null;
    section.classList.add("sticky-header");
    section.classList.remove("sticky-transition");
  }

  function setTransitionState(prevSection, section) {
    prevSection.classList.add("sticky-transition");
    prevSection.style.top = (offsetTop(section) - prevSection.offsetHeight + 1) + "px";
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

})();