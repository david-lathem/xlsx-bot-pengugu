import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import { talentOption } from "../utils/constants.js";
import { deleteRedeemCode } from "../database/queries.js";
import { talentAutoComplete } from "../utils/autocomplete.js";

export default {
  name: "remove_code",
  description: "Remove a specific code",
  options: [
    {
      name: "code",
      description: "code to remove",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
    permissionRequired: PermissionFlagsBits.Administrator,
  
  autocomplete: talentAutoComplete,

  execute: async (interaction) => {
        if (interaction.guildId !== process.env.GUILD_ID) return;

    const redeemCode = interaction.options.getString("code", true);

    const result = deleteRedeemCode.run({ redeemCode });

    if (result.changes === 0) throw new Error("Could not find that code");

    await interaction.reply(`Success!`);
  },
} satisfies extendedAPICommand;
