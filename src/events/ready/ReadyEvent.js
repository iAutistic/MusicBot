const BaseEvent = require("../../utils/structures/BaseEvent");
const getFormattedDate = require("../../utils/time");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client) {
    console.log(
      `[${await getFormattedDate(
        new Date()
      )}] [INFO] [Client]: Login Successful!`
    );

    const game = client.config.game.replace("DEFAULT", "PLAYING").toUpperCase();

    const prefix =
      client.config.prefix === "@mention"
        ? client.config.prefix.replace(
            "@mention",
            "@" + client.user.username + " "
          )
        : client.config.prefix;

    const status = client.config.status.toLowerCase();

    client.user.setPresence({
      activities: [{ name: prefix + "help", type: game }],
      status: status,
    });

    await client.music.init(client.user.id);
    if (client.guilds.cache.size < 1) {
      await console.log(
        `[${await getFormattedDate(
          new Date()
        )}] [WARN] [MusicBot]: This bot is not on any guilds! Use the following link to add the bot to your guilds!`
      );
      return await console.log(
        `[${await getFormattedDate(
          new Date()
        )}] [WARN] [MusicBot]: https://discord.com/oauth2/authorize?scope=bot&client_id=${
          client.user.id
        }&permissions=70642768`
      );
    }
  }
};
