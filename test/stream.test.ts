import "mocha";
import mock from "mock-fs";
import fs, { createReadStream } from "fs";
import sinon from "sinon";
import { assert, expect } from "chai";
import { createJSONStream, fetchProperties, searchJSON } from "../src/stream";
import { toArray } from "rxjs/operators";
import { errorMsgs } from "../src/types";

const example_json_1 = [
  {
    id: 1,
    url: "example.com",
    countries: ["Australia"],
  },
  {
    id: 2,
    url: "example.com",
    countries: ["New Zealand"],
  },
  {
    id: 3,
    url: "example.com",
    countries: ["United States"],
  },
];

const example_json_2 = [{}];

describe("Stream functions", () => {
  beforeEach(() => {
    mock({
      "mock_1.json": JSON.stringify(example_json_1),
      "mock_2.json": JSON.stringify(example_json_2),
    });

    const readStream_1 = createReadStream("mock_1.json");
    const readStream_2 = createReadStream("mock_2.json");

    const stub = sinon.stub(fs, "createReadStream");

    stub.withArgs("mock_1.json").returns(readStream_1);
    stub.withArgs("mock_2.json").returns(readStream_2);
  });

  afterEach(() => {
    mock.restore();
    sinon.verifyAndRestore();
  });

  describe("createJSONStream", () => {
    it("createJSONStream exists", () => {
      expect(createJSONStream).is.a("function");
    });
    it("createJSONStream observable contains all JSON elements", () => {
      createJSONStream("mock_1.json")
        .pipe(toArray())
        .toPromise()
        .then((objects) => {
          assert.deepEqual(objects, example_json_1);
        });
    });
  });

  describe("fetchProperties", () => {
    it("fetchProperties exists", () => {
      expect(fetchProperties).is.a("function");
    });
    it("fetchProperties returns correct keys", () => {
      fetchProperties("mock_1.json").then((keys) => {
        assert.deepEqual(keys, Object.keys(example_json_1));
      });
    });
    it("fetchProperties returns error for empty object", () => {
      fetchProperties("mock_2.json").catch((error) => {
        assert.equal(error, errorMsgs.EMPTY_OBJECT);
      });
    });
  });

  describe("searchJSON", () => {
    it("searchJSON exists", () => {
      expect(searchJSON).is.a("function");
    });
    it("searchJSON returns exact result", () => {
      const state = {
        searchFile: "mock_1.json",
        searchField: "id",
        searchQuery: "1",
      };

      searchJSON(state).then((result) => {
        assert.deepEqual(result[0], example_json_1[0]);
      });
    });
    it("searchJSON returns multiple results", () => {
      const state = {
        searchFile: "mock_1.json",
        searchField: "url",
        searchQuery: "example.com",
      };

      searchJSON(state).then((result) => {
        assert.deepEqual(result, example_json_1);
      });
    });
    it("searchJSON returns correct result for array", () => {
      const state = {
        searchFile: "mock_1.json",
        searchField: "countries",
        searchQuery: "australia",
      };

      searchJSON(state).then((result) => {
        assert.deepEqual(result[0], example_json_1[0]);
      });
    });
    it("searchJSON returns no results", () => {
      const state = {
        searchFile: "mock_1.json",
        searchField: "url",
        searchQuery: "zendesk.com",
      };

      searchJSON(state).then((result) => {
        assert.deepEqual(result, []);
      });
    });
  });
});
