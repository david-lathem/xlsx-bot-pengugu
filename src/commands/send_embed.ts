import { PermissionFlagsBits } from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import { generateJoinEmbedWithBtn } from "../utils/components.js";
import { MessageFlags } from "discord.js";

export default {
  name: "send_embed",
  description: "Send embed",
  permissionRequired: PermissionFlagsBits.Administrator,
  execute: async (interaction) => {
    if (
      !interaction.inCachedGuild() ||
      interaction.guildId !== process.env.GUILD_ID
    )
      return;

    const { embed, button } = generateJoinEmbedWithBtn(interaction.guild);

    await interaction.channel?.send({ embeds: [embed], components: [button] });

    await interaction.reply({ content: "Sent", flags: MessageFlags.Ephemeral });
  },
} satisfies extendedAPICommand;
