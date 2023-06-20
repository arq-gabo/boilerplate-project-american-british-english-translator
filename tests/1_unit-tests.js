const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  suite("Translate American to British", () => {
    let localeAmeriToBrit = "american-to-british";

    test("1. Translate 'Mangoes are my favorite fruit' to British English", function () {
      let text = "Mangoes are my favorite fruit";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "Mangoes are my favourite fruit"
      );
    });

    test("2. Translate 'I ate yogurt for breakfast' to British English", function () {
      let text = "I ate yogurt for breakfast";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "I ate yoghurt for breakfast"
      );
    });

    test("3. Translate 'We had a party at my friend's condo' to British English", function () {
      let text = "We had a party at my friend's condo";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "We had a party at my friend's flat"
      );
    });

    test("4. Translate 'Can you toss this in the trashcan for me?' to British English", function () {
      let text = "Can you toss this in the trashcan for me?";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "Can you toss this in the bin for me?"
      );
    });

    test("5. Translate 'The parking lot was full' to British English", function () {
      let text = "The parking lot was full";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "The car park was full"
      );
    });

    test("6. Translate 'Like a high tech Rube Goldberg machine' to British English", function () {
      let text = "Like a high tech Rube Goldberg machine";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "Like a high tech Heath Robinson device"
      );
    });

    test("7. Translate 'To play hooky means to skip class or work' to British English", function () {
      let text = "To play hooky means to skip class or work";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "To bunk off means to skip class or work"
      );
    });

    test("8. Translate 'No Mr. Bond, I expect you to die' to British English", function () {
      let text = "No Mr. Bond, I expect you to die";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "No Mr Bond, I expect you to die"
      );
    });

    test("9. Translate 'Dr. Grosh will see you now' to British English", function () {
      let text = "Dr. Grosh will see you now";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "Dr Grosh will see you now"
      );
    });

    test("10. Translate 'Lunch is at 12:15 today' to British English", function () {
      let text = "Lunch is at 12:15 today";
      assert.equal(
        translator.translate(text, localeAmeriToBrit)[0].join(" "),
        "Lunch is at 12.15 today"
      );
    });
  });

  suite("Translate British to American", () => {
    let localeBritToAmeri = "british-to-american";

    test("11. Translate 'We watched the footie match for a while' to American English", function () {
      let text = "We watched the footie match for a while";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "We watched the soccer match for a while"
      );
    });

    test("12. Translate 'Paracetamol takes up to an hour to work' to American English", function () {
      let text = "Paracetamol takes up to an hour to work";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "Tylenol takes up to an hour to work"
      );
    });

    test("13. Translate 'First, caramelise the onions' to American English", function () {
      let text = "First, caramelise the onions";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "First, caramelize the onions"
      );
    });

    test("14 Translate 'I spent the bank holiday at the funfair' to American English", function () {
      let text = "I spent the bank holiday at the funfair";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "I spent the public holiday at the carnival"
      );
    });

    test("15 Translate 'I had a bicky then went to the chippy' to American English", function () {
      let text = "I had a bicky then went to the chippy";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "I had a cookie then went to the fish-and-chip shop"
      );
    });

    test("16 Translate 'I've just got bits and bobs in my bum bag' to American English", function () {
      let text = "I've just got bits and bobs in my bum bag";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "I've just got odds and ends in my fanny pack"
      );
    });

    test("17 Translate 'The car boot sale at Boxted Airfield was called off' to American English", function () {
      let text = "The car boot sale at Boxted Airfield was called off";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "The swap meet at Boxted Airfield was called off"
      );
    });

    test("18 Translate 'Have you met Mrs Kalyani?' to American English", function () {
      let text = "Have you met Mrs Kalyani?";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "Have you met Mrs. Kalyani?"
      );
    });

    test("19 Translate 'Prof Joyner of King's College, London' to American English", function () {
      let text = "Prof Joyner of King's College, London";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "Prof. Joyner of King's College, London"
      );
    });

    test("20 Translate 'Tea time is usually around 4 or 4.30' to American English", function () {
      let text = "Tea time is usually around 4 or 4.30";
      assert.equal(
        translator.translate(text, localeBritToAmeri)[0].join(" "),
        "Tea time is usually around 4 or 4:30"
      );
    });
  });

  suite("Highlight translation", () => {
    let localeAmeriToBrit = "american-to-british";
    let localeBritToAmeri = "british-to-american";

    test("21 Highlight translation in 'Mangoes are my favorite fruit'", function () {
      let text = "Mangoes are my favorite fruit";
      let wordTranslate = "favourite";
      assert.isTrue(
        translator
          .translate(text, localeAmeriToBrit)[1]
          .includes(wordTranslate),
        "The word 'favorite' is include for apply span tag and the class 'highlight'"
      );
    });

    test("22 Highlight translation in 'I ate yogurt for breakfast'", function () {
      let text = "I ate yogurt for breakfast";
      let wordTranslate = "yoghurt";
      assert.isTrue(
        translator
          .translate(text, localeAmeriToBrit)[1]
          .includes(wordTranslate),
        "The word 'yoghur' is include for apply span tag and the class 'highlight'"
      );
    });

    test("23 Highlight translation in 'We watched the footie match for a while'", function () {
      let text = "We watched the footie match for a while";
      let wordTranslate = "soccer";
      assert.isTrue(
        translator
          .translate(text, localeBritToAmeri)[1]
          .includes(wordTranslate),
        "The word 'soccer' is include for apply span tag and the class 'highlight'"
      );
    });

    test("24 Highlight translation in 'Paracetamol takes up to an hour to work'", function () {
      let text = "Paracetamol takes up to an hour to work";
      let wordTranslate = "Tylenol";
      assert.isTrue(
        translator
          .translate(text, localeBritToAmeri)[1]
          .includes(wordTranslate),
        "The word 'Tylenol' is include for apply span tag and the class 'highlight'"
      );
    });
  });
});
