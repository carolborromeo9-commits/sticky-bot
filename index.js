const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const STICKY_CHANNEL_ID = "1455613452390236348";

const stickyText = `_ _
-# _ _             **ping <@&1455613450935079116> for inquiries** <a:korila:1482440638694686811> 
-# _ _             <:pearl:1483100606649602159>do     censor     item    names
-# _ _             <:pearl:1483100606649602159>ex. c4nva, b00st, r0bux, gn6

-# _ _ _ _                  <#1455613451903832274> **for orders**
_ _`;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== STICKY_CHANNEL_ID) return;

  try {
    const messages = await message.channel.messages.fetch({ limit: 20 });

    const oldStickies = messages.filter(m =>
      m.author.id === client.user.id &&
      m.content.includes("ping <@&1455613450935079116>")
    );

    for (const sticky of oldStickies.values()) {
      await sticky.delete().catch(() => {});
    }

    await message.channel.send(stickyText);
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.TOKEN);
