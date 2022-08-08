const Discord = require('discord.js');
const client = new Discord.Client();
client.setMaxListeners(0);
const işaret = require('./işaret.json');
const hedefimiz = require('./hedef.json');
const { Client, MessageEmbed } = require('discord.js')

var prefix = işaret.prefix
var hedef = hedefimiz.hedef

client.on('ready', () => {
  console.log(`Botun olan ${client.user.tag}sunucuya giriş yaptı ve artık aktif!`);
  client.user.setActivity('My Coder MamiReyiz', {type: 'PLAYING' })
  .then(presence => console.log('Durum --> ${presence.activities[0].name} oldu.'))
  .catch(console.error);
});

client.on("guildMemberAdd", member => {
try {
  const Sayaç = member.guild;
Sayaç.setName(`REYIZZERS (${member.guild.memberCount}/${hedef})`);
}
catch (e) {
console.log(e);
}
});

client.on('message', message => {
  if (message.content.startsWith('oylama')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Oylama yapmak için YÖNETİCİ rolüne sahip olmalısın.');
    if (!botmesajı) return message.reply('Oylamanın ne olacağını yazmadınız.');
    message.delete(message.author)
    const embed = new MessageEmbed()
    .setTitle('OYLAMA')
    .setDescription(botmesajı)
    .setFooter('REYIZZERS');
    message.channel.send({ embed: embed }).then( embedMessage => {
      embedMessage.react("✔️")
      embedMessage.react("❌")
    })
  }
});

client.on('message', async message => {
  if (message.content.startsWith('?play')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!botmesajı) return message.reply('Lütfen bir URL kullanın.')
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const ytdl = require('ytdl-core');
      connection.play(ytdl(`${botmesajı}`, { filter: 'audioonly' }))
    }else {
message.reply('Bir sesli kanala katılın.');
    }
  }
})

client.on("guildMemberAdd", member => {
  try {
  let role = member.guild.roles.cache.find(role => role.name === 'Üye')
  member.roles.add(role);
} catch(e) {
  console.log(e)
}
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('?kick')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapabilmen için yönetici olman gerek.')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
          const log = message.guild.channels.cache.find(channel => channel.name === 'log-kanalı')
           log.send(`${user.tag} kişisi kicklenmiştir`);
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
      }
    } else {
      message.reply("Atılacak kişiyi yazmadın");
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;
if (message.content.startsWith('?ban')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
          const log = message.guild.channels.cache.find(channel => channel.name === 'log-kanalı')
           log.send(`${user.tag} kişisi banlanmıştır.`);
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
      }
    } else {
      message.reply("Yasaklanacak kişiyi yazmadın.");
    }
  }
});

client.on("guildMemberRemove", member => {
try {
  const Sayaç = member.guild;
Sayaç.setName(`REYIZZERS (${member.guild.memberCount}/${hedef})`);
}
catch (e) {
console.log(e);
}
});

client.on('guildMemberAdd', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '👋┃aramıza-katılanlar');
  girişçıkış.send(`Aramıza hoşgeldin, ${member}`);
});

client.on('guildMemberRemove', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === '👋┃aramıza-katılanlar');
  girişçıkış.send(` ${member} Aramızdan ayrıldı, tekrar görüşmek dileğiyle :cry: `);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.send('Aleyküm Selam');
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'kurallar') {
    const kanal = new MessageEmbed()

    .setTitle('KURALLAR')
    .setDescription('Lütfen küfür, argo ve kırıcı kelimeler kullanmayalım.Yasadışı konular hakkında konuşmayalım.Kimsenin kişisel bilgilerini paylaşmayın!Spam, flood, kesinlikle yasaktır! Gereksiz emoji, spoileri caps kullanmayın uyarıdan sonra sunucudan yasaklanabilirsiniz.Her sunucuda olduğu gibi reklam yapmak yasaktır.Din, dil, ırk ayrımı yapmayın, herkesin eşit olduğunu sakın unutmayın.Kan, vahşet ve Cinsellik içeren görseller paylaşmayın.')
    .setAuthor('REYIZZERS Bot Developer')
    .setColor("ORANGE")
    .setThumbnail('https://media.discordapp.net/attachments/983762666059337778/983791065893052477/tg6_logo.png.jpg?width=920&height=612')
    message.channel.send(kanal);
  }
})


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oç') {
    msg.delete()
    msg.channel.send('Lüfen bu şekilde küfürler kullanma!');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix +  'youtube') {
    msg.channel.send('https://www.youtube.com/watch?v=qUBWBh_-JFo&t=73s');
  }
  client.on('message', msg => {
    if (msg.content.toLowerCase() === prefix +  'dc') {
      msg.author.send('https://discord.gg/JRS2jkeuj7');
    }
  });

});

client.login('OTgzNzYxNzY1NTQ2NDg3ODM4.G1I87x.FUwvSfdUSmg9zrmXRBXgU46rJvBfa6kxbyvevk');
