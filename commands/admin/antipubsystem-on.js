const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    let server = message.guild.id;
    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!db.get("serveurs_on").find({ serveur: server }).value()) {
            db.get("serveurs_on").push({ serveur: server }).write()
            message.channel.send("**✅ | Ce serveur dispose désormais d'un anti-pub actif.**")
        } else {
            message.channel.send("**❌ | Ce serveur dispose dèja d'un anti-pub effectif.**")
        }
    } else {
        message.channel.send("**❌ | Vous ne disposez pas des permissions nécessaires pour effectuer cette commande.")
    }
}