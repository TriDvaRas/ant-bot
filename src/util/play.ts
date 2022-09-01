import { CommandInteraction, GuildMember } from "discord.js";
import { Player, QueryType } from 'discord-player';

export async function play(interaction: CommandInteraction, player: Player, engine: QueryType) {
    if (!interaction.member || !(interaction.member instanceof GuildMember)) return
    if (!interaction.guild?.me) return
    if (!interaction.member.voice.channel) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    const query = interaction.options.getString("song");
    const shuffle = interaction.options.getBoolean("shuffle")
    const queue = player.createQueue(interaction.guild, {
        metadata: {
            channel: interaction.channel
        }
    });

    if (!query) return await interaction.reply({ content: "No query", ephemeral: true });
    await interaction.deferReply()
    // verify vc connection
    try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
        queue.destroy();
        return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
    }
    const tracks = await player.search(query, {
        requestedBy: interaction.user,
        searchEngine: engine
    }).then(x => x.tracks);
    if (tracks.length == 0) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });
    console.log(tracks.length);
    switch (engine) {
        case 2:
            queue.addTracks(tracks)
            await interaction.editReply({ content: `⏱️ | Queued **${tracks.length}** tracks!` });
            if (shuffle) 
                queue.shuffle()
            if (!queue.playing)
                queue.play()
            break;
        default:
            queue.addTrack(tracks[0])
            await interaction.editReply({ content: `⏱️ | Queued **${tracks[0].title}**!` });

            if (!queue.playing)
                queue.play()
            break;
    }
}