import { ApplicationCommandOptionType, MessageFlags } from "discord.js";
import xlsx from "node-xlsx";

import { extendedAPICommand } from "../utils/typings/types.js";
import {
  createRedeemCodeInDb,
  deleteAllCodesForTalent,
  getTalent,
} from "../database/queries.js";
import { talentOption } from "../utils/constants.js";
import { talentAutoComplete } from "../utils/autocomplete.js";

export default {
  name: "add_codes",
  description: "Add redeem codes in bulk!",
  options: [
    {
      name: "file",
      description: "Upload a .xlsx file containing codes",
      type: ApplicationCommandOptionType.Attachment,
      required: true,
    },
    talentOption,
  ],

  autocomplete: talentAutoComplete,

  execute: async (interaction) => {
    const file = interaction.options.getAttachment("file", true);
    const talentName = interaction.options.getString("talent", true);


    if (interaction.guildId !== process.env.GUILD_ID) return
    
    if (!file.contentType?.endsWith("spreadsheetml.sheet"))
      throw new Error("Invalid file. Upload a .xlsx file.");

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const talent = getTalent.get({ talentName });

    if (!talent) throw new Error("Talent not found");

    const response = await fetch(file.url);
    const arrayBuff = await response.arrayBuffer();

    const sheetParsed = xlsx.parse(Buffer.from(arrayBuff));

    const codes = sheetParsed[0].data
      .slice(1)
      .map((row) => row[0])
      .filter((code) => code);

    if (codes.length === 0) throw new Error("The txt file contains no codes.");

    let inserted = 0;
    let failed = 0;

    deleteAllCodesForTalent.run({ talentName });

    for (const redeemCode of codes) {
      try {
        createRedeemCodeInDb.run({ redeemCode, talentName });
        inserted++;
      } catch (e) {
        console.error(e);
        failed++;
      }
    }

    await interaction.editReply(
      `Success: \`${inserted}\` | Failed: \`${failed}\`.`
    );
  },
} satisfies extendedAPICommand;
