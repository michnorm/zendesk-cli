import { createReadStream, existsSync } from "fs";
import { parse } from "jsonstream";
import { Observable } from "rxjs";
import { filter, first } from "rxjs/operators";
import { errorMsgs, State } from "./types";
import { searchType } from "./utils";

/*
  Given an object and a key of that object, returns the value stored
  at that key.
*/
function getValue<T, K extends keyof T>(obj: T, name: K): T[K] {
  return obj[name];
}

/*
  Takes a path to a JSON file and returns a stream of JSON objects. This means
  the JSON file isn't loaded into memory all at once. This is particularly
  advantageous for very large JSON files.
*/
function createJSONStream(filePath: string): Promise<Observable<object>> {
  // Check if file exists, if not returned rejected promise
  if (!existsSync(filePath))
    return Promise.reject(errorMsgs.FILE_DOES_NOT_EXIST);

  const jsonFile = createReadStream(filePath);

  return Promise.resolve(
    new Observable((observer) => {
      jsonFile
        .pipe(parse("*")) // Parses the ReadStream into JSON objects
        .on("data", (data) => observer.next(data))
        .on("error", (err) => observer.error(err))
        .on("end", () => observer.complete());
    })
  );
}

/*
  Takes a path to a JSON file and returns the properties of the JSON objects.
  This function is used to display the available search fields. Note, an assumption
  is made that all objects in the JSON file have the same fields/properties.
*/
async function fetchProperties(filePath: string): Promise<string[]> {
  const stream = await createJSONStream(filePath); // Create a JSON stream

  // Take the first element off the stream.
  const first_obj = await stream.pipe(first()).toPromise();
  const props = Object.keys(first_obj); // Use the first element to get the keys

  // If the object has no keys, return rejected promise
  if (props.length === 0) return Promise.reject(errorMsgs.EMPTY_OBJECT);
  else return props;
}

/*
  Function takes a state and performs the linear search on the JSON objects.
  Returns the resulting stream, which is later used to display results.
*/
async function searchJSON(state: State): Promise<Observable<object>> {
  const stream = await createJSONStream(state.searchFile); // Create a JSON stream

  // Filter out objects with fields that don't match query
  return stream.pipe(
    filter((item: object) =>
      searchType(
        getValue(item, state.searchField as keyof object),
        state.searchQuery
      )
    )
  );
}

export { createJSONStream, fetchProperties, searchJSON, getValue };
