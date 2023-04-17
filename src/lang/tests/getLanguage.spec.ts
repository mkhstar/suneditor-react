import getLanguage from "../getLanguage";

jest.mock("suneditor/src/lang/en.js", () => ({
  code: "en",
}));

describe("getLanguage", () => {
  it("should return undefined when no argument is provided", () => {
    const result = getLanguage();
    expect(result).toBeUndefined();
  });

  it("should return the lang object when an object argument is provided", () => {
    const lang = { test: "test" };
    const result = getLanguage(lang as any);
    expect(result).toBe(lang);
  });

  it("should return the corresponding language module when a string argument is provided", () => {
    const result = getLanguage("en");
    expect(result).toEqual({ code: "en" });
  });

  it("should return undefined when an unsupported argument type is provided", () => {
    const result = getLanguage(123 as any);
    expect(result).toBeUndefined();
  });
});
