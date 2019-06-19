const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    let server = message.guild.id;
    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!db.get("serveurs_on").find({ serveur: server }).value()) {
            message.channel.send("**❌ | Ce serveur ne dispose pas d'anti-pub effectif.**")
        } else {
            db.get("serveurs_on").remove({ serveur: server }).write()
            message.channel.send("**✅ | L'anti-pub de ce serveur est désormais désactivé.**")
        }
    } else {
        message.channel.send("**❌ | Vous ne disposez pas des permissions nécessaires pour effectuer cette commande.")
    }
}