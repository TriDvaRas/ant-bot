import { Player } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";

export async function nowPlaying(interaction: CommandInteraction, player: Player) {
    if (!interaction.guildId) return

    const queue = player.queues.get(interaction.guildId)
    if (!queue || !queue.playing)
        return await interaction.reply({ content: "Nothing is playing", ephemeral: true  });
    const track = queue.nowPlaying()
    const emb = new MessageEmbed({
        'title': track.title,
        'description': track.author,
        'image': {
            url: track.thumbnail
        },
        'author': {
            name: track.requestedBy.username,
            iconURL: track.requestedBy.avatarURL() || undefined,
        }
    })
    interaction.reply({embeds:[emb]})

}