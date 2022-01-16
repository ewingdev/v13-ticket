const Discord = require("discord.js");//ewing35youtube
const client = new Discord.Client({
  disableMentions: 'everyone'
})
require("dotenv").config()
require('discord-reply');//ewing35youtube
const randomstring = require("randomstring");//ewing35youtube
const disbut = require('discord-buttons');//ewing35youtube
require('discord-buttons')(client);//ewing35youtube
const { MessageMenu, MessageMenuOption } = require('discord-buttons');//ewing35youtube
const config = require(`./config.json`)
const prefix = config.prefix;//ewing35youtube
const { Database } = require("quickmongo");
const db = new Database(config.Mongo)//ewing35youtube
async function channelLog(embed) {//ewing35youtube
  if (!config.log_channel_id) return;//ewing35youtube
  let ch = await client.channels.cache.get(config.log_channel_id) || client.guild.channels.cache.find(channel => channel.name.match("log"));//ewing35youtube
  if (!ch) return console.log(`lan salak configi doldur`)//ewing35youtube
  ch.send(embed)//ewing35youtube
}//ewing35youtube
//ewing35youtube
client.on('ready', async () => {//ewing35youtube
  await console.clear()//ewing35youtube
  channelLog(`> **Bot** discord API'sine bağlanıyor`)//ewing35youtube
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)//ewing35youtube
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)//ewing35youtube
  console.log(`Ewing35 TARAFINDAN KODLANMIŞTIR`)//ewing35youtube
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)//ewing35youtube
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)//ewing35youtube
  console.log(`Ewing35 TARAFINDAN KODLANMIŞTIR`)//ewing35youtube
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)
  console.log(`Ewing35 TARAFINDAN KODLANMIŞTIR`)
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)
  console.log(`TÜM HAKLAR Ewing35'E AİTTİR`)
  console.log(`Ewing35 TARAFINDAN KODLANMIŞTIR`)
  client.user.setActivity(config.status.name, { type: config.status.type.toUpperCase(), url: "https://twitch.tv/ewing.35" })
});//ewing35youtube
client.on("message", async(message) =>{
  if (message.author.bot || !message.guild) return;
  let args = message.content.toLowerCase().split(" ");//ewing35youtube
  let command = args.shift()
  if (command == prefix + `yardım`) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`Komut Listesi`)
      .setDescription(`> \`${prefix}ticket-gönder\` - Ticketleri açmak için bir mesaj gönderin
> \`${prefix}ticket-ekle\` - Belirli bir tickete üye ekler
> \`${prefix}ticket-kaldır\` - Bir üyeyi belirli bir ticket kaldırır.
> \`${prefix}ticket-sil\` - Belirli bir ticketi sil
> \`${prefix}ticket-kapat\` - Belirli bir ticketi kapat
> \`${prefix}ticket-aç\` - Belirli bir ticketi aç
> \`${prefix}yeniden-adlandır\` - Belirli bir ticketi yeniden adlandır
> \`${prefix}kanal-ayarla\` - ticketin gideceği kanalı ayarlayın
> \`${prefix}yetkili-ayarla\` - ticket yetkililerini ayarlayın`)
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(`Tüm haklar Ewing35'e aittir`)
    message.lineReply({ embed: embed })
  }
  if (command == prefix + `ticket-ekle`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut \`MANAGE_MESSAGES\` izini gerekir..`);//ewing35youtube
    let args = message.content.split(' ').slice(1).join(' ');//ewing35youtube
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));//ewing35youtube
      if (!member) return message.lineReply(`İD'nin bir üyesinden bahsedin`);//ewing35youtube
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
        }).then(() => {
          message.lineReply({ embed: { description: `${member} başarıyla eklendi ${channel}`, color: 0x5865F2 } });//ewing35youtube
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket'a birisi eklendi!`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Eklenen Kişi`, member.user)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        });//ewing35youtube
      }
      catch (e) {
        return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//ewing35youtube
      }
    }
  }
  if (command == prefix + `ticket-kaldır`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut \`MANAGE_MESSAGES\` izini gerekir..`);//ewing35youtube
    let args = message.content.split(' ').slice(1).join(' ');//ewing35youtube
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));//ewing35youtube
      if (!member) return message.lineReply(`İD'nin bir üyesinden bahsedin`);//ewing35youtube
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
        }).then(() => {
           let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket'tan birisi kaldırıldı`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Kişi eklendi`, member.user)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          message.lineReply({ embed: { description: `Başarıyla silindi ${member} tarafından ${channel}`, color: 0x5865F2 } });//ewing35youtube
        });//ewing35youtube
      }
      catch (e) {
        return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//ewing35youtube
      }
    }
  }
  if (command == prefix + 'ticket-sil') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut \`MANAGE_MESSAGES\` izini gerekir..`);//ewing35youtube
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      message.lineReply({ embed: { description: `Ticketiniz 5 saniye sonra gerçekleştirilir, ve kapatılacak`, color: 0x5865F2 } })
      setTimeout(async () => {
        let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket Silindi`)
            .addField(`Ticket Numarası`, `${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
            .addField(`Ticketi açan`,`<@!${await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by}>`)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          channel.delete()
      }, 5000)
    }
  }
  if (command == prefix + 'ticket-kapat') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut \`MANAGE_MESSAGES\` izini gerekir..`);//ewing35youtube
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.lineReply({ embed: { description: `Ticketiniz 5 saniye sonra gerçekleştirilir, ve kapatılacak`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Ticket tarafından kapatıldı <@!${message.author.id}>`, color: `YELLOW` } })
          let type = 'member'
          await Promise.all(channel.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));//ewing35youtube
          channel.setName(`closed-${(await db.get(`ticket_${channel.id}_${message.guild.id}`))}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket kapandı`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`YELLOW`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//ewing35youtube
        }
      }, 1000)
    }
  }

  if (command == prefix + 'ticket-aç') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut \`MANAGE_MESSAGES\` izini gerekir..`);//ewing35youtube
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.lineReply({ embed: { description: `Ticketiniz 5 saniye sonra gerçekleştirilir`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Ticket tarafından açıldı <@!${message.author.id}>`, color: `GREEN` } })
          let meember = client.users.cache.get(await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by);//ewing35youtube
          channel.updateOverwrite(meember, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Staff_${message.guild.id}.Admin`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Staff_${message.guild.id}.Moder`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.setName(`ticket-${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket tekrar açıldı`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Eyleme  göre`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//ewing35youtube
        }
      }, 1000)
    }
  }
  if (command == prefix + 'yeniden-adlandır' || command == prefix + 'isim-ayarla') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu komut \`MANAGE_MESSAGES\` izini gerekir..`);//ewing35youtube
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu sunucunun önce yetkili rollerini ayarlaması gerekiyor! \`{prefix}yetkili-ayarla\``, color: 0x5865F2 } })//ewing35youtube
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {//ewing35youtube
      let args = message.content.split(' ').slice(1).join(' ');//ewing35youtube
      if (!args) return message.lineReply({ embed: { description: `Lütfen ticket için istediğiniz ismi seçin`, color: 0x5865F2 } })//ewing35youtube
      channel.setName(args)//ewing35youtube
      message.delete()//ewing35youtube
      let log_embed = new Discord.MessageEmbed()//ewing35youtube
        .setTitle(`Ticket kanal isimi değişti`)//ewing35youtube
        .addField(`Yeni isim`, args)//ewing35youtube
        .addField(`Ticket`, `<#${channel.id}>`)//ewing35youtube
        .addField(`<@!${message.author.id}>`, `tarafından`)//ewing35youtube
        .setTimestamp()//ewing35youtube
        .setColor(0x5865F2)//ewing35youtube
        .setFooter(message.guild.name, message.guild.iconURL())//ewing35youtube
      channelLog(log_embed)//ewing35youtube
    }//ewing35youtube
  }//ewing35youtube
  if (command == prefix + 'yetkili-ayarla'){//ewing35youtube
    console.log(args)//ewing35youtube
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: Bu komut \`ADMINISTRATOR\` izini gerekir..`);//ewing35youtube
    if (args.length != 2) return message.lineReply({ embed: { description: `Lütfen bu komutla bir Yönetici rol idsi, *sonra* bir Moderatör rol idsi sağlayın! `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.lineReply({ embed: { description: `Lütfen bu komutla önce bir Yönetici rolünden (veya iD), *sonra* bir Moderatör rolünden (veya iD) bahsedin! `, color: 0x5865F2 } })
    const Admin = message.guild.roles.cache.get(args[0]);//ewing35youtube
    const Moder = message.guild.roles.cache.get(args[1]);//ewing35youtube
    await db.set(`Staff_${message.guild.id}.Admin`, Admin.id)//ewing35youtube
    await db.set(`Staff_${message.guild.id}.Moder`, Moder.id)//ewing35youtube
    message.react("✅")//ewing35youtube
  }//ewing35youtube
  if (command == prefix + 'kanal-ayarla'){//ewing35youtube
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: Bu komut \`ADMINISTRATOR\` izini gerekir..`);//ewing35youtube
    if (args.length != 2) return message.lineReply({ embed: { description: `Lütfen bu komutla bir kanal idsi, *sonra* bir kategori idsi belirtin! `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.lineReply({ embed: { description: `Lütfen bu komutla bir Log Kanalı (veya iD), *sonra* bir Kategori (veya iD) belirtin! `, color: 0x5865F2 } })
    const txt = message.guild.channels.cache.get(args[0]);//ewing35youtube
    const cat = message.guild.channels.cache.get(args[1]);//ewing35youtube
    if (txt.type !== "text") return message.channel.send("İlk giriş bir metin kanalı olmalıdır");//ewing35youtube
    if (cat.type !== "category") return message.channel.send("İkinci giriş bir metin kategorisi olmalıdır");//ewing35youtube
    await db.set(`Channels_${message.guild.id}.Log`, txt.id)//ewing35youtube
    await db.set(`Channels_${message.guild.id}.Cat`, cat.id)//ewing35youtube
    message.react("✅")//ewing35youtube
  }//ewing35youtube
  if (command == prefix + 'ticket-gönder' || command == prefix + 'ticket') {//ewing35youtube
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`:x: Bu komut \`ADMINISTRATOR\` izini gerekir..`);//ewing35youtube
    const sfats = await db.get(`Staff_${message.guild.id}`)//ewing35youtube
    const sfas = await db.get(`Channels_${message.guild.id}`)//ewing35youtube
    if (!sfats || sfats === null) return message.lineReply({ embed: { description: `Bu sunucunun önce personel rollerini ayarlaması gerekiyor! \`${prefix}yetkili-ayarla\``, color: 0x5865F2 } })//ewing35youtube
    if (!sfas || sfas === null) return message.lineReply({ embed: { description: `Bu sunucunun önce ticket kanallarını kurması gerekiyor! \`${prefix}kanal-ayarla\``, color: 0x5865F2 } })//ewing35youtube
    let idd = randomstring.generate({ length: 20 })//ewing35youtube
    let args = message.content.split(' ').slice(1).join(' ');//ewing35youtube
    if (!args) args = `Ticket Sistemi`//ewing35youtube
    let button1 = new MessageMenuOption()//ewing35youtube
    .setLabel('Destek')//ewing35youtube
    .setEmoji('🟢')//ewing35youtube
    .setValue("normal-destek")//ewing35youtube
    .setDescription('Sıradan bir kod desteği için bu kategoriyi kullanabilirsiniz.')//ewing35youtube
    let button3 = new MessageMenuOption()//ewing35youtube
    .setLabel('Genel Destek')//ewing35youtube
    .setEmoji('🔴')//ewing35youtube
    .setValue("acil-destek")//ewing35youtube
    .setDescription('Eğer çok aceleniz var ise bu kategoriyi kullanın! Eğer aceleniz yoksa, cezalanabilirsiniz.')  //ewing35youtube
    let select = new MessageMenu()//ewing35youtube
    .setID(idd)//ewing35youtube
    .setPlaceholder('Ticket Oluşturmak İçin Kategori Seçiniz')//ewing35youtube
    .setMaxValues(1)//ewing35youtube
    .setMinValues(1)//ewing35youtube
    .addOptions(button1, button3)//ewing35youtube
    let embed = new Discord.MessageEmbed()//ewing35youtube
      .setTitle(args)//ewing35youtube
      .setDescription("Ticket oluşturmak için menüden aşağıdaki kategorilerden birini seçiniz.")//ewing35youtube
      .setThumbnail(message.guild.iconURL())//ewing35youtube
      .setTimestamp()//ewing35youtube
      .setColor(0x5865F2)//ewing35youtube
      .setFooter(message.guild.name, message.guild.iconURL())//ewing35youtube
    let msg = await message.channel.send({ embed: embed, component: select }).then(async msg => {//ewing35youtube
      msg.pin()//ewing35youtube
      let log_embed = new Discord.MessageEmbed()//ewing35youtube
        .setTitle(`Ticket Açıldı`)//ewing35youtube
        .addField(`Kanal`, `<#${message.channel.id}>`)//ewing35youtube
        .addField(`<@!` + message.author.id + `>`,`tarafından`)//ewing35youtube
        .setTimestamp()//ewing35youtube
        .setColor(0x5865F2)//ewing35youtube
        .setFooter(message.guild.name, message.guild.iconURL())//ewing35youtube
      channelLog(log_embed)//ewing35youtube
      await db.set(`tickets_${idd}_${message.guild.id}`, {//ewing35youtube
        reason: args,//ewing35youtube
        msgID: msg.id,//ewing35youtube
        id: idd,//ewing35youtube
        options: [button1,  button3],//ewing35youtube
        guildName: message.guild.name,//ewing35youtube
        guildAvatar: message.guild.iconURL(),//ewing35youtube
        channelID: message.channel.id//ewing35youtube
      })//ewing35youtube
    })//ewing35youtube
  }//ewing35youtube
})//ewing35youtube
//ewing35youtube
//ewing35youtube
client.on('clickMenu', async (button) => {//ewing35youtube
  console.log(button.values)//ewing35youtube
  if (await db.get(`tickets_${button.id}_${button.message.guild.id}`)) {//ewing35youtube
    await button.reply.send(`Ticket işleniyor. Lütfen bekleyin `, true)//ewing35youtube
    await db.math(`counts_${button.message.id}_${button.message.guild.id}`, `+`, 1)//ewing35youtube
    let count = await db.get(`counts_${button.message.id}_${button.message.guild.id}`)//ewing35youtube
    let channel;//ewing35youtube
    await button.clicker.fetch();//ewing35youtube
    if (button.values[0] === "normal-destek") { //ewing35youtube
      button.guild.channels.create(`ticket-${count}`, {//ewing35youtube
        permissionOverwrites: [//ewing35youtube
          {//ewing35youtube
            id: button.guild.roles.everyone,//ewing35youtube
            deny: ['VIEW_CHANNEL'],//ewing35youtube
          },//ewing35youtube
          {//ewing35youtube
            id: (await db.get(`Staff_${button.message.guild.id}.Admin`)),//ewing35youtube
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],//ewing35youtube
          },//ewing35youtube
          {//ewing35youtube
            id: button.clicker.user.id,//ewing35youtube
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],//ewing35youtube
          },//ewing35youtube
        ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `Ticket : <@!${button.clicker.user.id}>`, reason: "Tüm hakları Rootuser'e Aittir"//ewing35youtube
      }).then(async channel => {//ewing35youtube
        channel = channel//ewing35youtube
        await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })//ewing35youtube
      //ewing35youtube
        await button.reply.edit(`
  **Ticketiniz başarıyla açıldı!** <#${channel.id}>`, true)//ewing35youtube
            let log_embed = new Discord.MessageEmbed()//ewing35youtube
              .setTitle(`Ticket açıldı!`)//ewing35youtube
              .addField(`Ticket`, `<#${channel.id}>`)//ewing35youtube
              .addField(`Ticketi açan`, `<@!${button.clicker.user.id}>`)//ewing35youtube
              .addField(`Ticket Numarası`, count)//ewing35youtube
              .setTimestamp()//ewing35youtube
              .setColor(`GREEN`)//ewing35youtube
            channelLog(log_embed)//ewing35youtube
        const embedticket = new Discord.MessageEmbed()//ewing35youtube
          .setTimestamp()//ewing35youtube
          .setTitle("Normal Destek")//ewing35youtube
          .setFooter(`Ticket açıldı!`)//ewing35youtube
          .setColor(0x5865F2)//ewing35youtube
          .setDescription(`En yakın zamanda iletişime geçilecektir.\n
      Ticketi kapatmak için 🔒 emojisine tıklayınız 🔒`)//ewing35youtube
        let idd = randomstring.generate({ length: 25 })//ewing35youtube
        let bu1tton = new disbut.MessageButton()//ewing35youtube
          .setStyle(`gray`)//ewing35youtube
          .setEmoji(`🔒`)//ewing35youtube
          .setLabel(`Close`)//ewing35youtube
          .setID(idd)//ewing35youtube
        channel.send(`Merhaba <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {//ewing35youtube
          msg.pin()//ewing35youtube//ewing35youtube
        })//ewing35youtube
        })//ewing35youtube//ewing35youtube
      }
        if (button.values[0] === "acil-destek"){//ewing35youtube
          button.guild.channels.create(`ticket-${count}`, {//ewing35youtube
            permissionOverwrites: [//ewing35youtube
              {//ewing35youtube
                id: button.guild.roles.everyone,//ewing35youtube
                deny: ['VIEW_CHANNEL'],//ewing35youtube
              },//ewing35youtube
              {//ewing35youtube
                id: (await db.get(`Staff_${button.message.guild.id}.Admin`)),//ewing35youtube
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],//ewing35youtube
              },//ewing35youtube
              {//ewing35youtube
                id: (await db.get(`Staff_${button.message.guild.id}.Moder`)),//ewing35youtube
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],//ewing35youtube
              },//ewing35youtube
              {//ewing35youtube
                id: button.clicker.user.id,//ewing35youtube
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
              },
            ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `Ticket : <@!${button.clicker.user.id}>`, reason: "Tüm hakları Rootuser'e Aittir"
          }).then(async channel => {//ewing35youtube
            channel = channel//ewing35youtube
            await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })//ewing35youtube
          //ewing35youtube
            await button.reply.edit(`
      **Ticketiniz başarıyla açıldı!** <#${channel.id}>`, true)//ewing35youtube
                let log_embed = new Discord.MessageEmbed()//ewing35youtube
                  .setTitle(`Ticket açıldı!`)//ewing35youtube
                  .addField(`Ticket`, `<#${channel.id}>`)//ewing35youtube
                  .addField(`Ticketi açan`, `<@!${button.clicker.user.id}>`)//ewing35youtube
                  .addField(`Ticket Numarası`, count)//ewing35youtube
                  .setTimestamp()//ewing35youtube
                  .setColor(`GREEN`)//ewing35youtube
                channelLog(log_embed)//ewing35youtube
            const embedticket = new Discord.MessageEmbed()//ewing35youtube
              .setTimestamp()
              .setTitle("Genel Destek")
              .setFooter(`Ticket Açıldı!`)
              .setColor(0x5865F2)
              .setDescription(`En yakın zamanda iletişime geçilecektir.\n
      Ticketi kapatmak için 🔒 emojisine tıklayınız`)
            let idd = randomstring.generate({ length: 25 })
            await db.set(`close_${button.clicker.user.id}`, idd)
            let bu1tton = new disbut.MessageButton()
              .setStyle(`gray`)
              .setEmoji(`🔒`)
              .setLabel(`Kapat`)
              .setID(idd)
            channel.send(`👋 Merhaba <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {
              msg.pin()
            })
            })
        }
      }
    });//ewing35youtube
      client.on('clickButton', async (button1) => {
        await button1.clicker.fetch()
        let idd = randomstring.generate({ length: 25 })
        await db.set(`close_${button1.clicker.user.id}_sure`, idd)
        if (button1.id == (await db.get(`close_${button1.clicker.user.id}`))) {
          let bu0tton = new disbut.MessageButton()
            .setStyle(`red`)
            .setLabel(`close`)
            .setID(idd)
          await button1.reply.send(`Bu ticket'i kapatmak istediğinizden emin misiniz?`, { component: bu0tton, ephemeral: true });//ewing35youtube
        }
      })
        client.on('clickButton', async (button) => {
          await button.clicker.fetch()
          if (button.id == (await db.get(`close_${button.clicker.user.id}_sure`))) {
          await button.reply.send(`Ticket 5 saniye sonra kapatılacaktır!`, true)   
            let ch = button.channel
            if (!ch) return;
            setTimeout(async () => {
              try {
                await ch.send({ embed: { description: `Ticket Çoktan Kapatıldı! <@!${button.clicker.user.id}>`, color: `YELLOW` } });//ewing35youtube
                let type = 'member'
                await Promise.all(ch.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));//ewing35youtube
                ch.setName(`closed-ticket`)
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Ticket Kapatıldı`)
                  .addField(`Ticket`, `<#${ch.id}>`)
                  .addField(`Kapatan Kişi`, `<@!${button.clicker.user.id}>`)
                  .setTimestamp()
                  .setColor(`YELLOW`)
                channelLog(log_embed)
              } catch (e) {
                return button.channel.send(`Bir hata oluştu. Lütfen tekrar deneyin!`);//ewing35youtube
              }
            }, 4000)
          }
        })
client.login(config.TOKEN);//ewing35youtube
