import { Client } from "discord.js";

import registerAndAttachCommandsOnClient from "../../utils/registrars/registerCommands.js";
import { removeNumberedCodes } from "../../database/queries.js";

export default async (client: Client<true>) => {
  console.log(`${client.user.username} (${client.user.id}) is ready 🐬`);
  removeNumberedCodes.run();
  await registerAndAttachCommandsOnClient(client);
};
