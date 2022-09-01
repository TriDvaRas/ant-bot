import { Player } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";

export async function skip(interaction: CommandInteraction, player: Player) {
    if (!interaction.guildId) return

    const queue = player.queues.get(interaction.guildId)
    if (!queue)
        return await interaction.reply({ content: "Nothing is playing", ephemeral: true });
    queue.skip()
    const track = queue.nowPlaying()
    interaction.reply({content:`Skipped ${track.title}`})
}