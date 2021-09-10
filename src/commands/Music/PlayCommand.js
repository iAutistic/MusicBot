const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super({
      name: "play",
      category: "Music",
      aliases: [],
      usage: [],
      examples: [],
    });
  }

  async run(client, message, args) {}
};
