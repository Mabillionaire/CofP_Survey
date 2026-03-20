# SDIRA Form — Vercel Deploy Guide

## Project structure

```
sdira-form/
├── api/
│   └── submit.js        ← serverless proxy (hides your Airtable token)
├── public/
│   └── index.html       ← the form users see
├── vercel.json
└── README.md
```

---

## Step 1 — Set up your Airtable base

1. Go to airtable.com and create a new base
2. Name the table: `Responses`
3. Import `airtable_responses_template.csv` to auto-create all 25 fields
   (In Airtable: Add or import → CSV file)
4. Delete the sample row after import
5. Copy your **Base ID** from the URL: `airtable.com/YOUR_BASE_ID/...`
6. Create a **Personal Access Token** at airtable.com/create/tokens
   - Scope: `data.records:write`
   - Access: your new base

---

## Step 2 — Put the project on GitHub

1. Create a new repository on github.com (can be private)
2. Upload all files keeping the folder structure intact
3. Commit and push

---

## Step 3 — Deploy to Vercel

1. Go to vercel.com and sign in with GitHub
2. Click **Add New Project** → import your repository
3. On the configuration screen, open **Environment Variables** and add:

   | Name                  | Value                        |
   |-----------------------|------------------------------|
   | AIRTABLE_TOKEN        | patXXXXXXXXXXXXXX            |
   | AIRTABLE_BASE_ID      | appXXXXXXXXXXXXXX            |
   | AIRTABLE_TABLE_NAME   | Responses                    |

4. Click **Deploy**

Vercel gives you a live URL like `https://sdira-form.vercel.app` — share that with everyone.

---

## How it works

- Users visit your Vercel URL and fill out the form
- On submit, the form POSTs to `/api/submit` (your serverless function)
- The serverless function uses your secret token to write to Airtable
- Your token is never exposed to the browser

---

## Updating the form

Edit `public/index.html` and push to GitHub — Vercel redeploys automatically in ~30 seconds.
