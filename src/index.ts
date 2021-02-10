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

/*
  Program entrypoint. Uses inquirer to prompt the user to answer the required
  questions. This will result in a state that can be used to perform the search.
  All errors are propagated and displayed by this function.
*/
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

/*
  Function that uses inquirer prompt to check whether the user wants
  to search again. If so, call the main function.
*/
function searchAgain() {
  inquirer.prompt([searchAgainPrompt()]).then(({ searchAgain }) => {
    if (searchAgain) main();
  });
}

main();
