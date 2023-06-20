"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    let { text, locale } = req.body;
    try {
      if (text === "") {
        throw new Error("No text to translate");
      } else if (
        !req.body.hasOwnProperty("text") ||
        !req.body.hasOwnProperty("locale")
      ) {
        throw new Error("Required field(s) missing");
      } else if (
        locale !== "american-to-british" &&
        locale !== "british-to-american"
      ) {
        throw new Error("Invalid value for locale field");
      } else {
        if (text === translator.translate(text, locale)[0].join(" ")) {
          res.json({ text, translation: "Everything looks good to me!" });
        } else {
          res.json({
            text,
            translation: translator.addSpanToElements(
              translator.translate(text, locale),
              locale
            ),
          });
        }
      }
    } catch (e) {
      res.json({ error: e.message });
    }
  });
};
