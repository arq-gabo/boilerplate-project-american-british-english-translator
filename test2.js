let str = [
  [
    "Abc1.0abc",
    "paracetamol",
    "World",
    "accessorised",
    "hello",
    "back bacon",
    "break",
    "Mr",
    "abcdefghij1.0klmopqrst",
  ],
  [
    "Abc1.0abc",
    "paracetamol",
    "accessorised",
    "back bacon",
    "Mr",
    "abcdefghij1.0klmopqrst",
  ],
];

let locale = "american-to-british";
let locale2 = "british-to-american";

const addSpanToElements = (arrTranslate, locale) => {
  let arrCompleteTranslate = arrTranslate[0];
  let arrWordsTranslate = arrTranslate[1];

  const spanInit = "<span class='highlight'>";
  const spanEnd = "</span>";

  let regex =
    locale === "american-to-british" ? /\d?\d\.\d\d?/g : /\d?\d:\d\d?/g;
  let regex5 = locale === "american-to-british" ? /\d\d\.\d\d/g : /\d\d:\d\d/g;
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
        arrCompleteTranslate[i] = spanInit + arrCompleteTranslate[i] + spanEnd;
      }
    }
  }
  return arrCompleteTranslate;
};

addSpanToElements(str, locale);
