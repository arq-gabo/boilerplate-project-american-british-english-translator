let str = ".5:55.0:65";
let locale2 = "british-to-american";
let locale = "american-to-british";

const changeColonPointTime = (str, locale) => {
  let tmpArr = str.split("");
  let rtnArr = [];

  let regex5 = locale === "american-to-british" ? /\d\d:\d\d/g : /\d\d\.\d\d/g;
  let regex4a = locale === "american-to-british" ? /\d:\d\d/g : /\d\.\d\d/g;
  let regex4b = locale === "american-to-british" ? /\d\d:\d/g : /\d\d\.\d/g;
  let regex3 = locale === "american-to-british" ? /\d:\d/g : /\d\.\d/g;

  let replaceColonOrPoint = locale === "american-to-british" ? "." : ":";

  for (let k = 0; k < tmpArr.length; k++) {
    let tmpArr5 = [
      tmpArr[k],
      tmpArr[k + 1],
      tmpArr[k + 2],
      tmpArr[k + 3],
      tmpArr[k + 4],
    ];
    let tmpArr4 = [tmpArr[k], tmpArr[k + 1], tmpArr[k + 2], tmpArr[k + 3]];
    let tmpArr3 = [tmpArr[k], tmpArr[k + 1], tmpArr[k + 2]];

    if (regex5.test(tmpArr5.join(""))) {
      tmpArr5[2] = replaceColonOrPoint;
      rtnArr.push(tmpArr5.join(""));
      k += 4;
    } else if (regex4b.test(tmpArr4.join(""))) {
      tmpArr4[2] = replaceColonOrPoint;
      rtnArr.push(tmpArr4.join(""));
      k += 3;
    } else if (regex4a.test(tmpArr4.join(""))) {
      tmpArr4[1] = replaceColonOrPoint;
      rtnArr.push(tmpArr4.join(""));
      k += 3;
    } else if (regex3.test(tmpArr3.join(""))) {
      tmpArr3[1] = replaceColonOrPoint;
      rtnArr.push(tmpArr3.join(""));
      k += 2;
    } else {
      rtnArr.push(tmpArr[k]);
    }
  }
  console.log(rtnArr.join(""));
};

changeColonPointTime(str, locale2);
