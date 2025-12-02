import db from "./index.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS redeemCodes (
    redeemCode TEXT NOT NULL PRIMARY KEY,
    talentName TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS talents (
    talentName TEXT NOT NULL PRIMARY KEY,
    roleId TEXT NOT NULL
  );
`);
