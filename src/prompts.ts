import { ListQuestion, Question, ConfirmQuestion } from "inquirer";
import { fetchProperties } from "./stream";
import { Choice } from "./types";
import { JSONFiles } from "./types";

/*
  Prompt that lists available files to search from.
*/
function fileSelectPrompt(): ListQuestion {
  const options: Choice<string>[] = [
    { name: "Tickets", value: JSONFiles.TICKETS },
    { name: "Users", value: JSONFiles.USERS },
    { name: "Organizations", value: JSONFiles.ORGANIZATION },
  ];

  return {
    name: "searchFile",
    type: "list",
    message: "Select which file to search:",
    choices: options,
  };
}

/*
  Prompt which accepts search query string from user.
*/
function searchQueryPrompt(): Question {
  return {
    name: "searchQuery",
    type: "input",
    message: "Enter your search query:",
  };
}

/*
  Prompt which lists all available search fields. This is dynamic and uses the
  previous question (fileSelectPrompt) to choose which file to fetch JSON keys from.
*/
function fieldSelectPrompt(): ListQuestion {
  return {
    name: "searchField",
    type: "list",
    message: "Select which field to search:",
    choices: (previous) => fetchProperties(previous.searchFile),
  };
}

/*
  Yes or no prompt used to check whether the user wants to search again.
*/
function searchAgainPrompt(): ConfirmQuestion {
  return {
    name: "searchAgain",
    type: "confirm",
    message: "Search again?",
  };
}

export {
  fileSelectPrompt,
  searchQueryPrompt,
  fieldSelectPrompt,
  searchAgainPrompt,
};
