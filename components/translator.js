const americanOnly = require("./american-only.js");
const americanOnlyKeys = Object.keys(americanOnly);
const americanOnlyValues = Object.values(americanOnly);

const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishSpellingKeys = Object.keys(americanToBritishSpelling);
const americanToBritishSpellingValues = Object.values(
  americanToBritishSpelling
);

const americanToBritishTitles = require("./american-to-british-titles.js");
const americanToBritishTitlesKeys = Object.keys(americanToBritishTitles);
const americanToBritishTitlesValues = Object.values(americanToBritishTitles);

const britishOnly = require("./british-only.js");
const britishOnlyKeys = Object.keys(britishOnly);
const britishOnlyValues = Object.values(britishOnly);

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

// this function was made the traduction
const transAmeriBrit = (
  text,
  locale,
  onlyKeys,
  onlyValues,
  spellingKeys,
  spellingValues,
  titleKeys,
  titleValues
) => {
  let textArr = mayusFirstCharacter(text).split(" ");
  let idx = 0;
  let regex =
    locale === "american-to-british" ? /\d?\d:\d\d?/g : /\d?\d.\d\d?/g;
  let worldTranslate = "";
  let rtnArr = [];
  let strArrForSpan = [];

  for (let a = 0; a < textArr.length; a++) {
    if (regex.test(textArr[a])) {
      // Conditional for check american or british time
      worldTranslate = changeColonPointTime(textArr[a], locale);
      rtnArr.push(worldTranslate);
      strArrForSpan.push(worldTranslate);
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
      worldTranslate = onlyValues[idx];
      rtnArr.push(worldTranslate);
      strArrForSpan.push(worldTranslate);
      a += 2;
    } else if (
      // Conditional for check american or british only compound 2 words ej canadian bacon translate to back bacon
      findIndex(onlyKeys, textArr[a] + " " + textArr[a + 1]) !== -1
    ) {
      idx = findIndex(onlyKeys, textArr[a] + " " + textArr[a + 1]);
      worldTranslate = onlyValues[idx];
      rtnArr.push(worldTranslate);
      strArrForSpan.push(worldTranslate);

      a++;
    } else if (findIndex(onlyKeys, textArr[a]) !== -1) {
      // This conditional for check americanOnly or britishOnly
      idx = findIndex(onlyKeys, textArr[a]);
      worldTranslate = onlyValues[idx];
      rtnArr.push(worldTranslate);
      strArrForSpan.push(worldTranslate);
    } else if (findIndex(spellingKeys, textArr[a]) !== -1) {
      // Conditional for check American to British spelling
      idx = findIndex(spellingKeys, textArr[a]);
      worldTranslate = spellingValues[idx];
      rtnArr.push(worldTranslate);
      strArrForSpan.push(worldTranslate);
    } else if (findIndex(titleKeys, textArr[a]) !== -1) {
      // Conditional for check American to British titles
      idx = findIndex(titleKeys, textArr[a]);
      worldTranslate = mayusFirstCharacter(titleValues[idx]);
      rtnArr.push(worldTranslate);
      strArrForSpan.push(worldTranslate);
    } else {
      rtnArr.push(textArr[a]);
    }
  }
  // This return in the first element return an array with all text translate,
  //in the second element is an array just word translated for add span class="highlight"
  return [rtnArr, strArrForSpan];
};

class Translator {
  translate(text, locale) {
    if (locale === "american-to-british") {
      return transAmeriBrit(
        text,
        locale,
        americanOnlyKeys,
        americanOnlyValues,
        americanToBritishSpellingKeys,
        americanToBritishSpellingValues,
        americanToBritishTitlesKeys,
        americanToBritishTitlesValues
      );
    } else if (locale === "british-to-american") {
      return transAmeriBrit(
        text,
        locale,
        britishOnlyKeys,
        britishOnlyValues,
        americanToBritishSpellingValues,
        americanToBritishSpellingKeys,
        americanToBritishTitlesValues,
        americanToBritishTitlesKeys
      );
    }
  }

  addSpanToElements(arrTranslate, locale) {
    let arrCompleteTranslate = arrTranslate[0];
    let arrWordsTranslate = arrTranslate[1];

    const spanInit = '<span class="highlight">';
    const spanEnd = "</span>";

    let regex =
      locale === "american-to-british" ? /\d?\d\.\d\d?/g : /\d?\d:\d\d?/g;
    let regex5 =
      locale === "american-to-british" ? /\d\d\.\d\d/g : /\d\d:\d\d/g;
    let regex4a = locale === "american-to-british" ? /\d\.\d\d/g : /\d:\d\d/g;
    let regex4b = locale === "american-to-british" ? /\d\d\.\d/g : /\d\d:\d/g;
    let regex3 = locale === "american-to-british" ? /\d\.\d/g : /\d:\d/g;

    for (let i = 0; i < arrCompleteTranslate.length; i++) {
      if (arrWordsTranslate.includes(arrCompleteTranslate[i])) {
        if (regex.test(arrCompleteTranslate[i])) {
          let tmpArr = arrCompleteTranslate[i].split("");
          let arrSpan = [];
          for (let j = 0; j < tmpArr.length; j++) {
            let tmpArr5 = [
              tmpArr[j],
              tmpArr[j + 1],
              tmpArr[j + 2],
              tmpArr[j + 3],
              tmpArr[j + 4],
            ].join("");
            let tmpArr4 = [
              tmpArr[j],
              tmpArr[j + 1],
              tmpArr[j + 2],
              tmpArr[j + 3],
            ].join("");
            let tmpArr3 = [tmpArr[j], tmpArr[j + 1], tmpArr[j + 2]].join("");
            if (regex5.test(tmpArr5)) {
              arrSpan.push(`${spanInit}${tmpArr5}${spanEnd}`);
              j += 4;
            } else if (regex4a.test(tmpArr4) || regex4b.test(tmpArr4)) {
              arrSpan.push(`${spanInit}${tmpArr4}${spanEnd}`);
              j += 3;
            } else if (regex3.test(tmpArr3)) {
              arrSpan.push(`${spanInit}${tmpArr3}${spanEnd}`);
              j += 2;
            } else {
              arrSpan.push(tmpArr[j]);
            }
          }
          arrCompleteTranslate[i] = arrSpan.join("");
        } else {
          arrCompleteTranslate[i] =
            spanInit + arrCompleteTranslate[i] + spanEnd;
        }
      }
    }
    return arrCompleteTranslate.join(" ");
  }
}

module.exports = Translator;
