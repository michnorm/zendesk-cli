enum JSONFiles {
  TICKETS = "src/data/tickets.json",
  ORGANIZATION = "src/data/organizations.json",
  USERS = "src/data/users.json",
}

enum errorMsgs {
  UNSUPPORTED_ENV = "Error: Terminal environment is unsupported",
  EMPTY_OBJECT = "Error: Cannot search empty object",
  NO_RESULTS = "No results found",
  FILE_DOES_NOT_EXIST = "You file you requested does not exist",
}

interface State {
  searchFile: string;
  searchField: string;
  searchQuery: string;
}

interface Choice<T> {
  name: string;
  value: T;
}

export { State, JSONFiles, errorMsgs, Choice };
