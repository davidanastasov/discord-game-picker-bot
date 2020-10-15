const { MessageEmbed } = require("discord.js");
const { removeGame } = require("../utils/db");

module.exports = {
  name: "remove",
  description: "Remove a game from the list by it's name",
  async execute(message, args) {
    const name = args.join(" ");
    removeGame(message.channel.id, name)
      .then(() => {
        const embed = new MessageEmbed()
          .setDescription(`${name} has been removed`)
          .setColor(0xffff00);

        message.channel.send(embed);
      })
      .catch((error) => {
        const embed = new MessageEmbed()
          .setDescription(error)
          .setColor(0xff0000);

        message.channel.send(embed);
      });
  },
};
