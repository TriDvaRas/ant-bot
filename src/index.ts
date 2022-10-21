import Discord, { Interaction, GuildMember, Snowflake, Permissions } from 'discord.js';
import 'dotenv/config'
import { Player } from 'discord-player';
import { play } from './util/play';
import { initCommands } from './util/init';
import { nowPlaying } from './util/np';
import { skip } from './util/skip';
const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.GuildVoiceStates, Discord.IntentsBitField.Flags.GuildMessages] });
const player = new Player(client);


// This contains the setup code for creating slash commands in a guild. The owner of the bot can send "!deploy" to create them.
client.on('messageCreate', async (message) => {
    if (!message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner?.id) {
        await initCommands(message.guild);
        await message.reply('Deployed!');
    }
});




// add the trackStart event so when a song will be played this message will be sent
player.on("trackStart", (queue: any, track) => console.log(`🎶 | Now playing **${track.title}**!`))

client.once("ready", () => {
    console.log("I'm ready !");
});

client.on("interactionCreate", async (interaction): Promise<any> => {
    if (!interaction.isChatInputCommand()) return;
    // if (interaction.guild?.me) return

    switch (interaction.commandName) {
        case `play`:
            await play(interaction, player, 0)
            break;
        case `playlist`:
            await play(interaction, player, 2)
            break;
        case `playsearch`:
            await play(interaction, player, 13)
            break;
        case `np`:
            await nowPlaying(interaction, player)
            break;
        case `skip`:
            await skip(interaction, player)
            break;

        default:
            break;
    }
});

client.login(process.env.TOKEN);



