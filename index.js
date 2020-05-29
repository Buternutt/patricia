const Discord = require("discord.js")
const client = new Discord.Client()

let prefix = "t!"

client.login("NzE1ODc0MTQ5OTgwOTYyODYz.XtDjzw.vi5oLF9zLG2crkImJU4dQnPeHF8");
client.on('ready', () => console.log('Coucou je suis démarré !'));
client.on('ready', function(){
    client.user.setActivity('Arroser')
})

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: ' + member.user.username + ' à rejoint ! ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('702801775463497819').sendMessage(embed)
});

/*Kick*/
client.on('message', message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.sendMessage("Tu n'as pas la permission :heart:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.sendMessage("Veuillez menttioner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.sendMessage("Vous ne pouvez pas kick cet utilisateur :x:")
        member.kick()
        message.channel.sendMessage("**"+member.user.username + '** à été exclu !')
    }
})

/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.sendMessage("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.sendMessage("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.sendMessage("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.sendMessage("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});