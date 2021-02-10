import "mocha";
import { expect } from "chai";
import {
  cleanString,
  listStringMatch,
  stringMatch,
  searchType,
} from "../src/utils";

describe("Utility functions", () => {
  describe("cleanString", () => {
    it("cleanString exists", () => {
      expect(cleanString).is.a("function");
    });
    it("cleanString removes trailing spaces", () => {
      expect(cleanString("   abc   ")).to.equal("abc");
    });
    it("cleanString converts to lowercase", () => {
      expect(cleanString("ABC")).to.equal("abc");
    });
    it("cleanString removes punctuation", () => {
      expect(cleanString("Hello, World!")).to.equal("hello world");
    });
  });

  describe("stringMatch", () => {
    it("stringMatch exists", () => {
      expect(stringMatch).is.a("function");
    });
    it("stringMatch correctly matches booleans", () => {
      expect(stringMatch(true, "true")).is.true;
    });
    it("stringMatch correctly matches numbers", () => {
      expect(stringMatch(123, "123")).is.true;
    });
    it("stringMatch correctly matches strings", () => {
      expect(stringMatch("Hello, World!", "Hello World")).is.true;
    });
  });

  describe("listStringMatch", () => {
    it("listStringMatch exists", () => {
      expect(listStringMatch).is.a("function");
    });
    it("listStringMatch returns true if string in list matches query", () => {
      expect(listStringMatch(["Hello", "World!"], "hello")).is.true;
    });
    it("listStringMatch returns false if no string in list matches query", () => {
      expect(listStringMatch(["Hello", "World!"], "abc")).is.false;
    });
    it("listStringMatch returns false for empty list", () => {
      expect(listStringMatch([], "abc")).is.false;
    });
  });

  describe("searchType", () => {
    it("searchType exists", () => {
      expect(searchType).is.a("function");
    });
    it("searchType with array argument and query returns match", () => {
      expect(searchType(["Hello", "World"], "hello")).is.true;
    });
    it("searchType with string argument and query returns match", () => {
      expect(searchType("HELLO", "hello")).is.true;
    });
    it("searchType with number argument and query returns match", () => {
      expect(searchType(12345, "12345")).is.true;
    });
    it("searchType with boolean argument and query returns match", () => {
      expect(searchType(false, "false")).is.true;
    });
  });
});
