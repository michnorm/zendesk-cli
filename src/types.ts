// Paths to JSON files
enum JSONFiles {
  TICKETS = "src/data/tickets.json",
  ORGANIZATION = "src/data/organizations.json",
  USERS = "src/data/users.json",
}

// Common error messages
enum errorMsgs {
  UNSUPPORTED_ENV = "Error: Terminal environment is unsupported",
  EMPTY_OBJECT = "Error: Cannot search empty object",
  NO_RESULTS = "No results found",
  FILE_DOES_NOT_EXIST = "Error: You file you requested does not exist",
}

// Represents all data required to perform a search
interface State {
  searchFile: string;
  searchField: string;
  searchQuery: string;
}

// Represents a choice for Inquirer JS choice question
interface Choice<T> {
  name: string;
  value: T;
}

export { State, JSONFiles, errorMsgs, Choice };
