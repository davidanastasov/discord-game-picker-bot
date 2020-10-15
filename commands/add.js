const { MessageEmbed } = require("discord.js");
const { addGame } = require("../utils/db");

module.exports = {
  name: "add",
  description: "Add a game to the random game picker",
  execute(message, args) {
    const name = args.join(" ");
    addGame(message.channel.id, name)
      .then(() => {
        const embed = new MessageEmbed()
          .setDescription(`Added ${name} to the poll`)
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
