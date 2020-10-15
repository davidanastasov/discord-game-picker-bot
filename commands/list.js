const { MessageEmbed } = require("discord.js");
const { getAllGames } = require("../utils/db");

module.exports = {
  name: "list",
  description: "List all the games added to the random game picker",
  async execute(message) {
    getAllGames(message.channel.id)
      .then((games) => {
        const gameNames = games.map((game, i) => `${i + 1}. ${game.gameName}`);

        const embed = new MessageEmbed()
          .setDescription(gameNames.join("\n"))
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
