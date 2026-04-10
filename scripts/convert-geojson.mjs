// scripts/convert-geojson.mjs
// Converts an Overpass GeoJSON export → src/data/db.json
//
// Usage:
//   node scripts/convert-geojson.mjs path/to/export.geojson

import fs from "fs";
import path from "path";

const INPUT_FILE = process.argv[2];
const OUTPUT_PATH = "./src/data/db.json";

if (!INPUT_FILE) {
  console.error("❌ Please provide the GeoJSON file path:");
  console.error("   node scripts/convert-geojson.mjs path/to/export.geojson");
  process.exit(1);
}

if (!fs.existsSync(INPUT_FILE)) {
  console.error(`❌ File not found: ${INPUT_FILE}`);
  process.exit(1);
}

console.log(`📂 Reading ${INPUT_FILE}...`);
const raw = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));

// Overpass GeoJSON wraps everything in a FeatureCollection
const features = raw.features ?? [];
console.log(`✅ Found ${features.length} total features`);

// Filter to only Point features (nodes) — skip ways/relations
const points = features.filter((f) => f.geometry?.type === "Point");
console.log(`📍 ${points.length} point locations`);

// Filter to only named places
const named = points.filter((f) => f.properties?.name);
console.log(`🏷  ${named.length} named locations after filtering\n`);

const cafes = named.map((feature, index) => {
  const props = feature.properties || {};
  const [lng, lat] = feature.geometry.coordinates; // GeoJSON is [lng, lat]

  // Determine type from OSM tags
  let type = "cafe";
  if (props.shop === "tea" || props.cuisine === "tea") type = "tea";
  if (props.craft === "coffee_roaster") type = "roaster";

  // Build address from OSM address tags
  const addressParts = [
    props["addr:housenumber"],
    props["addr:street"],
    props["addr:city"],
    props["addr:state"],
  ].filter(Boolean);

  const address =
    addressParts.length >= 2
      ? addressParts.join(" ")
      : props["addr:full"] || props["addr:street"] || "Address unavailable";

  return {
    id: index + 1,
    osmId: props.id || null,
    name: props.name,
    address,
    lat,
    lng,
    type,
    phone: props.phone || props["contact:phone"] || null,
    website: props.website || props["contact:website"] || null,
    openingHours: props.opening_hours || null,
    wifi: props.internet_access === "wlan" ? true : null,
    takeaway: props.takeaway === "yes" ? true : null,
    rating: null,
    checkinCount: 0,
  };
});

// Sort alphabetically by name
cafes.sort((a, b) => a.name.localeCompare(b.name));

// Preserve existing checkins + users if db.json already exists
let existing = { checkins: [], users: [{ id: 1, name: "You", username: "me" }] };
if (fs.existsSync(OUTPUT_PATH)) {
  try {
    existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
    console.log(`💾 Preserving ${existing.checkins?.length ?? 0} check-ins and ${existing.users?.length ?? 0} users`);
  } catch {
    console.warn("⚠️  Couldn't parse existing db.json — starting fresh");
  }
}

const db = {
  cafes,
  checkins: existing.checkins || [],
  users: existing.users || [{ id: 1, name: "You", username: "me" }],
};

// Write output
const dir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(db, null, 2));

// Print summary
const byType = cafes.reduce((acc, c) => {
  acc[c.type] = (acc[c.type] || 0) + 1;
  return acc;
}, {});

console.log("\n📊 Summary:");
Object.entries(byType).forEach(([type, count]) => {
  const emoji = type === "tea" ? "🍵" : type === "roaster" ? "🫘" : "☕";
  console.log(`   ${emoji} ${type}: ${count}`);
});
console.log(`\n✅ Written to ${OUTPUT_PATH}`);
console.log(`   ${cafes.length} total locations`);

// Print a preview of the first 3
console.log("\n🔎 Preview (first 3):");
cafes.slice(0, 3).forEach((c) => {
  console.log(`   [${c.id}] ${c.name} — ${c.address} (${c.lat}, ${c.lng})`);
});
