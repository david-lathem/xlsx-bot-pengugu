import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export function generateJoinEmbedWithBtn(guild: Guild) {
  const embed = new EmbedBuilder()
    .setColor(0xff0000)
    .setThumbnail(guild.iconURL({ size: 1024 }))
    .setDescription(
      `Welcome to **${guild.name}**!\n\nPlease click the button below to verify yourself by entering the redeem code.`
    );

  const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("verify_join_btn")
      .setLabel("Verify Yourself")
      .setStyle(ButtonStyle.Primary)
  );

  return { embed, button };
}

export function generateRedeemModal() {
  const modal = new ModalBuilder()
    .setCustomId("redeem_modal")
    .setTitle("Enter Redeem Code");

  const codeInput = new TextInputBuilder()
    .setCustomId("redeem_code_input")
    .setLabel("Redeem Code")
    .setPlaceholder("Enter your code here")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(codeInput)
  );

  return modal;
}
