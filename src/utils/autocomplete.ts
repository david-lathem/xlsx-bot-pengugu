import { getAllTalents } from "../database/queries.js";
import { AutocompleteFn } from "./typings/types.js";

export const talentAutoComplete: AutocompleteFn = async (interaction) => {
  const query = interaction.options.getFocused();

  const talents = getAllTalents
    .all({})
    .filter((t) => t.talentName.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 24);

  return talents.map((t) => ({ name: t.talentName, value: t.talentName }));
};
