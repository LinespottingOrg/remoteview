#!/usr/bin/env node
/**
 * Catalog gate for i18n/<locale>.json and, when present, store/<locale>/.
 * English in i18n/en.json is the key source. This script does not rewrite it.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const i18nDir = join(root, "i18n");
const storeDir = join(root, "store");

/** LinespottingOrg 32-locale set. The gate requires at least 30 of these files. */
export const LOCALES = [
  "ar",
  "bn",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "fi",
  "fr",
  "he",
  "hi",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "ms",
  "nl",
  "no",
  "pl",
  "pt",
  "pt-BR",
  "ro",
  "ru",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-Hans",
  "zh-Hant",
];

const MIN_LOCALES = 30;
const FORBIDDEN = /ZXQ|TOKEN|XQ0Z|__XX__/;
const CJK =
  /[\u1100-\u11FF\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF\uFF66-\uFF9D]/;
const URL_RE = /https?:\/\/[^\s"'<>)\\]+/g;

/** The only external URL catalogs may introduce. */
const ALLOWED_URLS = new Set([
  "https://linespotting.com/privacy-policy/",
  "https://linespotting.com/privacy-policy",
]);

const PRICE_RE = /(?:\$\s*\d|\d+(?:[.,]\d+)?\s*(?:USD|EUR|GBP|¥|€|£)|\b(?:price|pricing)\b)/i;
const PHONE_RE = /(?:\+\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]\d{4}/;
const ADDRESS_RE = /\b\d{1,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\s+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd)\b/;

function allowsCjk(locale) {
  const base = locale.toLowerCase().split("-")[0];
  return base === "ja" || base === "ko" || base === "zh";
}

function flatten(value, prefix = "", out = {}) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }
  out[prefix] = value;
  return out;
}

function readJson(path) {
  const text = readFileSync(path, "utf8");
  return { text, json: JSON.parse(text) };
}

function urlsIn(text) {
  return [...text.matchAll(URL_RE)].map((match) => match[0].replace(/[.,);]+$/, ""));
}

const errors = [];

function fail(message) {
  errors.push(message);
}

let files;
try {
  files = readdirSync(i18nDir).filter((name) => name.endsWith(".json"));
} catch {
  fail(`missing directory ${i18nDir}`);
  files = [];
}

const locales = files.map((name) => name.slice(0, -".json".length));
if (locales.length < MIN_LOCALES) {
  fail(`need at least ${MIN_LOCALES} locale files, found ${locales.length}`);
}

for (const locale of LOCALES) {
  if (!locales.includes(locale)) fail(`missing i18n/${locale}.json`);
}

let english = {};
const englishPath = join(i18nDir, "en.json");
try {
  const loaded = readJson(englishPath);
  english = flatten(loaded.json);
  if (FORBIDDEN.test(loaded.text)) fail("i18n/en.json contains a forbidden token");
  for (const url of urlsIn(loaded.text)) {
    if (!ALLOWED_URLS.has(url)) fail(`i18n/en.json URL is not allow-listed: ${url}`);
  }
} catch (error) {
  fail(`cannot read i18n/en.json: ${error instanceof Error ? error.message : error}`);
}

const englishKeys = Object.keys(english).sort();
if (englishKeys.length === 0) fail("i18n/en.json has no strings");
for (const [key, value] of Object.entries(english)) {
  if (typeof value !== "string" || value.length === 0) fail(`i18n/en.json key ${key} is empty`);
}

for (const locale of locales) {
  const path = join(i18nDir, `${locale}.json`);
  let loaded;
  try {
    loaded = readJson(path);
  } catch (error) {
    fail(`cannot parse i18n/${locale}.json: ${error instanceof Error ? error.message : error}`);
    continue;
  }
  if (FORBIDDEN.test(loaded.text)) fail(`i18n/${locale}.json contains ZXQ, TOKEN, XQ0Z, or __XX__`);
  if (!allowsCjk(locale) && CJK.test(loaded.text)) {
    fail(`i18n/${locale}.json contains CJK characters`);
  }
  for (const url of urlsIn(loaded.text)) {
    if (!ALLOWED_URLS.has(url)) fail(`i18n/${locale}.json URL is not allow-listed: ${url}`);
  }
  const flat = flatten(loaded.json);
  const keys = Object.keys(flat).sort();
  const missing = englishKeys.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !englishKeys.includes(key));
  if (missing.length) fail(`i18n/${locale}.json missing keys: ${missing.slice(0, 8).join(", ")}`);
  if (extra.length) fail(`i18n/${locale}.json extra keys: ${extra.slice(0, 8).join(", ")}`);
  for (const [key, value] of Object.entries(flat)) {
    if (typeof value !== "string" || value.trim().length === 0) {
      fail(`i18n/${locale}.json key ${key} is empty`);
    }
  }
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

try {
  if (statSync(storeDir).isDirectory()) {
    const listingLocales = readdirSync(storeDir).filter((name) => statSync(join(storeDir, name)).isDirectory());
    if (listingLocales.length > 0 && listingLocales.length < MIN_LOCALES) {
      fail(`store listings cover ${listingLocales.length} locales; need at least ${MIN_LOCALES}`);
    }
    for (const file of walk(storeDir)) {
      const text = readFileSync(file, "utf8");
      const locale = file.slice(storeDir.length + 1).split(/[\\/]/)[0] ?? "";
      if (FORBIDDEN.test(text)) fail(`${file} contains a forbidden token`);
      if (!allowsCjk(locale) && CJK.test(text)) fail(`${file} contains CJK characters`);
      if (PRICE_RE.test(text)) fail(`${file} contains a price`);
      if (PHONE_RE.test(text)) fail(`${file} contains a phone number`);
      if (ADDRESS_RE.test(text)) fail(`${file} contains a street address`);
      for (const url of urlsIn(text)) {
        if (!ALLOWED_URLS.has(url)) fail(`${file} URL is not allow-listed: ${url}`);
      }
    }
  }
} catch {
  /* no store listing in this repo */
}

if (errors.length) {
  console.error(`i18n-check failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`i18n-check ok: ${locales.length} locales, ${englishKeys.length} keys`);
