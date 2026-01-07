import { describe, expect, it } from "vitest";
import { initializeSheetHeaders } from "./googleSheets";

describe("Google Sheets Integration", () => {
  it("should successfully initialize sheet headers with valid credentials", async () => {
    const result = await initializeSheetHeaders();
    
    expect(result).toBe(true);
  }, { timeout: 15000 }); // Increase timeout for API call
});
