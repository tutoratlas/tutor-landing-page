import { google } from 'googleapis';

/**
 * Google Sheets integration for TutorAtlas form submissions
 * 
 * This module handles appending form data to a Google Sheet.
 * Requires GOOGLE_SHEETS_CREDENTIALS and GOOGLE_SHEET_ID environment variables.
 */

interface FormSubmission {
  timestamp: string;
  name: string;
  whatsapp: string;
  email: string;
  teachingFormat: string;
  weeklyHours: string;
  commuteHours: string;
  biggestPain: string;
  subjects: string;
  optionalNotes: string;
  interviewOptIn: boolean;
  willingnessToPayOptIn: boolean;
  receiveUpdates: boolean;
}

/**
 * Append a form submission to Google Sheets
 * @param formData The form submission data
 * @returns Success status
 */
export async function appendToGoogleSheet(formData: FormSubmission): Promise<boolean> {
  try {
    // Check if credentials are configured
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentials || !spreadsheetId) {
      console.warn('[Google Sheets] Missing credentials or sheet ID');
      return false;
    }

    // Parse credentials (should be a JSON string)
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare row data in the same order as the sheet columns
    const rowData = [
      formData.timestamp,
      formData.name,
      formData.whatsapp,
      formData.email,
      formData.teachingFormat,
      formData.weeklyHours,
      formData.commuteHours,
      formData.biggestPain,
      formData.subjects,
      formData.optionalNotes,
      formData.interviewOptIn ? 'Yes' : 'No',
      formData.willingnessToPayOptIn ? 'Yes' : 'No',
      formData.receiveUpdates ? 'Yes' : 'No',
    ];

    // Append the row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:M', // Adjust range if needed
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('[Google Sheets] Successfully appended form submission');
    return true;
  } catch (error) {
    console.error('[Google Sheets] Error appending to sheet:', error);
    return false;
  }
}

/**
 * Initialize the Google Sheet with headers (call this once manually if needed)
 */
export async function initializeSheetHeaders(): Promise<boolean> {
  try {
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentials || !spreadsheetId) {
      console.warn('[Google Sheets] Missing credentials or sheet ID');
      return false;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Define headers
    const headers = [
      'Timestamp',
      'Name',
      'WhatsApp',
      'Email',
      'Teaching Format',
      'Weekly Hours',
      'Commute Hours',
      'Biggest Pain',
      'Subjects',
      'Optional Notes',
      'Interview Opt-In',
      'Willingness to Pay',
      'Receive Updates',
    ];

    // Check if headers already exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:M1',
    });

    if (response.data.values && response.data.values.length > 0) {
      console.log('[Google Sheets] Headers already exist');
      return true;
    }

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:M1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    });

    console.log('[Google Sheets] Headers initialized successfully');
    return true;
  } catch (error) {
    console.error('[Google Sheets] Error initializing headers:', error);
    return false;
  }
}
