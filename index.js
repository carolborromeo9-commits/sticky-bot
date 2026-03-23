const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let lastSticky = null;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (lastSticky) {
    try {
      await lastSticky.delete();
    } catch {}
  }

  lastSticky = await message.channel.send(`_ _
-# _ _             **ping <@&1455613450935079116> for inquiries** <a:korila:1482440638694686811> 
-# _ _             <:pearl:1483100606649602159>do     censor     item    names
-# _ _             <:pearl:1483100606649602159>ex. c4nva, b00st, r0bux, gn6

-# _ _ _ _                  <#1455613451903832274> **for orders**
_ _`);
});

client.login(process.env.TOKEN);
