import { errorMsgs, State } from "./types";
import {
  fieldSelectPrompt,
  fileSelectPrompt,
  searchAgainPrompt,
  searchQueryPrompt,
} from "./prompts";
import inquirer from "inquirer";
import * as figlet from "figlet";
import { searchJSON } from "./stream";
import { printStream, printError } from "./utils";

console.log(figlet.textSync("Zendesk-CLI"));

// Need to check for promise errors here
async function main() {
  try {
    const state = (await inquirer.prompt([
      fileSelectPrompt(),
      fieldSelectPrompt(),
      searchQueryPrompt(),
    ])) as State;

    const stream = await searchJSON(state);
    printStream(stream, errorMsgs.NO_RESULTS, searchAgain);
  } catch (error) {
    if (error.isTtyError) printError(errorMsgs.UNSUPPORTED_ENV);
    else printError(error);
  }
}

function searchAgain() {
  inquirer.prompt([searchAgainPrompt()]).then(({ searchAgain }) => {
    if (searchAgain) main();
  });
}

main();
