import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import * as googleSheets from "./googleSheets";

// Mock the Google Sheets module
vi.mock("./googleSheets", () => ({
  appendToGoogleSheet: vi.fn(),
}));

describe("Form Submission Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createCaller = () => {
    return appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });
  };

  describe("form.submit", () => {
    it("should successfully submit a form with valid data", async () => {
      const mockAppendToGoogleSheet = vi.mocked(googleSheets.appendToGoogleSheet);
      mockAppendToGoogleSheet.mockResolvedValue(true);

      const caller = createCaller();
      const result = await caller.form.submit({
        name: "John Doe",
        whatsapp: "+6591234567",
        email: "john@example.com",
        telegram: "@johndoe",
        teachingFormat: "In-person",
        weeklyHours: "10-15 hours",
        commuteHours: "2-3 hours",
        biggestPain: "Travel time",
        subjects: "Math, Science",
        optionalNotes: "Looking forward to joining",
        interviewOptIn: true,
        willingnessToPayOptIn: true,
        receiveUpdates: true,
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Form submitted successfully");
      expect(mockAppendToGoogleSheet).toHaveBeenCalledOnce();
    });

    it("should accept form with only WhatsApp contact", async () => {
      const mockAppendToGoogleSheet = vi.mocked(googleSheets.appendToGoogleSheet);
      mockAppendToGoogleSheet.mockResolvedValue(true);

      const caller = createCaller();
      const result = await caller.form.submit({
        name: "Jane Smith",
        whatsapp: "+6591234567",
        interviewOptIn: false,
        willingnessToPayOptIn: false,
        receiveUpdates: false,
      });

      expect(result.success).toBe(true);
      expect(mockAppendToGoogleSheet).toHaveBeenCalledOnce();
    });

    it("should accept form with only email contact", async () => {
      const mockAppendToGoogleSheet = vi.mocked(googleSheets.appendToGoogleSheet);
      mockAppendToGoogleSheet.mockResolvedValue(true);

      const caller = createCaller();
      const result = await caller.form.submit({
        name: "Bob Lee",
        email: "bob@example.com",
        interviewOptIn: false,
        willingnessToPayOptIn: false,
        receiveUpdates: false,
      });

      expect(result.success).toBe(true);
      expect(mockAppendToGoogleSheet).toHaveBeenCalledOnce();
    });

    it("should reject form without any contact method", async () => {
      const caller = createCaller();

      await expect(
        caller.form.submit({
          name: "No Contact",
          interviewOptIn: false,
          willingnessToPayOptIn: false,
          receiveUpdates: false,
        })
      ).rejects.toThrow("At least one contact method (WhatsApp or Email) is required");
    });

    it("should reject form without name", async () => {
      const caller = createCaller();

      await expect(
        caller.form.submit({
          name: "",
          whatsapp: "+6591234567",
          interviewOptIn: false,
          willingnessToPayOptIn: false,
          receiveUpdates: false,
        })
      ).rejects.toThrow();
    });

    it("should reject form with invalid email", async () => {
      const caller = createCaller();

      await expect(
        caller.form.submit({
          name: "Invalid Email",
          email: "not-an-email",
          interviewOptIn: false,
          willingnessToPayOptIn: false,
          receiveUpdates: false,
        })
      ).rejects.toThrow();
    });

    it("should still succeed even if Google Sheets append fails", async () => {
      const mockAppendToGoogleSheet = vi.mocked(googleSheets.appendToGoogleSheet);
      mockAppendToGoogleSheet.mockResolvedValue(false);

      const caller = createCaller();
      const result = await caller.form.submit({
        name: "Test User",
        whatsapp: "+6591234567",
        interviewOptIn: false,
        willingnessToPayOptIn: false,
        receiveUpdates: false,
      });

      expect(result.success).toBe(true);
      expect(mockAppendToGoogleSheet).toHaveBeenCalledOnce();
    });

    it("should handle all optional fields correctly", async () => {
      const mockAppendToGoogleSheet = vi.mocked(googleSheets.appendToGoogleSheet);
      mockAppendToGoogleSheet.mockResolvedValue(true);

      const caller = createCaller();
      await caller.form.submit({
        name: "Complete Form",
        whatsapp: "+6591234567",
        email: "complete@example.com",
        telegram: "@completeuser",
        teachingFormat: "Hybrid",
        weeklyHours: "5-10 hours",
        commuteHours: "1-2 hours",
        biggestPain: "Scheduling conflicts",
        subjects: "English, History",
        optionalNotes: "Very interested",
        interviewOptIn: true,
        willingnessToPayOptIn: true,
        receiveUpdates: true,
      });

      const callArgs = mockAppendToGoogleSheet.mock.calls[0][0];
      expect(callArgs.name).toBe("Complete Form");
      expect(callArgs.whatsapp).toBe("+6591234567");
      expect(callArgs.email).toBe("complete@example.com");
      expect(callArgs.telegram).toBe("@completeuser");
      expect(callArgs.teachingFormat).toBe("Hybrid");
      expect(callArgs.weeklyHours).toBe("5-10 hours");
      expect(callArgs.commuteHours).toBe("1-2 hours");
      expect(callArgs.biggestPain).toBe("Scheduling conflicts");
      expect(callArgs.subjects).toBe("English, History");
      expect(callArgs.optionalNotes).toBe("Very interested");
      expect(callArgs.interviewOptIn).toBe(true);
      expect(callArgs.willingnessToPayOptIn).toBe(true);
      expect(callArgs.receiveUpdates).toBe(true);
    });
  });
});
