const { Client } = require("discord.js");
const {
  registerCommands,
  registerEvents,
  registerMusicEvents,
} = require("./utils/registry");
const client = new Client({
  restTimeOffset: 0,
  intents: ["GUILDS", "GUILD_MESSAGES"],
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
});
const { Manager } = require("erela.js");
const Sentry = require("@sentry/node");
const getFormattedDate = require("./utils/time");

(async () => {
  client.config = require("../config");

  client.login(client.config.token);

  const prefix =
    client.config.prefix === "@mention"
      ? client.config.prefix.replace("@mention", "<@!" + client.user.id + ">")
      : client.config.prefix;

  client.commands = new Map();
  client.events = new Map();
  client.music = new Manager({
    nodes: [
      {
        host: "localhost",
        port: 2333,
        password: "ThePasswordIsYourMom",
      },
    ],

    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });
  client.prefix = prefix;
  registerMusicEvents(client.music, "../music");
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
})();

Sentry.init({
  dsn: "https://2467d33619b7441191f3ceb18f095604@o959555.ingest.sentry.io/5907841",
  release: "MusicBot@0.0.1",
  environment: "production",
  tracesSampleRate: 1.0,
});
