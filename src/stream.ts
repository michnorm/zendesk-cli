import { createReadStream } from "fs";
import { parse } from "jsonstream";
import { Observable } from "rxjs";
import { filter, first, toArray } from "rxjs/operators";
import { errorMsgs, State } from "./types";
import { searchType } from "./utils";

function getValue<T, K extends keyof T>(obj: T, name: K): T[K] {
  return obj[name];
}

// Check types, unsubscribe from streams
function createJSONStream(filePath: string): Observable<object> {
  const jsonFile = createReadStream(filePath);

  return new Observable((observer) => {
    jsonFile
      .pipe(parse("*"))
      .on("data", (data) => observer.next(data))
      .on("error", (err) => observer.error(err))
      .on("end", () => observer.complete());
  });
}

async function fetchProperties(filePath: string): Promise<string[]> {
  const first_obj = await createJSONStream(filePath).pipe(first()).toPromise();
  const props = Object.keys(first_obj);

  if (props.length === 0) return Promise.reject(errorMsgs.EMPTY_OBJECT);
  else return props;
}

async function searchJSON(state: State): Promise<object[]> {
  return createJSONStream(state.searchFile)
    .pipe(
      filter((item: object) =>
        searchType(
          getValue(item, state.searchField as keyof object),
          state.searchQuery
        )
      ),
      toArray()
    )
    .toPromise();
}

export { createJSONStream, fetchProperties, searchJSON, getValue };
