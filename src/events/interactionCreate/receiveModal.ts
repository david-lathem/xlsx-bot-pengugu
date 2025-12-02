import { BaseInteraction, MessageFlags } from "discord.js";
import { handleInteractionError } from "../../utils/interaction.js";
import { getACode, getTalent } from "../../database/queries.js";

export default async (interaction: BaseInteraction) => {
  try {
    if (!interaction.isModalSubmit()) return;

    const { customId, fields, client, user } = interaction;

    if (customId !== "redeem_modal") return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const code = fields.getTextInputValue("redeem_code_input");

    const dbRow = getACode.get({ redeemCode: code });

    if (!dbRow) throw new Error("Code not found");

    const talent = getTalent.get({ talentName: dbRow.talentName });

    if (!talent)
      throw new Error("Configuration for this code is no longer present");

    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (!guild) throw new Error("Something went wrong, please contact staff");

    const member = await guild.members.fetch(user.id);

    await member.roles.add(talent.roleId);

    await interaction.editReply("You have been given access");
  } catch (error) {
    if (error instanceof Error) handleInteractionError(interaction, error);
  }
};
