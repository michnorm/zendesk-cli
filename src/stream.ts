import { createReadStream, existsSync, fstat } from "fs";
import { parse } from "jsonstream";
import { Observable, of, Subscribable } from "rxjs";
import { filter, finalize, first, tap, toArray } from "rxjs/operators";
import { errorMsgs, State } from "./types";
import { searchType } from "./utils";

function getValue<T, K extends keyof T>(obj: T, name: K): T[K] {
  return obj[name];
}

// Check types, unsubscribe from streams
function createJSONStream(filePath: string): Promise<Observable<object>> {
  if (!existsSync(filePath))
    return Promise.reject(errorMsgs.FILE_DOES_NOT_EXIST);

  const jsonFile = createReadStream(filePath);

  return Promise.resolve(
    new Observable((observer) => {
      jsonFile
        .pipe(parse("*"))
        .on("data", (data) => observer.next(data))
        .on("error", (err) => observer.error(err))
        .on("end", () => {
          jsonFile.destroy();
          return observer.complete();
        });
    })
  );
}

async function fetchProperties(filePath: string): Promise<string[]> {
  const stream = await createJSONStream(filePath);

  const first_obj = await stream.pipe(first()).toPromise();
  const props = Object.keys(first_obj);

  if (props.length === 0) return Promise.reject(errorMsgs.EMPTY_OBJECT);
  else return props;
}

async function searchJSON(state: State): Promise<Observable<object>> {
  const stream = await createJSONStream(state.searchFile);

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
