const { ShardingManager } = require("discord.js");
const { token } = require("../config");
const getFormattedDate = require("./utils/time");

const shards = new ShardingManager("./src/index.js", {
  token: token,
  totalShards: "auto",
});

shards.on("shardCreate", async (shard) => {
  console.log(
    `[${await getFormattedDate(Date.now())}] [INFO] [Shards]: Lanched shard #${
      shard.id
    }`
  );
});

shards.spawn({ amount: "auto", delay: 5500, timeout: 10000 });
