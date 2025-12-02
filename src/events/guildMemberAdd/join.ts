import { GuildMember } from "discord.js";
import { generateJoinEmbedWithBtn } from "../../utils/components.js";

export default async (member: GuildMember) => {
  try {
    const { guild } = member;

    if (guild.id !== process.env.GUILD_ID) return;

    const { embed, button } = generateJoinEmbedWithBtn(guild);

    await member.send({ embeds: [embed], components: [button] });
  } catch (error) {
    console.error(error);
  }
};
