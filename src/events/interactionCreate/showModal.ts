import { BaseInteraction } from "discord.js";
import { handleInteractionError } from "../../utils/interaction.js";
import { generateRedeemModal } from "../../utils/components.js";

export default async (interaction: BaseInteraction) => {
  try {
    if (!interaction.isButton()) return;

    const { customId } = interaction;

    if (customId !== "verify_join_btn") return;

    const modal = generateRedeemModal();

    await interaction.showModal(modal);
  } catch (error) {
    if (error instanceof Error) handleInteractionError(interaction, error);
  }
};
