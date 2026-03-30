/**
 * Google Sheets CSV fetcher
 * URLs are managed via the /admin page and stored in localStorage
 */

const STORAGE_KEY = 'twist_sheet_urls';

const DEFAULT_URLS = {
  sections: '',
  archive: '',
};

function getStoredUrls() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_URLS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_URLS;
}

export function getSheetUrls() {
  return getStoredUrls();
}

export function isConfigured(key) {
  const urls = getStoredUrls();
  return !!(urls[key] && urls[key].includes('docs.google.com'));
}

export async function fetchSheetCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => { row[h.trim()] = (values[idx] || '').trim(); });
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current); current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}