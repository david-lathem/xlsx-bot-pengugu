import {
  queryByCode,
  queryByTalent,
  queryByTalentName,
  RedeemCode,
  Talent,
} from "../utils/typings/database.js";
import db from "./index.js";

export const createRedeemCodeInDb = db.prepare<RedeemCode>(`
  INSERT INTO redeemCodes (redeemCode, talentName)
  VALUES (@redeemCode, @talentName)
`);

export const getACode = db.prepare<queryByCode, RedeemCode>(`
  SELECT *
  FROM redeemCodes
 WHERE redeemCode = @redeemCode
`);

export const deleteRedeemCode = db.prepare<queryByCode>(`
  DELETE FROM redeemCodes
  WHERE redeemCode = @redeemCode
`);

export const deleteAllCodesForTalent = db.prepare<queryByTalent>(`
  DELETE FROM redeemCodes
  WHERE talentName = @talentName
`);

export const viewCodesForSpecificType = db.prepare<queryByTalent, RedeemCode>(`
  SELECT *
  FROM redeemCodes
  WHERE talentName = @talentName
`);

export const removeNumberedCodes = db.prepare(`
UPDATE redeemCodes
SET redeemCode = REPLACE(redeemCode, '.0', '')
WHERE redeemCode LIKE '%.0';
`);

export const createOrUpdateTalent = db.prepare<Talent>(`
  INSERT INTO talents (talentName, roleId)
  VALUES (@talentName, @roleId)
  ON CONFLICT(talentName) DO UPDATE SET
    roleId = excluded.roleId
`);

export const getAllTalents = db.prepare<{}, Talent>(`
  SELECT *
  FROM talents
`);

export const getTalent = db.prepare<queryByTalentName, Talent>(`
  SELECT *
  FROM talents
  WHERE talentName = @talentName 
`);
