const { MessageEmbed } = require("discord.js");
const { getAllGames } = require("../utils/db");
const { getRandomGame } = require("../utils/randomGame");

module.exports = {
  name: "random",
  description: "Pick a random game",
  execute(message, args) {
    const exec = async () => {
      const tries = args[0] || 1;

      let games;
      try {
        games = await getAllGames(message.channel.id);
      } catch (error) {
        const embed = new MessageEmbed()
          .setDescription(error)
          .setColor(0xff0000);

        return message.channel.send(embed);
      }

      getRandomGame(0, games.length - 1, tries)
        .then((result) => {
          // Find the first index that matches the highest number
          const highest = Math.max(...Object.values(result.counts));
          const index = Object.keys(result.counts).find(
            (x) => result.counts[x] === highest
          );

          const embed = new MessageEmbed()
            .setDescription(
              `Best of ${tries}
               Picked: **${games[index].gameName}**
               
               Requests left: ${result.requestsLeft}`
            )
            .setColor(0xffff00);

          message.channel.send(embed);
        })
        .catch((error) => {
          const embed = new MessageEmbed()
            .setDescription(error)
            .setColor(0xff0000);

          message.channel.send(embed);
        });
    };

    exec().catch((error) => console.log(error));
  },
};
