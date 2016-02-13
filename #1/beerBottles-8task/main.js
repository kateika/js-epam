//Написать скрипт, который на входе получает число-количество бутылок пива, и возвращает песню вида:
//99 bottles of beer on the wall, 99 bottles of beer.
//Take one down and pass it around, 98 bottles of beer on the wall.
//98 bottles of beer on the wall, 98 bottles of beer.
//Take one down and pass it around, 97 bottles of beer on the wall.
//// и так далее, до конца
//1 bottle of beer on the wall, 1 bottle of beer.
//Take one down and pass it around, no more bottles of beer on the wall.
//No more bottles of beer on the wall, no more bottles of beer.
//Go to the store and buy some more, 99 bottles of beer on the wall.

function funnySong(totalBottles) {
  var n = totalBottles;
  var firstLine, secondLine, couplet, song = "";
  while (n >= 0) {
    firstLine = bottles(n) + " on the wall, " + bottles(n);
    if (n != 0) {
      secondLine = "Take one down and pass it around, " + bottles(n-1) + " on the wall";
    } else {
      secondLine = "Go to the store and buy some more, " + bottles(totalBottles);
    }

    couplet = titleCase(firstLine) + ".\n" + secondLine + ".\n\n";
    n = n - 1;
    song += couplet;
  }
  return song;
}

console.log(funnySong(8));

function bottles(n) {
  if(n < 0) n = 0;
  var str;
  switch(n) {
    case 0: str = "no more bottles"; break;
    case 1: str = "1 bottle"; break;
    default: str = n + " bottles"; break;
  }
  return str + " of beer"; 
}


function titleCase(string) { 
  return string.charAt(0).toUpperCase() + string.slice(1); 
}
