export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return res.status(500).json({ error: 'Missing Airtable environment variables' });
  }

  try {
    const fields = req.body?.fields;
    if (!fields) return res.status(400).json({ error: 'No fields provided' });

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    const data = await airtableRes.json();

    if (!airtableRes.ok) {
      return res.status(airtableRes.status).json({ error: data.error?.message || 'Airtable error' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
