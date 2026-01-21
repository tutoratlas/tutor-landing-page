# TutorAtlas Landing Page TODO

## Completed Features
- [x] Design system setup (warm slate-blue theme with amber accents)
- [x] Hero section with value propositions
- [x] Problem section explaining tutor pain points
- [x] Solution section with feature cards
- [x] How it works section
- [x] Features grid
- [x] Outcomes section
- [x] Founding cohort section
- [x] FAQ section with expandable questions
- [x] Join early access form with validation
- [x] Privacy Policy page
- [x] Terms of Use page
- [x] Footer with navigation links
- [x] Sticky header navigation
- [x] Backend API setup with tRPC
- [x] Google Sheets integration for form submissions
- [x] Form submission endpoint
- [x] Google Sheets credentials configuration
- [x] Test suite for Google Sheets integration

## Pending Features
- [x] Custom domain configuration (tutoratlas.manus.space)
- [ ] Final checkpoint and deployment

## New Tasks
- [x] Fix hero section placeholder - replace white square with actual visual content
- [x] Update hero CTA to make "Book a 15-min Interview" the primary button text
- [x] Simplify hero CTA to single "Join Early Access" button (remove interview booking button)
- [x] Write comprehensive vitest tests for form submission
- [x] Run all tests and verify they pass
- [x] Push code to GitHub repository

## Brand Refinement Tasks
- [x] Analyze new brand guidelines from marketing PRD
- [x] Replace text logo with official TutorAtlas logo assets
- [x] Refine copy based on brand voice and messaging
- [x] Update color scheme if needed per brand guidelines (no changes needed - already aligned)
- [x] Test all changes and save checkpoint (9/10 tests passing - Google Sheets credential issue noted)

## New Google Sheets Connection
- [x] Create new Google Sheet titled "[tutoratlas] Early Access Submissions"
- [x] Create new Google Cloud service account with Sheets API access
- [x] Share Google Sheet with service account email
- [x] Update GOOGLE_SHEET_ID and GOOGLE_SHEETS_CREDENTIALS
- [x] Test form submission to new sheet (all 10 tests passing)

## Form Updates
- [x] Add Telegram handle field to form (optional)
- [x] Update interview duration text from "15-minute" to "15-30 minute"
- [x] Update backend schema and Google Sheets to include Telegram handle
- [x] Test form submission with new field (all 10 tests passing, headers updated)

## PRD v5 Updates
- [x] Read and analyze PRD v5 for new full-time tutor persona content
- [x] Update landing page copy to reflect full-time tutor insights
- [x] Fix logo background (remove white border from top left)
- [x] Test all changes and save checkpoint (all 10 tests passing, logo transparent, copy updated)

## Brand Name Correction
- [x] Update all instances of "TutorAtlas" to "Tutor Atlas" (two words) in landing page
- [x] Test and save checkpoint (all 10 tests passing)

## Pain Reality Screenshot Replacement
- [x] Generate realistic Telegram blast screenshot showing tuition assignment posts
- [x] Generate realistic Google Form screenshot showing typical tutor application form
- [x] Update landing page to use new authentic screenshots
- [x] Test and save checkpoint (all 10 tests passing)

## Screenshot Layout Optimization
- [x] Improve screenshot sizing and positioning for desktop viewing
- [x] Optimize screenshot layout for mobile responsiveness
- [x] Test on both desktop and mobile viewports (all 10 tests passing)
- [x] Save checkpoint

## Email Notification Setup
- [x] Add email notification to form submission handler
- [x] Send notification to hello@tutoratlas.sg with form details
- [x] Test email notification functionality (all 12 tests passing)
- [x] Save checkpoint

## Screenshot Layout Reorganization
- [x] Reorganize Pain Reality section to display both screenshots side-by-side
- [x] Ensure responsive layout for mobile devices
- [x] Test and save checkpoint (all 12 tests passing)
