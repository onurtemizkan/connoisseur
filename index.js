"use strict";

const connoisseur = require("./lib/connoisseur");
const fs = require("fs");
const sourceFiles = require("yargs").argv._;

const displayErrors = function (errors) {
    let hasError = false;
    errors.forEach(file => {
        if (!file[1].length)
            return;

        hasError = true;
        /* eslint-disable no-console */
        console.log(
            `Errors found for file ${file[0]}:\n${
                file[1].reduce((prev, errorData) =>
                    `${prev}\t${errorData.code.replace(/(\r\n|\n|\r)/gm, "\r\n\t")}\t${
                        errorData.error || `→ Expected: ${errorData.expected}, Found: ${errorData.actual}`
                    }\n`
                , "")
            }`
        );
        /* eslint-enable no-console */
    });

    return hasError;
};

const errors = sourceFiles.map(filepath => [filepath, connoisseur(fs.readFileSync(filepath, "utf8"))]);

process.exit(displayErrors(errors));
