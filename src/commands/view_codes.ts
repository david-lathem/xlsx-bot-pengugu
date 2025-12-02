import { AttachmentBuilder } from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import { talentOption } from "../utils/constants.js";
import { getTalent, viewCodesForSpecificType } from "../database/queries.js";
import { talentAutoComplete } from "../utils/autocomplete.js";

export default {
  name: "view_codes",
  description: "View all codes in bulk!",
  options: [talentOption],

  autocomplete: talentAutoComplete,

  execute: async (interaction) => {
    if (interaction.guildId !== process.env.GUILD_ID) return;

    const talentName = interaction.options.getString("talent", true);

    const talent = getTalent.get({ talentName });

    if (!talent) throw new Error("Talent not found");

    let str = "";

    const codes = viewCodesForSpecificType.all({ talentName });

    if (codes.length === 0) throw new Error("No code found for this type");

    codes.forEach((c) => (str += `${c.redeemCode}\n`));

    const txtFile = new AttachmentBuilder(Buffer.from(str, "utf-8")).setName(
      `codes_${talentName}.txt`
    );

    await interaction.reply({ files: [txtFile] });
  },
} satisfies extendedAPICommand;
