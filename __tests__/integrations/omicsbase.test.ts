// @vitest-environment node
import { describe, expect, it } from "vitest";
import { parseStoredValue, webHosts, isEmbedded } from "../../src/integrations/omicsbase/policy";

describe("OmicsBase workspace contract", () => {
  it("detects embedded mode correctly", () => {
    expect(typeof isEmbedded()).toBe("boolean");
  });
  it("recovers corrupt storage and preserves valid stored preferences", () => {
    expect(parseStoredValue("broken json", "served")).toBe("served");
    expect(parseStoredValue(null, true)).toBe(true);
    expect(parseStoredValue("false", true)).toBe(false);
  });
  it("accepts both backend web-host response shapes", () => {
    expect(webHosts(["http://report"])).toEqual(["http://report"]);
    expect(webHosts({ "http://report": 3001 })).toEqual(["http://report"]);
  });
});
