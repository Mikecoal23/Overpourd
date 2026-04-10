// scripts/fetch-cafes.mjs
// Run with: node scripts/fetch-cafes.mjs

import fs from "fs";
import path from "path";

// ── CONFIG ──────────────────────────────────────────────────────────────────
const YOUR_LAT = 32.3120;
const YOUR_LNG = -106.7749;
const RADIUS_METERS = 5000;
const OUTPUT_PATH = "./src/data/db.json";
// ────────────────────────────────────────────────────────────────────────────

// Multiple Overpass mirrors — script tries each one in order
const MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
];

const query = `
[out:json][timeout:70];
(
  node["amenity"="cafe"](around:${RADIUS_METERS},${YOUR_LAT},${YOUR_LNG});
  node["amenity"="coffee_shop"](around:${RADIUS_METERS},${YOUR_LAT},${YOUR_LNG});
  node["cuisine"="coffee_shop"](around:${RADIUS_METERS},${YOUR_LAT},${YOUR_LNG});
  node["shop"="tea"](around:${RADIUS_METERS},${YOUR_LAT},${YOUR_LNG});
  node["craft"="coffee_roaster"](around:${RADIUS_METERS},${YOUR_LAT},${YOUR_LNG});
);
out body;
`;

async function tryMirror(url) {
  console.log(`   Trying ${url} ...`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000); // 20s per mirror

  try {
    const response = await fetch(url, {
      method: "POST",
      body: query,
      headers: { "Content-Type": "text/plain" },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    clearTimeout(timeout);
    const reason = err.name === "AbortError" ? "timed out" : err.message;
    console.log(`   ✗ Failed (${reason})`);
    return null;
  }
}

async function fetchWithFallback() {
  for (const mirror of MIRRORS) {
    const data = await tryMirror(mirror);
    if (data?.elements) {
      console.log(`   ✓ Success!\n`);
      return data;
    }
  }
  throw new Error("All Overpass mirrors failed. Try again in a few minutes.");
}

async function fetchCafes() {
  console.log(`🔍 Searching within ${RADIUS_METERS}m of (${YOUR_LAT}, ${YOUR_LNG})\n`);

  const data = await fetchWithFallback();
  const nodes = data.elements;

  console.log(`Found ${nodes.length} raw OSM nodes`);

  const named = nodes.filter((n) => n.tags?.name);
  console.log(`${named.length} named locations after filtering\n`);

  const cafes = named.map((node, index) => {
    const tags = node.tags || {};

    let type = "cafe";
    if (tags.shop === "tea" || tags.cuisine === "tea") type = "tea";
    if (tags.craft === "coffee_roaster") type = "roaster";

    const addressParts = [
      tags["addr:housenumber"],
      tags["addr:street"],
      tags["addr:city"] || "Las Cruces",
      tags["addr:state"] || "NM",
    ].filter(Boolean);

    const address =
      addressParts.length > 1
        ? addressParts.join(" ")
        : tags["addr:full"] || tags["addr:street"] || "Address unavailable";

    return {
      id: index + 1,
      osmId: node.id,
      name: tags.name,
      address,
      lat: node.lat,
      lng: node.lon,
      type,
      phone: tags.phone || tags["contact:phone"] || null,
      website: tags.website || tags["contact:website"] || null,
      openingHours: tags.opening_hours || null,
      wifi: tags.internet_access === "wlan" || null,
      takeaway: tags.takeaway === "yes" || null,
      rating: null,
      checkinCount: 0,
    };
  });

  cafes.sort((a, b) => a.name.localeCompare(b.name));

  let existing = { cafes: [], checkins: [], users: [] };
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
      console.log(`Preserving ${existing.checkins?.length ?? 0} check-ins and ${existing.users?.length ?? 0} users`);
    } catch {
      console.warn("Could not parse existing db.json — starting fresh");
    }
  }

  const db = {
    cafes,
    checkins: existing.checkins || [],
    users: existing.users || [{ id: 1, name: "You", username: "me" }],
  };

  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(db, null, 2));

  const byType = cafes.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {});

  console.log("\n📊 Summary:");
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });
  console.log(`\n✅ Written to ${OUTPUT_PATH} — ${cafes.length} total locations`);
}

fetchCafes().catch((err) => {
  console.error("\n❌ Failed:", err.message);
  console.error("💡 Tip: Wait a few minutes and try again, or check https://overpass-api.de/api/status");
  process.exit(1);
});
