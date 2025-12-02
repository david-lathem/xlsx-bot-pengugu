import {
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

export type AutocompleteFn = (
  interaction: AutocompleteInteraction
) => Promise<Array<ApplicationCommandOptionChoiceData | string>>;

export interface extendedAPICommand
  extends RESTPostAPIChatInputApplicationCommandsJSONBody {
  permissionRequired?: bigint | Array<bigint>;
  guildOnly?: Boolean;
  autocomplete?: AutocompleteFn;
  execute(interaction: ChatInputCommandInteraction): Promise<any>;
}
