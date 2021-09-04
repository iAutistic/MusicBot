module.exports = class BaseCommand {
  constructor({
    name,
    category,
    aliases,
    description,
    usage,
    examples,
    permissions,
    guildOnly,
    devOnly,
    cooldown,
  }) {
    this.name = name;
    this.category = category;
    this.aliases = aliases || [];
    this.description = description;
    this.usage = usage;
    this.examples = examples;
    this.permissions = permissions;
    this.guildOnly = guildOnly || true;
    this.devOnly = devOnly || true;
    this.cooldown = cooldown;
  }
};
