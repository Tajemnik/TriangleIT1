const { MessageEmbed } = require('discord.js');

module.exports = (client, messages) => {
  
  const message = messages.first();
  
  // Get message delete log
  const messageDeleteLogId = client.db.settings.selectMessageDeleteLogId.pluck().get(message.guild.id);
  const messageDeleteLog = message.guild.channels.cache.get(messageDeleteLogId);
  if (
    messageDeleteLog &&
    messageDeleteLog.viewable &&
    messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
  ) {

    const embed = new MessageEmbed()
      .setTitle('Aktualizowanie wiadomości: `Masowe usuwanie`')
      .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
      .setDescription(`**${messages.size} wiadomości** na ${message.channel} zostało usuniętych.`)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    messageDeleteLog.send(embed);
  }

};