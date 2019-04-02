var lastLetterList = ["A", "Z", "Y", "X", "U", "T", "S", "R", "P", "M", "L", "K", "J", "H", "G", "E", "D", "C", "B"];

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"];

var coeff = [9, 4, 5, 4, 3, 2];
var singleCoeff = [9, 5, 4, 3, 2];

function parseLicense(plateNum) {
  var license = plateNum;
  var array = license.split("");
  if (array[0] == "S" && alphabet.includes(array[1]) && alphabet.includes(array[2])) {
    array.shift();
  }
  if (alphabet.includes(array[array.length-1])) {
    var toCheck = array.pop();
  } else {
    toCheck = "NA";
  }
  for (j = 0; j < array.length; j++) {
    for (i = 0; i < alphabet.length; i++) {
      if (alphabet[i] == array[j]) {
        array[j] = i+1;
      }
    }
  }
  if (array.length == 6) {
    for (i = 0; i < array.length; i++) {
      array[i] = parseInt(array[i], 10)*coeff[i];
    }
  } else {
    for (i = 0; i < array.length; i++) {
      array[i] = parseInt(array[i], 10)*singleCoeff[i];
    }
  }
  var count = 0;
  for (i = 0; i < array.length; i++) {
    count += array[i];
  }
  var remainder = count % 19;
  var checkLetter = lastLetterList[remainder];
  return [checkLetter, toCheck];
}

function isLicenseCorrect() {
  var license = document.getElementsByName('licensePlate')[0].value.toUpperCase();
  var result = parseLicense(license);
  if (result[0] == result[1]) {
    var output = document.getElementById('isAns');
    output.innerHTML = license + " is valid :)";
  } else {
    var output = document.getElementById('isAns');
    output.innerHTML = license + " is invalid :(";
  }
}

function findLastLetter() {
  var license = document.getElementsByName('incompletePlate')[0].value.toUpperCase();
  var result = parseLicense(license);
  var output = document.getElementById('findAns');
  output.innerHTML = "You're probably looking for " + license + result[0];
}
