import { ApplicationCommandOptionType, Guild, Message } from "discord.js";

export async function initCommands(guild: Guild) {
    await (guild as Guild).commands.set([
        {
            name: 'play',
            description: 'Plays a song',
            options: [
                {
                    name: 'song',
                    type: ApplicationCommandOptionType.String,
                    description: 'The URL of the song to play',
                    required: true,
                }
            ],
        },
        {
            name: 'playlist',
            description: 'Plays a playlist',
            options: [
                {
                    name: 'song',
                    type: ApplicationCommandOptionType.String,
                    description: 'The URL of the song to play',
                    required: true,
                },
                {
                    name: 'shuffle',
                    type: ApplicationCommandOptionType.Boolean,
                    description: 'Random order',
                    required: false,
                },
            ],
        },
        {
            name: 'playsearch',
            description: 'Plays a search result',
            options: [
                {
                    name: 'song',
                    type: ApplicationCommandOptionType.String,
                    description: 'The URL of the song to play',
                    required: true,
                },
            ],
        },
        {
            name: 'skip',
            description: 'Skip to the next song in the queue',
        },
        // {
        //     name: 'queue',
        //     description: 'See the music queue',
        // },
        // {
        //     name: 'pause',
        //     description: 'Pauses the song that is currently playing',
        // },
        // {
        //     name: 'resume',
        //     description: 'Resume playback of the current song',
        // },
        {
            name: 'leave',
            description: 'Leave the voice channel',
        },
        {
            name: 'np',
            description: 'Now playing',
        },
    ]);
}
