const BaseEvent = require("../utils/structures/BaseEvent");

module.exports = class TrackStartEvent extends BaseEvent {
  constructor() {
    super("queueEnd");
  }

  async run(client, player) {
    console.log(player);
    client.guilds.cache
      .get(guild.guild)
      .channels.cache.get(player.textChannel)
      .send("Queue has ended.");
    player.destroy();
  }
};
