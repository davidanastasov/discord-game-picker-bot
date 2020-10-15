const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Load all commands
fs.readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
  });

bot.once("ready", () => console.log(`Logged in as ${bot.user.tag}!`));

const prefix = "/";
bot.on("message", (message) => {
  const { content, author } = message;

  // Check for prefix and if the author is not a bot
  if (!content.startsWith(prefix) || author.bot) return;

  const args = content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const _command = bot.commands.get(command);
  if (_command) _command.execute(message, args);
});

bot
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.log("Successfully logged in"))
  .catch((error) => console.error(error.message));
