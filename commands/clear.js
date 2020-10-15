const { MessageEmbed } = require("discord.js");
const { clearGames } = require("../utils/db");

module.exports = {
  name: "clear",
  description: "Clear all the games",
  async execute(message) {
    clearGames(message.channel.id)
      .then((n) => {
        const embed = new MessageEmbed()
          .setDescription(`Removed ${n} game${n > 1 ? "s" : ""}!`)
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
