const americanOnly = require("./components/american-only.js");
const americanOnlyKeys = Object.keys(americanOnly);
const americanOnlyValues = Object.values(americanOnly);

const americanToBritishSpelling = require("./components/american-to-british-spelling.js");
const americanToBritishSpellingKeys = Object.keys(americanToBritishSpelling);
const americanToBritishSpellingValues = Object.values(
  americanToBritishSpelling
);

const americanToBritishTitles = require("./components/american-to-british-titles.js");
const americanToBritishTitlesKeys = Object.keys(americanToBritishTitles);
const americanToBritishTitlesValues = Object.values(americanToBritishTitles);

const britishOnly = require("./components/british-only.js");
const britishOnlyKeys = Object.keys(britishOnly);
const britishOnlyValues = Object.values(britishOnly);

// let text =
//   "hello Acetaminophen World accessorized hello canadian bacon break mr. abcdefghij1:0klmopqrst";

let text =
  "hello bum bag world postcode world acclimatisation flight autocad abc prof abc99.88 spot of tea";

// locale = "american-to-british";
let locale = "british-to-american";

//Function for find the index from keys or from values
const findIndex = (arr, writeFind) => arr.indexOf(writeFind.toLowerCase());

// Function for transform the first character to uppercase
const mayusFirstCharacter = (str) =>
  str
    .split("")
    .map((val, idx) => (idx === 0 ? val.toUpperCase() : val))
    .join("");

// Function for change : to . if american to british translate or change . to : if british to american translate
const changeColonPointTime = (str, translate) => {
  return str
    .split("")
    .map((val) => {
      if (val === ":" && translate === "american-to-british") {
        return ".";
      } else if (val === "." && translate === "british-to-american") {
        return ":";
      } else {
        return val;
      }
    })
    .join("");
};

const translateAmeriBrit = (
  text,
  locale,
  onlyKeys,
  onlyValues,
  spellingKeys,
  spellingValues,
  titleKeys,
  titleValues
) => {
  let textArr = text.split(" ");
  let idx = 0;
  let regex =
    locale === "american-to-british" ? /\d?\d:\d\d?/g : /\d?\d.\d\d?/g;
  let rtnArr = [];
  let arrToApplyColor = [];

  for (let a = 0; a < textArr.length; a++) {
    if (a === 0 && /[a-z]/.test(textArr[a][0])) {
      //Conditional for put uppercase if first letter is lowercase
      rtnArr.push(mayusFirstCharacter(textArr[a]));
    } else if (regex.test(textArr[a])) {
      // Conditional for check american or british time
      rtnArr.push(changeColonPointTime(textArr[a], locale));
      arrToApplyColor.push(changeColonPointTime(textArr[a], locale));
    } else if (findIndex(onlyKeys, textArr[a]) !== -1) {
      // This conditional for check americanOnly or britishOnly
      idx = findIndex(onlyKeys, textArr[a]);
      rtnArr.push(onlyValues[idx]);
      arrToApplyColor.push(onlyValues[idx]);
    } else if (findIndex(spellingKeys, textArr[a]) !== -1) {
      // Conditional for check American to British spelling
      idx = findIndex(spellingKeys, textArr[a]);
      rtnArr.push(spellingValues[idx]);
      arrToApplyColor.push(spellingValues[idx]);
    } else if (findIndex(titleKeys, textArr[a]) !== -1) {
      // Conditional for check American to British titles
      idx = findIndex(titleKeys, textArr[a]);
      rtnArr.push(mayusFirstCharacter(titleValues[idx]));
      arrToApplyColor.push(mayusFirstCharacter(titleValues[idx]));
    } else if (
      // Conditional for check american or british only compound 2 words ej canadian bacon translate to back bacon
      findIndex(onlyKeys, textArr[a] + " " + textArr[a + 1]) !== -1
    ) {
      idx = findIndex(onlyKeys, textArr[a] + " " + textArr[a + 1]);
      rtnArr.push(onlyValues[idx]);
      arrToApplyColor.push(onlyValues[idx]);
      a++;
    } else if (
      findIndex(
        // Conditional for check american or british only compound 3 words ej spot of tea translate to cup of tea
        onlyKeys,
        textArr[a] + " " + textArr[a + 1] + " " + textArr[a + 2]
      ) !== -1
    ) {
      idx = findIndex(
        onlyKeys,
        textArr[a] + " " + textArr[a + 1] + " " + textArr[a + 2]
      );
      rtnArr.push(onlyValues[idx]);
      arrToApplyColor.push(onlyValues[idx]);
      a += 2;
    } else {
      rtnArr.push(textArr[a]);
    }
  }

  return rtnArr.join(" ");
};

// console.log(
//   translate(
//     text,
//     locale,
//     americanOnlyKeys,
//     americanOnlyValues,
//     americanToBritishSpellingKeys,
//     americanToBritishSpellingValues,
//     americanToBritishTitlesKeys,
//     americanToBritishTitlesValues
//   )
// );

console.log(
  translateAmeriBrit(
    text,
    locale,
    britishOnlyKeys,
    britishOnlyValues,
    americanToBritishSpellingValues,
    americanToBritishSpellingKeys,
    americanToBritishTitlesValues,
    americanToBritishTitlesKeys
  )
);
