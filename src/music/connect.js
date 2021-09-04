const BaseEvent = require("../utils/structures/BaseEvent");
const getFormattedDate = require("../utils/time");

module.exports = class NodeConnectEvent extends BaseEvent {
  constructor() {
    super("nodeConnect");
  }

  async run(client, node) {
    console.log(
      `[${await getFormattedDate(
        Date.now()
      )}] [INFO] [WebSocketClient]: Connected to WebSocket`
    );
  }
};
