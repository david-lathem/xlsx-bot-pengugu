import {
  APIApplicationCommandBasicOption,
  ApplicationCommandOptionType,
} from "discord.js";

export const talentOption: APIApplicationCommandBasicOption = {
  name: "talent",
  description: "Select the talent",
  type: ApplicationCommandOptionType.String,
  required: true,
  autocomplete: true,
};
