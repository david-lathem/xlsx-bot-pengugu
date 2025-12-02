import { ApplicationCommandOptionType } from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import { createOrUpdateTalent } from "../database/queries.js";

export default {
  name: "set_talent",
  description: "Set role for talent",
  options: [
    {
      name: "talent_name",
      description: "name of talent",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "role",
      description: "role",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],

  execute: async (interaction) => {
    const talentName = interaction.options
      .getString("talent_name", true)
      .trim();
    const role = interaction.options.getRole("role", true);

    createOrUpdateTalent.run({ talentName, roleId: role.id });

    await interaction.reply(`Success!`);
  },
} satisfies extendedAPICommand;
