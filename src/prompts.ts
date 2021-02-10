import { ListQuestion, Question, ConfirmQuestion } from "inquirer";
import { fetchProperties } from "./stream";
import { Choice } from "./types";
import { JSONFiles } from "./types";

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

function searchQueryPrompt(): Question {
  return {
    name: "searchQuery",
    type: "input",
    message: "Enter your search query:",
  };
}

function fieldSelectPrompt(): ListQuestion {
  return {
    name: "searchField",
    type: "list",
    message: "Select which field to search:",
    choices: (previous) => fetchProperties(previous.searchFile),
  };
}

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
