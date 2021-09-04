const BaseEvent = require("../../utils/structures/BaseEvent");
const cooldowns = new Map();
const { Collection } = require("discord.js");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client, message) {
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        if (message.guild) {
          if (!message.member.permissions.has(command.permissions)) {
            return;
          }
        }

        if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Collection());
        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = command.cooldown * 1000;

        if (time_stamps.has(message.author.id)) {
          const expiration_time =
            time_stamps.get(message.author.id) + cooldown_amount;

          if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            return message.channel.send(
              `Cooldown (${time_left.toFixed(0)}) Seconds`
            );
          }
        }

        time_stamps.set(message.author.id, current_time);
        setTimeout(() => {
          time_stamps.delete(message.author.id);
        }, cooldown_amount);

        command.run(client, message, cmdArgs);
      }
    }
  }
};
