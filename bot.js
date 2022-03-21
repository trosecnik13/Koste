'use strict';
require("dotenv").config();

const {MessageActionRow, MessageButton, Client, MessageEmbed, Discord, Intents } = require("discord.js");
const download = require('image-downloader')
const low = require('lowdb');
const qr = require('qr-image');
const Database = require("easy-json-database");

const db_zpovednice = new Database("/home/pi/DiscordBot/src/zpovednice.json", {
});

const FileSync = require('lowdb/adapters/FileSync');
const translate = require('google-translate-api');
const adapter = new FileSync('/home/pi/DiscordBot/src/data.json');
const db = low(adapter);
const adapter_time = new FileSync('/home/pi/DiscordBot/src/time.json');
const db_time = low(adapter_time);
const adapter_coin = new FileSync('/home/pi/DiscordBot/src/coins.json');
const db_coin = low(adapter_coin);
const adapter_zebrak = new FileSync('/home/pi/DiscordBot/src/coin_time.json');
const db_zebrak = low(adapter_zebrak);
const adapter_rob = new FileSync('/home/pi/DiscordBot/src/rob.json');
const db_rob = low(adapter_rob);
const adapter_lotto = new FileSync('/home/pi/DiscordBot/src/lotto.json');
const db_lotto = low(adapter_lotto);
const adapter_lotto_data = new FileSync('/home/pi/DiscordBot/src/lotto_data.json');
const db_lotto_data = low(adapter_lotto_data);
const hltb = require('howlongtobeat');
const request = require('request');
const hltbService = new hltb.HowLongToBeatService();
const time = require(`/home/pi/DiscordBot/src/time.json`);
const ytdl = require('ytdl-core');
const fs = require("fs");
const discordTTS=require("discord-tts");
const token = require('/home/pi/DiscordBot/src/token.json');
const path = require('path');
const SteamAPI = require('steamapi');
const steam = new SteamAPI('F88559E98BC945E2356BB1387CD20B7D');
const adapter_gametime = new FileSync('/home/pi/DiscordBot/src/gametime.json');
const db_gametime = low(adapter_gametime);
const aztroJs = require("aztro-js")
const cows = require('cows');
const cool_face = require('cool-ascii-faces')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
var Jimp = require('jimp');
var requests = require('requests');

var stav_penezenky
var nazev_wallet

var connection = 0

const avaible_users = [
  "622070687036735539"
]

client.on("ready", () => 
{
  client.user.setActivity(`${cool_face()}`, { type: "PLAYING" });
  console.log(`${client.user.username} je online`);
});

var honor = parseInt(fs.readFileSync(`/home/pi/DiscordBot/honors.txt`, `utf8`), 10);
var pocetHoven = parseInt(fs.readFileSync(`/home/pi/DiscordBot/poop.txt`, `utf8`), 10);
var max = parseInt(fs.readFileSync(`/home/pi/DiscordBot/max.txt`, `utf8`), 10);
var min = parseInt(fs.readFileSync(`/home/pi/DiscordBot/min.txt`, `utf8`), 10);
var max_id = parseInt(fs.readFileSync(`/home/pi/DiscordBot/max_id.txt`, `utf8`), 10);
var min_id = parseInt(fs.readFileSync(`/home/pi/DiscordBot/min_id.txt`, `utf8`), 10);

client.on('interactionCreate', async interaction => {
	if (interaction.customId === "swagButton") {
    console.log("swag")
    await interaction.deferUpdate()
          .then(console.log)
          .catch(console.error);
    await interaction.message.channel.send("krpinskejjekkokot")
  }
});

client.on('message', async message =>
{

  function getUserFromMention(mention) 
  {
    if (!mention) return;
  
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
  
      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
  
      return client.users.cache.get(mention);
    }
  }
   
  if (message.content === 'swag') {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('swagButton')
          .setLabel('picozkurvpicotomrdam')
          .setStyle('DANGER')
      );

		message.channel.send({ content: 'picozkurvpicotomrdam', components: [row] });
	}

  console.log(`[${message.author.tag}]: ${message.content}`);

    /*if (message.content === "gej" || message.content === "kokot" || message.content === "debil" || message.content === "zmrde" || message.content === "sráč" || message.content === "zmrd" || message.content === "mrdka" || message.content === "negr" || message.content === "kripl" || message.content === "kunda" || message.content === "picus" || message.content === "pičus" || message.content === "pica" || message.content === "píča" || message.content === "píca" || message.content === "piča" || message.content === "šulin" || message.content === "zkurvenec" || message.content === "šulin" || message.content === "kunda" || message.content === "negře" || message.content === "kundo" || message.content === "kokote")
    {
         message.reply("Jo to teda jsi.");
    }*/
    if (message.content === "profil")
    {
        message.reply(message.author.displayAvatarURL());
    }
    if (message.content === "info" || message.content === "Narozeniny" || message.content === "narozeniny")
    {
        message.channel.send("<@!574984880555819020> mě stvořil v Úterý 3. Listopadu 2020, v 17:59:14.");
        message.channel.send
        (`    
████████╗██████╗░░█████╗░░██████╗███████╗░█████╗░███╗░░██╗██╗██╗░░██╗░░███╗░░██████╗░
╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗████╗░██║██║██║░██╔╝░████║░░╚════██╗
░░░██║░░░██████╔╝██║░░██║╚█████╗░█████╗░░██║░░╚═╝██╔██╗██║██║█████═╝░██╔██║░░░█████╔╝
░░░██║░░░██╔══██╗██║░░██║░╚═══██╗██╔══╝░░██║░░██╗██║╚████║██║██╔═██╗░╚═╝██║░░░╚═══██╗
░░░██║░░░██║░░██║╚█████╔╝██████╔╝███████╗╚█████╔╝██║░╚███║██║██║░╚██╗███████╗██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝░╚════╝░╚═════╝░╚══════╝░╚════╝░╚═╝░░╚══╝╚═╝╚═╝░░╚═╝╚══════╝╚═════╝░
        `)
    }
    if (message.content === "pan flegr" || message.content == "pan flégr")
    {
        const odpovedi = 
        [
            "https://instory.cz/content/images/5f/9d/5f9d51b624865-8313.jpg",
            "https://g.denik.cz/56/9e/flegr-05_sip-1140.jpg",
            "https://zivotvcesku.cz/wp-content/uploads/optimg/2020/09/73b73bee3700ee32aeba885b5349b4f8ce51ea91-w680-h382.jpg",
            "https://nevimnews.cz/wp-content/uploads/2020/09/120114529_456404161983349_7702594957496055211_n-2.jpg",
            "https://www.mix24.cz/wp-content/uploads/2020/08/flegr-1.jpg",
            "https://protiproudu.net/wp-content/uploads/2020/03/jaroslav-flegr-1.jpg",
            "https://zivotvcesku.cz/wp-content/uploads/optimg/2020/08/da0b156a4285777821b9d6586419eb02414d3475-w680-h382.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ57QAFBtaafD_qVtfXpHFoLRJ0il3f-5UNwA&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9Jg5fgv5MIIfmtrHVBk-atS6hOSpDlYaVCQ&usqp=CAU",

        ];
        const odpoved = Math.floor(Math.random() * odpovedi.length);

        message.reply(odpovedi[odpoved])
    }
    if (message.content === "help" || message.content === "commands" || message.content === "přikazy" || message.content === "příkazy")
    {
        const embed = new MessageEmbed()
       .setTitle("příkazy")
       .setColor(0xffff00)
       .setDescription("profil, info, pan flégr, +1/-1, jsem gej?, pohlaví, changelog, hovno, penis, earrape, kostky, set status help, Jsem krysa?, set avatar <photo url>, say, hax, coins help, bet, betkostky, ticket, rob, qr, gametime, randomgame, btcwallet, btc, btcwallet, bored, čokl, name, geoip, joke, eviljoke, počasí, textart, btcfees, midgetempire, cow");
        message.channel.send({ embeds: [embed] });
    }
    if (message.content === "changelog")
    {
        const embed = new MessageEmbed()
        .setTitle('Changelog')
        .setColor(0xbe5e6b)
        .addField(`**v. 2.3**`, "Přidán btc, btcwallet, bored, čokl, name, geoip, joke, eviljoke, počasí, textart, novinky")
        .addField(`**v. 2.2**`, "Přidán příkaz gametime, randomgame")
        .addField(`**v. 2.1**`, "Přidána loterie, qr, a rob")
        .addField(`**v. 2.0**`, "Přidán vote, a coin systém")
        .addField(`**v. 1.1.2.**`, "Přidán say, ludix, hax")
        .addField(`**v. 1.1.1.**`, "Přidán příkaz fire, fixnuto hovno, Jsem krysa?")
        .setDescription("**Aktuální verze: 2.3**")
      message.channel.send({ embeds: [embed] }); 
    }
    if (message.content === "+1") 
    {
      honor = honor + 1;

      fs.writeFile('/home/pi/DiscordBot/honors.txt', honor.toString(), function (error) { 
            if (error) return console.log(error);  
          })
        
      message.channel.send(`Aktuální počet bodů je: ${honor}`);  
    }
    if (message.content === 'jsem gej?' || message.content ==="Jsem gej?") 
    {
        const promenna = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        const odpoved = Math.floor(Math.random() * promenna.length);
        if (odpoved === 0 || odpoved === 1) 
        {
            const embed = new MessageEmbed()
            .setTitle('Bohužel nejsi')
            .setColor(0xbe5e6b)
            .setDescription('Měl by jsi na sobě zapracovat!')
            .setImage ("https://previews.123rf.com/images/spaxia/spaxia1610/spaxia161000074/64516481-angry-bald-man-gesture-thumbs-down-isolated-on-white-background.jpg")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 2 || odpoved === 3 || odpoved === 4 || odpoved === 5 || odpoved === 6 || odpoved === 7 || odpoved === 8 || odpoved === 9)
        {
            const embed = new MessageEmbed()
            .setTitle('Jasně že jsi')
            .setColor(0xbe5e6b)
            .setDescription('Proč se vůbec ptáš?')
            .setImage ("https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180703082251-pride-kiss.jpg")
          message.channel.send({ embeds: [embed] });
        }
    }
    if (message.content === "pohlavi" || message.content ==="pohlaví" || message.content === "moje pohlavi" || message.content ==="moje pohlaví" || message.content === "gender" || message.content === "Gender") 
    {
        const promenna = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        const odpoved = Math.floor(Math.random() * promenna.length);
        if (odpoved === 0)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Cassgender')
            .setColor(0x0e4bef)
            .setDescription('Stav mysli, při němž je vám celá myšlenka genderu už ze své podstaty zcela cizí.')
            .setImage ("https://static.wikia.nocookie.net/lgbta/images/2/20/Cassgender.png/revision/latest?cb=20190606124209")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 1)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Earthgender')
            .setColor(0x0e4bef)
            .setDescription('Máte už delší pocit, že i když jste se narodili s větví mezi nohama, spíš se cítíte jako list, stéblo trávy nebo květina? V tom případě jste earthgenderista, člověk, jehož pohlaví je plně spjato s přírodou a Zemí.')
            .setImage ("https://64.media.tumblr.com/d209f07eecd801dba0540eb71e4a492c/tumblr_inline_ob0izldxqz1re2bou_1280.png")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 2)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Ekragender')
            .setColor(0x0e4bef)
            .setDescription('Ekragender má člověk, který si představuje, že jeho pohlaví vyletělo do vzduchu a rozdělilo se na tisíc různých kousků. Podle nás se tomu říká schizofrenie, ale budiž.')
            .setImage ("https://64.media.tumblr.com/69ca6e6bfe817de48b31e721b4082452/tumblr_inline_ob0ls4aczn1re2bou_1280.jpg")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 3)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Faunagender')
            .setColor(0x0e4bef)
            .setDescription('Víte, jak když někdo dvacet let žije jenom s kočkou, začne se sám cítit jako kočka? Tak to je přesně tohle.')
            .setImage ("https://static.wikia.nocookie.net/lgbta/images/4/43/Faunagender.png/revision/latest?cb=20200717234105")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 4)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Absorgender')
            .setColor(0x0e4bef)
            .setDescription('Pokud se definujete jako absorgenderista, znamená to, že se vaše pohlaví mění podle toho, v čí společnosti se zrovna nacházíte. Prostě absorbujete to jeho.')
            .setImage ("https://static.wikia.nocookie.net/gender/images/a/ae/Absorbgender_absorgender_by_pride_flags_d97oeoz-pre.jpg/revision/latest?cb=20190314150455")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 5)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Cyclogender')
            .setColor(0x0e4bef)
            .setDescription('Dámská specialita, kdy se pohlaví mění z jednoho na druhé po každém menstruačním cyklu.')
            .setImage ("https://64.media.tumblr.com/0db94d7e43ebdf677ef9716cd96bd447/tumblr_inline_ob06ek1Xk01re2bou_540.png")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 6)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Autigender')
            .setColor(0x0e4bef)
            .setDescription('Tajemný typ pohlaví, který dokáží vnímat jen lidé s autismem. To zní reálně!')
            .setImage ("https://static.wikia.nocookie.net/lgbta/images/5/57/Autigender.png/revision/latest?cb=20190901024126")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 7)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Necrogender')
            .setColor(0x0e4bef)
            .setDescription('Necrogender mají ti, kteří se domnívají, že pokud někdy měli nějaké pohlaví, to už v nich umřelo. Stejně jako jejich duše. Většinou se objevuje u zrzavých lidí.')
            .setImage ("https://static.miraheze.org/nonbinarywiki/5/5c/Necrogender.png")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 8)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Polygenderflux')
            .setColor(0x0e4bef)
            .setDescription('To je, když máte víc než jedno pohlaví zároveň, ale jestli se cítíte víc jako holka, jako kluk nebo jako ještěrka, se různě střídá podle nálady.')
            .setImage ("https://64.media.tumblr.com/bb5968577c53945a56d2facca5082507/tumblr_inline_okjgo7gQhh1re2bou_540.png")
          message.channel.send({ embeds: [embed] });
        }
        else if (odpoved === 9)
        {
            const embed = new MessageEmbed()
            .setTitle('Jsi Scorpigender')
            .setColor(0x0e4bef)
            .setDescription('Ultimátní gender nerozhodnutých. Jedinec má pocit, že je jistého pohlaví, ale to pohlaví vlastně nelze nijak přiblížit nebo definovat. Hodně matoucí.')
            .setImage ("https://static.wikia.nocookie.net/lgbta/images/8/81/Scorpigender.png/revision/latest?cb=20191010212723")
          message.channel.send({ embeds: [embed] });
        }
      
    }
    if (message.content === "poop" || message.content === "hovno" || message.content === "Poop" || message.content === "Hovno" || message.content === "Jdu srát" || message.content === "jdu srát")
    {
        
      const poop = "/home/pi/DiscordBot/src/poop.txt";
      const content = fs.readFileSync(poop, "utf-8");
      const embed = new MessageEmbed()
      .setTitle("Gratuluji, vysral jsi hovno!")
      .setDescription(content)
      .setColor(0x663300)
      message.channel.send({ embeds: [embed] });
        
      pocetHoven = pocetHoven + 1;

      fs.writeFile('/home/pi/DiscordBot/poop.txt', pocetHoven.toString(), function (error) { 
            if (error) return console.log(error);  
          })

      message.channel.send(`**Úspěšně se vysralo ${pocetHoven} hoven**`)
        
    }
    /*if (message.content.includes("koště") || message.content.includes("koste") || message.content.includes("Koště") || message.content.includes("koště") || message.content.includes("kostě") || message.content.includes("Kostě"))
    {
      //client.user.setAvatar(`/home/pi/DiscordBot/src/sad.png`);

      message.react(`🇩`);
      message.react(`🇷`);
      message.react(`🇿`);
      message.react(`🇵`);
      message.react(`🇮`);
      message.react(`🇨`);
      message.react(`🇺`);
      message.react(`🖕`);

      const promenna = ["0", "1", "2", "3", "4", "5"]
      const odpoved = Math.floor(Math.random() * promenna.length);
      //const id = "<@" + message.author.id + ">";

      if (odpoved === 1)
      {
        message.channel.send(`Co chceš ty zmrde?!`);
      }
      if (odpoved === 2)
      {
        message.channel.send(`Co chceš ty kokote?!`);
      }
      if (odpoved === 3)
      {
        message.channel.send(`Co chceš ty mrdko?!`);
      }
      if (odpoved === 4)
      {
        message.channel.send(`Co chceš ty čubko?!`);
      }
      if (odpoved === 5)
      {
        message.channel.send(`Co chceš ty sračko?!`);
      }
      if (odpoved === 0)
      {
        message.channel.send(`Co chceš ty kundo?!`);
      }
    }*/
    if (message.content.includes("pero") || message.content.includes("penis")) 
    {
      if ((db_coin.get(`${message.author.id}`).value()) > 10)
      {
      db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() - 10)).write()

      const embed = new MessageEmbed()
      .setTitle("✅Úspěšně odečteno 10 coinů!✅")
      .setDescription(`Aktuální počet coinů: **${db_coin.get(`${message.author.id}`).value()}**`)
      .setColor(0x0ace24)
      message.channel.send({ embeds: [embed] });

      var ChannelID = message.channel.id;

      if (ChannelID !== "709623136714227722")
      {
        const user = message.mentions.members.first();
        const autor = "<@" + message.author.id + ">";

        const promenna = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "50"]
        const odpoved = Math.floor(Math.random() * promenna.length);

       if (odpoved === 28)
      {
        if (!user)
        {
          message.channel.send(`Penis ${autor} má délku penisu v mínusu, tudíž je jeho penis zařazen do kategorie mikropenis.`)
          const broadcast = client.voice.createBroadcast();
          var channelId=message.member.voice.channelID;
          var channel=client.channels.cache.get(channelId);
          channel.join().then(connection => 
          {
          broadcast.play(discordTTS.getVoiceStream(`${message.author.username} have micropenis`));
          const dispatcher=connection.play(broadcast);
          });
        }
        else
        {
          message.channel.send(`Penis ${user} má délku penisu v mínusu, tudíž je jeho penis zařazen do kategorie mikropenis.`)
          const broadcast = client.voice.createBroadcast();
          var channelId=message.member.voice.channelID;
          var channel=client.channels.cache.get(channelId);
          channel.join().then(connection => 
          {
          broadcast.play(discordTTS.getVoiceStream(`${message.mentions.members.username} have micropenis`));
          const dispatcher=connection.play(broadcast);
          });
        }
      }
       if (odpoved >= 0 && odpoved <= 27)
      {
        if (!user)
        {
          message.channel.send(`Penis ${autor} má ${odpoved} cm`)
        }
        else
        {
          message.channel.send(`Penis ${user} má ${odpoved} cm.`)
        }
      }
       if (odpoved === 29)
      {
        if (!user)
        {
          message.channel.send(`Penis ${autor} má délku penisu tak velkou, že je jeho penis zařazen do kategorie gigapenis.`)
          const broadcast = client.voice.createBroadcast();
          var channelId=message.member.voice.channelID;
          var channel=client.channels.cache.get(channelId);
          channel.join().then(connection => 
          {
          broadcast.play(discordTTS.getVoiceStream(`${message.author.username} have gigapenis`));
          const dispatcher=connection.play(broadcast);
          });
        }
        else
        {
          message.channel.send(`Penis ${user} má délku penisu tak velkou, že je jeho penis zařazen do kategorie gigapenis.`)
          const broadcast = client.voice.createBroadcast();
          var channelId=message.member.voice.channelID;
          var channel=client.channels.cache.get(channelId);
          channel.join().then(connection => 
          {
          broadcast.play(discordTTS.getVoiceStream(`${message.mentions.members.username} have gigapenis`));
          const dispatcher=connection.play(broadcast);
          });
        }
      }
      }
      else
      {
        const content = "**Nespamuj do hl. chatu!**"
        const embed = new MessageEmbed()
        .setColor(0x940008)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
      }
      }
      else
      {
        const embed = new MessageEmbed()
        .setTitle(`❌Nemáš dostatek coinů! (10)❌`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
    }
    if (message.content === "random earrape" || message.content === "Random earrape" || message.content === "random Earrape" || message.content === "Random Earrape" || message.content === "earrape" || message.content === "Earrape")
    {
      if ((db_coin.get(`${message.author.id}`).value()) > 500)
      {
      db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() - 500)).write()

      const embed = new MessageEmbed()
      .setTitle("✅Úspěšně odečteno 500 coinů!✅")
      .setDescription(`Aktuální počet coinů: **${db_coin.get(`${message.author.id}`).value()}**`)
      .setColor(0x0ace24)
      message.channel.send({ embeds: [embed] });

      message.channel.send("😈😈😈");

      const voiceChannel = message.member.voice.channel;

      const vyber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      const song = Math.floor(Math.random() * vyber.length);

      if (!voiceChannel)
      {
        const content = "**Musíš být ve voice channelu!**"
        const embed = new MessageEmbed()
        .setColor(0x940008)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
      }
      else if (song === 0)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/maxipes.mp3', {volume: 15.0});
      }
      else if (song === 1)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/comeback.mp3', {volume: 15.0});
      }
      else if (song === 2)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/hospoda.mp3', {volume: 15.0});
      }
      else if (song === 3)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/nova.mp3', {volume: 15.0});
      }
      else if (song === 4)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/simpsnovi.mp3', {volume: 15.0});
      }
      else if (song === 5)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/spongebob.mp3', {volume: 15.0});
      }
      else if (song === 6)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/pokemon.mp3', {volume: 15.0});
      }
      else if (song === 7)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/vecernicek.mp3', {volume: 15.0});
      }
      else if (song === 8)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/boyard.mp3', {volume: 15.0});
      }
      else if (song === 9)
      {
        const connection = await message.member.voice.channel.join();
        connection.play('/home/pi/DiscordBot/src/pat_a_mat.mp3', {volume: 15.0});
      }
      }
      else
      {
        const embed = new MessageEmbed()
        .setTitle(`❌Nemáš dostatek coinů! (500)❌`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
    }
    if (message.content.startsWith("kostky ") || message.content.startsWith("kostka ") || message.content.startsWith("Kostky ") || message.content.startsWith("Kostka "))
    {
      const user = message.mentions.members.first();
      const autor = "<@" + message.author.id + ">";

      const autor_name = message.author.username; 
      {
        if (!user)
        {
          const embed = new MessageEmbed()
          .setTitle('Musíš někoho označit!')
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
        }
        else
        {
          const vyber1 = ["1", "2", "3", "4", "5", "6"]
          const odpoved1 = (Math.floor(Math.random() * vyber1.length) + 1);

          const author_vysledek = odpoved1;

          const vyber2 = ["1", "2", "3", "4", "5", "6"]
          const odpoved2 = (Math.floor(Math.random() * vyber2.length) + 1);

          const user_vysledek = odpoved2;

          message.channel.send(`${autor} hodil kostkou a padla **${author_vysledek}**`);
          message.channel.send(`${user} hodil kostkou a padla **${user_vysledek}**`);

          if (author_vysledek > user_vysledek)
          {
            const embed = new MessageEmbed()
            .setColor(0x0e4bef)
            .setDescription(`**${autor} vyhrál nad ${user}**`)
            message.channel.send({ embeds: [embed] });
          }
          else if (user_vysledek > author_vysledek)
          {
            const embed = new MessageEmbed()
            .setColor(0x0e4bef)
            .setDescription(`**${user} vyhrál nad ${autor}**`)
            message.channel.send({ embeds: [embed] });
          }
          else if (user_vysledek === author_vysledek)
          {
            const embed = new MessageEmbed()
            .setTitle('**Remíza!**')
            .setColor(0x0e4bef)
            message.channel.send({ embeds: [embed] });
          }
        }
      }
    }
    if (message.content === "ping")
    {
      message.channel.send(`Tvůj ping je: **${Date.now() - message.createdTimestamp}** ms.`);
      if ((Date.now() - message.createdTimestamp) > 150)
      {
        message.channel.send("Udělej dopíči něco tohle není normální! 🤬🤬🤬")
      }
    }
    if (message.content === "set status help")
    {
      const embed = new MessageEmbed()
            .setTitle('**Nastavení statusu bota.**')
            .addField(`**1**`,`Hraje`)
            .addField(`**2**`,`Poslouchá`)
            .addField(`**3**`,`Soutěží`)
            .addField(`**Vzor**`,`set status 2 Milion+`)
            .setColor(0x0e4bef)
            message.channel.send({ embeds: [embed] });
    }
    if (message.content.startsWith("set status 1 ")) {
      var aktivita = message.content.substr("set status 1 ".length);  

        client.user.setActivity(`${aktivita}`, { type: "PLAYING" });
      message.channel.send(`Status úspěšně nastaven na: **Hraje ${aktivita}**`)
    };
    if (message.content.startsWith("set status 2 ")) {
      var aktivita = message.content.substr("set status 2 ".length);  

        client.user.setActivity(`${aktivita}`, { type: "LISTENING" });
      message.channel.send(`Status úspěšně nastaven na: **Poslouchá ${aktivita}**`)
    };
    if (message.content.startsWith("set status 3 ")) {
      var aktivita = message.content.substr("set status 3 ".length);  

        client.user.setActivity(`${aktivita}`, { type: "COMPETING" });
      message.channel.send(`Status úspěšně nastaven na: **Soutěží ${aktivita}**`)
    };
    if (message.content.startsWith("set avatar "))
    {
      var profile_photo_url = message.content.substr("set avatar ".length);
      client.user.setAvatar(`${profile_photo_url}`);
    }
    if (message.content.startsWith("spam "))
    {
      var pocet = message.content.substr("spam ".length);
      if (pocet <= 100 && pocet > 0)
      {
        //const user = message.mentions.members.first();
        const author = client.users.cache.get(message.author.id);
        while (pocet > 0)
        {
        author.send(`
        ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣠⣤⣤⣤⣄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄
        ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⠄⠄⠄⠄⠄⠄
        ⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⢷⣄⠄⠄⠄⠄
        ⠄⠄⠄⠄⠄⠄⠄⢠⣌⢻⣿⣿⣿⣿⣿⣿⣿⣿⡯⠻⠿⣿⣿⡿⠿⠛⢷⠄⠄⠄
        ⠄⠄⠄⠄⠄⠄⠄⣤⣤⠼⠟⠛⠄⠠⣭⡙⠋⠉⠄⠄⠚⠟⠋⠃⠐⠸⢟⣦⠄⠄
        ⠄⠄⠄⠄⢀⣴⣿⡿⠋⠄⢀⣤⣤⣶⠈⢷⡄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⢻⠆⠄
        ⠄⠄⠄⠄⣿⣿⣍⠉⠻⠄⢻⣿⣿⣿⣶⣾⡿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠨⣾⠄
        ⠄⠄⠄⣸⡿⣩⣟⣿⡦⡲⣿⣿⣿⡿⠙⠟⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢈⠁⠄
        ⠄⠄⠄⣿⣏⣉⠉⠛⠢⠈⣻⣿⣿⡍⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⠄⠄⠈⠄⠄
        ⠄⠄⠄⣿⣿⣿⣿⣶⣾⣿⣿⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠄⢷⠄⡌⠄⠄⠄⠄⠄
        ⠄⠄⠸⠿⣿⣿⣿⡿⠟⠉⠿⠿⠁⠄⠄⠄⠄⠄⠄⢄⠄⠐⠁⠄⠄⠄⠄⠄⠄⠄
        ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        ⠄⠄⠄⠄⢠⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        ⠄⠄⠄⠄⣾⣇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        ⠄⠄⠄⣠⣿⣿⣷⣴⣶⣶⠄⠄⠄⠄⠄⠄⠄⠄⢀⣆⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄`);
        pocet = pocet - 1;
        }
      }
      else
      {
        const content = "**Musíš zadat číslo od 1-100!**"
        const embed = new MessageEmbed()
        .setColor(0x940008)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
      }
    }
    if (message.content.startsWith("fire "))
    {
      if (message.content.charAt(6) != "@")
      {
        console.log("skip");
      }
      else
      {
        const target = message.mentions.members.first(); 
        const author_name = "<@" + message.author.id + ">";
        try {
          message.channel.send(`${author_name} **firing at** ${target} 😈😈😈`);
        }
        catch {}
        pocet = 50
        while (pocet > 0)
        {
        target.send(`
        ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣤⡴⠶⠟⠛⠛⠛⠛⠻⠶⢦⣤⣀⠄⠄⠄⠄⠄⠄⠄⠄
        ⠄⠄⠄⠄⠄⣠⣴⡟⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⢻⣦⣄⠄⠄⠄⠄⠄
        ⠄⠄⠄⣠⡾⠋⠈⣿⣶⣄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⣶⣿⠁⠙⢷⣄⠄⠄⠄
        ⠄⠄⣴⠏⠄⠄⠄⠸⣇⠉⠻⣦⣀⠄⠄⠄⠄⣀⣴⠟⠉⣸⠇⠄⠄⠄⠹⣦⠄⠄fir
        ⠄⣼⠏⠄⠄⠄⠄⠄⢻⡆⠄⠄⠙⠷⣦⣴⠾⠋⠄⠄⢰⡟⠄⠄⠄⠄⠄⠹⣧⠄
        ⢰⡏⠄⠄⠄⠄⠄⠄⠈⣷⠄⢀⣤⡾⠋⠙⢷⣤⡀⠄⣾⠁⠄⠄⠄⠄⠄⠄⢹⡆
        ⣿⠁⠄⠄⠄⠄⠄⠄⠄⣸⣷⠛⠁⠄⠄⠄⠄⠈⠛⣾⣇⠄⠄⠄⠄⠄⠄⠄⠄⣿
        ⣿⠄⠄⠄⠄⠄⣠⣴⠟⠉⢻⡄⠄ AYAYA ⠄⣾⡟⠉⠻⣦⣄⠄⠄⠄⠄⠄⣿
        ⣿⡀⠄⢀⣴⠞⠋⠄⠄⠄⠈⣷⠄⠄⠄⠄⠄⠄⣾⠁⠄⠄⠄⠙⠳⣦⡀⠄⠄⣿
        ⠸⣧⠾⠿⠷⠶⠶⠶⠶⠶⠶⢾⣷⠶⠶⠶⠶⣾⡷⠶⠶⠶⠶⠶⠶⠾⠿⠷⣼⠇
        ⠄⢻⣆⠄⠄⠄⠄⠄⠄⠄⠄⠄⢿⡄⠄⠄⢠⡿⠄⠄⠄⠄⠄⠄⠄⠄⠄⣰⡟⠄
        ⠄⠄⠻⣆⠄⠄⠄⠄⠄⠄⠄⠄⠘⣷⠄⠄⣾⠃⠄⠄⠄⠄⠄⠄⠄⠄⣰⠟⠄⠄ 
        ⠄⠄⠄⠙⢷⣄⠄⠄⠄⠄⠄⠄⠄⢹⣇⣸⡏⠄⠄⠄⠄⠄⠄⠄⣠⡾⠋⠄⠄⠄
        ⠄⠄⠄⠄⠄⠙⠳⣦⣄⡀⠄⠄⠄⠄⢿⡿⠄⠄⠄⠄⢀⣠⣴⠞⠋⠄⠄⠄⠄⠄
        ⠄⠄⠄⠄⠄⠄⠄⠄⠉⠛⠳⠶⣦⣤⣼⣧⣤⣴⠶⠞⠛⠉⠄⠄⠄⠄⠄⠄⠄⠄
        `).catch(()=>{ pocet = 1 })
        pocet = pocet - 1
        }
      }
    }
    if (message.content === "???")
    {
      message.channel.send("Luděk").then(sentMessage => sentMessage.edit("Linhart")).then(sentMessage => sentMessage.edit("je")).then(sentMessage => sentMessage.edit("prostě")).then(sentMessage => sentMessage.edit("zkurvenej")).then(sentMessage => sentMessage.edit("král!!!")).then(sentMessage => sentMessage.edit("🙃🙃🙃"));
    }
    if (message.content === "Jsem krysa?" || message.content === "jsem krysa?" || message.content === "Sem krysa?" || message.content === "ssem krysa?" || message.content === "Jsem krysa" || message.content === "jsem krysa" )
    {
        var vyber = ["1", "2", "3", "4", "5"]
        const odpoved = (Math.floor(Math.random() * vyber.length) + 1);

        if (odpoved == "1")
        {
          message.react(`✅`);
        }
        else
        {
          message.react(`❌`);
        }
    }
    const currentdate = new Date(); 
        const den = currentdate.getDate() + ","
        + (currentdate.getMonth()+1);
        const datetime = "" + currentdate.getFullYear() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getDate() + " / "  
    + (currentdate.getHours() + 1) + ":" 
    + currentdate.getMinutes();

    fs.appendFile('/home/pi/DiscordBot/log.txt', datetime + " " + ("[" + message.author.tag + "]" + ": " + message.content.toString()) + '\n', { replace: false, append: true }, function (error) { 
      if (error) return console.log(error);  
    })
    /*message.attachments.forEach(a => {
      fs.writeFileSync(`./${a.name}`, a.file);
    });

    fs.writeFile('/home/pi/DiscordBot/price.txt', price.toString(), function (error) { 
      if (error) return console.log(error);  */

    if (message.content.startsWith("!send "))
    {
      const user_id = `405015966192238592`
      var zprava = message.content.substr("send ".length);

      client.users.fetch(user_id).then((user) => {
        user.send(zprava);
      });

      const user_name = "<@" + user_id + ">"

      const content = `Uspěšně odeslána zpráva: **${zprava}** \n pro ${user_name}`
      const embed = new MessageEmbed()
        .setColor(0x16c700)
        .setDescription(content)
      message.channel.send({ embeds: [embed] });
    }
    if (message.content.startsWith("!sendch "))
    {
      const channel_id = `709623136714227722`
      var zprava = message.content.substr("sendch ".length);

      client.channels.cache.get(channel_id).send(zprava)
    }
    if (message.content.startsWith("play ")) {
      if (message.member.voice.channelID === null)
      {
        const content = "**Musíš být ve voice channelu!**"
        const embed = new MessageEmbed()
        .setColor(0x940008)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
      }
      else {
        var song_url = message.content.substr("play ".length);

        if (ytdl.validateURL(song_url) === true) {
          connection = await (message.member.voice.channel.join())
          connection.play(ytdl(`${song_url}`, { filter: 'audioonly' }))
  
          var info = await ytdl.getBasicInfo(`${song_url}`);
          const embed = new MessageEmbed()
            .setColor(0x16c700)
            .setDescription(`**Playing: **` + info.videoDetails.title)
            .setFooter("Publish date: " + info.videoDetails.publishDate + " , Views: " + info.videoDetails.viewCount);
          message.channel.send({ embeds: [embed] });
        }
        if (song_url === "mefedron" || song_url === "Mefedron") {
          
        }
        if (song_url === "nostalgie" || song_url === "Nostalgie") {
          var nahodne_cislo = (Math.random() * (40 - 0) + 0).toFixed(0)

          const nostalgie_playlist = [
            "You Spin Me Round - Danzel",
            "Pumped Up Kicks - Foster the People",
            "Roar - Katy Perry",
            "So What (Main Version) - P!nk",
            "Stamp On The Ground - ItaloBrothers",
            "The Riddle (Radio Edit Mix) - Prezioso  Marvin",
            "TiK ToK - Kesha",
            "Timber (feat. Ke$ha) - Pitbull  Kesha",
            "Waka Waka (This Time for Africa)",
            "Wake-Me-Up-Avicii",
            "Wannabe - Spice Girls",
            "Hot N Cold - Katy Perry",
            "It s My Life - Dr. Alban",
            "Last Friday Night (T.G.I.F.) - Katy Perry",
            "Lean_On_feat_MØ_DJ_Snake_Major_Lazer_MØ_DJ_Snake",
            "Ma_Chérie_DJ_Antoine_Mad_Mark_2K12_Radio_Edit_DJ_Antoin",
            "Numa Numa Yey - Dance Time Trio",
            "Ocean Man - Ween",
            "Paper Planes - M.I.A",
            "Party Rock Anthem - LMFAO  Lauren Bennett  GoonRock",
            "Party Shaker (Video Edit) - R.I.O.  Nicco",
            "Danza Kuduro - Don Omar  Lucenzo",
            "Destination Calabria (Radio Edit) - Alex Gaudino  Crystal",
            "Die Young - Kesha",
            "DotA - New Single Version",
            "Dragostea Din Tei - O-Zone",
            "Dynamite - Taio Cruz",
            "Everytime We Touch - Cascada",
            "Firework - Katy Perry",
            "Give Me Everything (feat. Ne-Yo, Afrojack  Nayer) - Pitbull",
            "Hangover - Taio Cruz  Flo Rida",
            "Ai Se Eu Te Pego Nosa Nosa - The Shock Band",
            "All Star - Smash Mouth",
            "Around the World (La La La La La) (Radio Version) - A Touch",
            "Bad (feat. Vassy) (Radio Edit) - David Guetta  Showtek",
            "Barbie Girl - Aqua",
            "Be My Lover - La Bouche",
            "Blue (Da Ba Dee) (DJ Ponte Ice Pop Radio) - Eiffel 65",
            "Boten Anna (Radio edit) - Basshunter",
            "Break the Rules - Charli XCX",
            "Call Me Maybe - Carly Rae Jepsen"
          ]

          connection = await (message.member.voice.channel.join())
          connection.play(`/home/pi/DiscordBot/nostalgie/${nostalgie_playlist[nahodne_cislo]}.mp3`);          
        }
        else if (ytdl.validateURL(song_url) === false && song_url !== "mefedron" && song_url !== "Mefedron" && song_url !== "nostalgie" && song_url !== "Nostalgie") {
          const content = "**Nesprávná URL!**"
          const embed = new MessageEmbed()
          .setColor(0x940008)
          .setDescription(content)
          message.channel.send({ embeds: [embed] });
        }
      }
    }
    if (message.content === "play") {
      const embed = new MessageEmbed()
      .setTitle(`Zadej url!`)
      .setColor(0xbc0600)
      message.channel.send({ embeds: [embed] });
    }
    if (message.content === "disconnect") {
      connection.disconnect();
    }
    if (message.content.startsWith("say "))
    {
      var sound = message.content.substr("say ".length);
      var lenght = sound.length;

      if (message.member.voice.channelID != null)
      {
        if (lenght < 200)
        {
        const broadcast = client.voice.createBroadcast();
        var channelId=message.member.voice.channelID;
        var channel=client.channels.cache.get(channelId);
        channel.join().then(connection => 
        {
          broadcast.play(discordTTS.getVoiceStream(`${sound}`));
          const dispatcher=connection.play(broadcast);
        });
        }
        else
        {
        const content = `Zpráva musím mít méně než 200 znaků!`
        const embed = new MessageEmbed()
        .setColor(0x16c700)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
        }
      }
      else
      {
        const content = "**Musíš být ve voice channelu!**"
        const embed = new MessageEmbed()
        .setColor(0x940008)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
      }
    }
    if ((message.content.startsWith("clearchat ")) && (message.author.id === "574984880555819020")) 
    {
      var number = message.content.substr("clearchat ".length);

      message.channel.bulkDelete(number)
    }
    if (message.content.startsWith("hax ") || (message.content === "hax")) 
    {
      const user = message.mentions.members.first();

      if (!user)
      {
        const content = "**Musíš někoho označit**"
        const embed = new MessageEmbed()
        .setColor(0x940008)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
        console.log("0")
      }
      else
      {
        message.channel.send(`Hacking **${user}**...`)
                .then(msg => {
                    setTimeout(function() {
                        msg.edit(`Obtaining IP address...`)
                    }, 2500);
                    setTimeout(function() {
                        msg.edit(`Success! Target IP is **127.0.0.1**`)
                    }, 5000);
                    setTimeout(function() {
                      msg.edit(`Searching for vulnerabilities...`)
                    }, 7500);
                    setTimeout(function() {
                      msg.edit(`**1337** vulnerabilities found!`)
                    }, 10000);
                    setTimeout(function() {
                      msg.edit(`Trying exploits...`)
                    }, 12500);
                    setTimeout(function() {
                      msg.edit(`Admin privileges given!`)
                    }, 15000);
                    setTimeout(function() {
                      msg.edit(`✅ Target PC is actually **hacked!**`)
                    }, 17500);
                })
      }
    }
    /*if (message.content === "news")
    {
      const main = async () => {
        const starship = await news.search('SpaceX');
        
        for (let article of starship) {
            message.channel.send(article.title);
        }
      };

      main();
    }
    if (message.content === "email") {
      const embed = new MessageEmbed()
          .setTitle(`**Musíš zadat email!**`)
          .setColor(0x940008)
          message.channel.send({ embeds: [embed] });
    }
    if (message.content.startsWith("email ") && (message.author.id === "574984880555819020") || (message.content.startsWith("email ")) && (message.author.id === "339882189623918613") || (message.content.startsWith("email ")) && (message.author.id === "405015966192238592") || (message.content.startsWith("email ")) && (message.author.id === "303176058231062539"))
    {
      var email = message.content.substr("email ".length);
      var mail = email.split("-");
      var prijemce = mail[0]
      var obsah = mail[1]
      console.log(prijemce);
      console.log(obsah);
      if (prijemce == ``) {
        prijemce = ``
      }

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: `${token.heslo}`
        }
      });
      
      var mailOptions = {
        from: '',
        to: `${prijemce}`,
        subject: 'Koště pozdravuje',
        text: `${obsah}`
      };
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          message.channel.send(error);
        } else {
          console.log('Email sent: ' + info.response);
          const embed = new MessageEmbed()
          .setTitle(`**Email úspěšně odeslán!**`)
          .setColor(0x58be4a)
          .setFooter(info.response)
          .setDescription(`***pro ${prijemce}***`)
          message.channel.send({ embeds: [embed] });
        }
      });
    }*/
    if (message.content.startsWith("upvote"))
    {
      const user = message.mentions.members.first();

        if (!user)
        {
          const embed = new MessageEmbed()
          .setTitle('Musíš někoho označit!')
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
        }
        else
        {
          if ((message.mentions.members.first().id) == message.author.id)
          {
          const embed = new MessageEmbed()
          .setTitle('Nesmíš označit sám sebe!')
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
          }
          else
          {
            if ((db_time.get(`${message.author.id}`).value()) == undefined || (message.createdTimestamp - db_time.get(`${message.author.id}`).value()) > 86400000)
            {
              db_time.set(`${message.author.id}`, message.createdTimestamp).write()
              console.log("gej1");

              var ment_id = (message.mentions.members.first()).id;

              console.log(db.get(`${ment_id}`).value())

              var ment_name = "<@" + ment_id + ">"
              if ((db.get(`${ment_id}`).value()) == undefined)
              {
                db.set(`${ment_id}`, 1).write()
              }
              else
              {
                db.set(`${ment_id}`, (db.get(`${ment_id}`).value() + 1)).write()

                if ((db.get(`${ment_id}`).value()) > fs.readFileSync(`/home/pi/DiscordBot/max.txt`, "utf-8"))
                {
                  console.log("kokot2");
                  max = db.get(`${ment_id}`).value();
                  fs.writeFile('/home/pi/DiscordBot/max.txt', max.toString(), function (error) { 
                    if (error) return console.log(error);  
                  })
                  fs.writeFile('/home/pi/DiscordBot/max_id.txt', ment_id.toString(), function (error) { 
                    if (error) return console.log(error);  
                  })
                  console.log("max: " + max);
                }
              }
              const embed = new MessageEmbed()
              .setTitle(`**Upvote úspěšně udělen!**`)
              .setColor(0x58be4a)
              .setDescription(`**${ment_name} má aktuálně ${db.get(`${ment_id}`).value()} votů**`)
              message.channel.send({ embeds: [embed] });
            }
            else
            {
              const embed = new MessageEmbed()
              .setTitle(`Dát někomu hlas můžeš pouze po 24 hodinách!`)
              .setColor(0xbc0600)
              message.channel.send({ embeds: [embed] }); 
            }
          }
        }
    }
    if (message.content.startsWith("downvote"))
    {
      const user = message.mentions.members.first();

        if (!user)
        {
          const embed = new MessageEmbed()
          .setTitle('Musíš někoho označit!')
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
        }
        else
        {
          if ((message.mentions.members.first().id) == message.author.id)
          {
          const embed = new MessageEmbed()
          .setTitle('Nesmíš označit sám sebe!')
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
          }
          else
          {
            if ((db_time.get(`${message.author.id}`).value()) == undefined || (message.createdTimestamp - db_time.get(`${message.author.id}`).value()) > 82800000)
            {
              db_time.set(`${message.author.id}`, message.createdTimestamp).write()
              console.log("gej1");

              var ment_id = (message.mentions.members.first()).id;

              console.log(db.get(`${ment_id}`).value())

              var ment_name = "<@" + ment_id + ">"
              if ((db.get(`${ment_id}`).value()) == undefined)
              {
                db.set(`${ment_id}`, -1).write()
              }
              else
              {
                db.set(`${ment_id}`, (db.get(`${ment_id}`).value() - 1)).write()
                if ((db.get(`${ment_id}`).value()) < fs.readFileSync(`/home/pi/DiscordBot/min.txt`, "utf-8"))
                {
                  console.log("kokot");
                  min = db.get(`${ment_id}`).value();
                  fs.writeFile('/home/pi/DiscordBot/min.txt', min.toString(), function (error) { 
                    if (error) return console.log(error);  
                  })
                  fs.writeFile('/home/pi/DiscordBot/min_id.txt', ment_id.toString(), function (error) { 
                    if (error) return console.log(error);  
                  })
                  console.log("min: " + min);
                }
              }
              const embed = new MessageEmbed()
              .setTitle(`**Downvote úspěšně udělen!**`)
              .setColor(0x58be4a)
              .setDescription(`**${ment_name} má aktuálně ${db.get(`${ment_id}`).value()} votů**`)
              message.channel.send({ embeds: [embed] });
            }
            else
            {
              const embed = new MessageEmbed()
              .setTitle(`Dát někomu hlas můžeš pouze po 24 hodinách!`)
              .setColor(0xbc0600)
              message.channel.send({ embeds: [embed] }); 
            }
          }
        }
    }
    if (message.content === "votes")
    {
      var autor = "<@" + message.author.id + ">";
      var minimalni_id = "<@" + fs.readFileSync(`/home/pi/DiscordBot/min_id.txt`, "utf-8") + ">";
      var maximalni_id = "<@" + fs.readFileSync(`/home/pi/DiscordBot/max_id.txt`, "utf-8") + ">";
      var minimalni = fs.readFileSync(`/home/pi/DiscordBot/min.txt`, "utf-8")
      var maximalni = fs.readFileSync(`/home/pi/DiscordBot/max.txt`, "utf-8")

      var embed = new MessageEmbed()
        .setTitle('Počty hlasů')
        .setColor(0x140fdf)
        .setDescription(`**${autor} má aktuálně ${db.get(`${message.author.id}`).value()} hlasů**`)                                               //ty
      message.channel.send({ embeds: [embed] });
     /* var embed = new MessageEmbed()
        .setTitle('Nejvíce hlasů')
        .setColor(0x140fdf)
        .setDescription(`**Nejvíce hlasů má ${maximalni_id} a to ${maximalni}**`)                                              //ty
      message.channel.send({ embeds: [embed] });  
      var embed = new MessageEmbed()
        .setTitle('Nejméně hlasů')
        .setColor(0x140fdf)
        .setDescription(`**Nejméně hlasů má ${minimalni_id} a to ${minimalni}**`)                                            //ty
      message.channel.send({ embeds: [embed] }); */
    }
    if (message.content.startsWith("bet "))
    {
      var sazka = parseInt(message.content.substr("bet ".length))
      if (sazka == 0 || sazka < 0)
      {
        const embed = new MessageEmbed()
        .setTitle(`Nemůžeš vsadit 0 nebo mínus!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
      else
      {
        if ((db_coin.get(`${message.author.id}`).value()) >= sazka)
        {
          db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() - sazka)).write()
          var embed = new MessageEmbed()
          const vyhry = [
          0,
          0,
          0,
          0,
          0,
          0,
          0.25,
          0.25,
          0.25,
          0.5,
          0.5,
          0.7,
          0,
          0,
          0,
          0,
          0,
          0.5,
          0.7,
          1.25,
          1.75,
          2.5,
          5,
          0,
          0,
          0,
          0,
          0.25,
          0.5,
          0.5,
          0.7,
          1.25,
          1.75,
          2.25,
          5,
          0,
          0,
          0,
          0,
          0,
          0,
          0.25,
          0.25,
          0.25,
          0.5,
          0.5,
          0.7,
          1.25,
          1.25,
          1.25,
          1.25,
          1.8,
          2.5,
          5,
          0,
          0,
          0,
          0,
          0,
          0,
          0.25,
          0.25,
          0.25,
          0.5,
          0.5,
          0.7,
          1.25,
          2,
          2.5,
          5,
          25
          ]

          const vyhra = Math.floor(Math.random() * vyhry.length);
          var vyber = sazka * (vyhry[vyhra]) 
          db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() + vyber)).write()

          if ((vyhry[vyhra]) == 25)
          {

            const embed = new MessageEmbed()
            .setTitle(`🥳**Jackpot**🥳`)
            .setColor(0x58be4a)
            .setDescription(`Vyhrál jsi **${(vyber - sazka)}** coinů!`)
            .setFooter(`Aktuálně máš ${db_coin.get(`${message.author.id}`).value()} coinů`)
            message.channel.send({ embeds: [embed] });
          }
          else
          {

            if ((vyhry[vyhra]) >= 1)
            {
            const embed = new MessageEmbed()
            .setTitle(`**Výhra**`)
            .setColor(0x58be4a)
            .setDescription(`Vyhrál jsi **${(vyber - sazka)}** coinů!`)
            .setFooter(`Aktuálně máš ${db_coin.get(`${message.author.id}`).value()} coinů`)
            message.channel.send({ embeds: [embed] });
            }
            else
            {
            const embed = new MessageEmbed()
            .setTitle(`**Prohra**`)
            .setColor(0xbc0600)
            .setDescription(`Prohrál jsi **${(sazka - vyber)}** coinů!`)
            .setFooter(`Aktuálně máš ${db_coin.get(`${message.author.id}`).value()} coinů`)
            message.channel.send({ embeds: [embed] });
            }
          }
        }
        else
        {
          const embed = new MessageEmbed()
          .setTitle(`❌Nemáš dostatek coinů!❌`)
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
        } 
      }
    }
    if (message.content === "coins" || message.content === "wallet")
    {
      const embed = new MessageEmbed()
      .setColor(0xf0d963)
      .setTitle("Peněženka")
      .setDescription(`Aktuálně máš **${(db_coin.get(`${message.author.id}`).value()).toFixed(2)}** coinů`)
      message.channel.send({ embeds: [embed] });
    }
    if (message.content === "zebrat" || message.content === "žebrat" || message.content === "žebrát" || message.content === "zebrát")
    {
      if ((db_zebrak.get(`${message.author.id}`).value()) == undefined || (message.createdTimestamp - db_zebrak.get(`${message.author.id}`).value()) > 3600000)
      {
        db_zebrak.set(`${message.author.id}`, message.createdTimestamp).write()

        const vyhry = [
          10,
          20,
          30,
          40,
          50,
          60,
          70,
          80,
          90,
          100
          ]
          const vyhra = Math.floor(Math.random() * vyhry.length);
          var bonus = (vyhry[vyhra]) 
          console.log(bonus)
          if ((db_coin.get(`${message.author.id}`).value()) == null)
          {
            db_coin.set(`${message.author.id}`, bonus).write()
            console.log("gej1")
          }
          else
          {
            db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() + bonus)).write()
            console.log("gej2")
          }
  
          const embed = new MessageEmbed()
          .setTitle(`Vyžebral jsi ${bonus} coinů!`)
          .setColor(0x58be4a)
          message.channel.send({ embeds: [embed] });
      }
      else
      {
        const embed = new MessageEmbed()
        .setTitle(`Žebrat můžeš jednou za hodinu!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
    }
    if (message.content === "bet")
    {
      const embed = new MessageEmbed()
        .setTitle(`Musíš zadat počet coinů které chceš vsadit!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
    }
    if (message.content === "coins help" || message.content === "Coins help")
    {
      var embed = new MessageEmbed()
      .setTitle('Coin systém')
      .setColor(0x140fdf)
      .addField("coins / wallet", "zobrazí aktuální počet coinů")
      .addField("žebrat", "vyžebrá částku od (10-100)")
      .addField("bet", "vsadí coiny")
      .addField("ceny / prices", "zobrazí ceny commandů")
      .addField("betkostky ", "zahraje kostky proti koštěti")
      .setDescription(`**Příkazy**`)                                          
      message.channel.send({ embeds: [embed] });
    }
    if (message.content === "prices" || message.content === "ceny")
    {
      var embed = new MessageEmbed()
      .setTitle('Ceny')
      .setColor(0x140fdf)
      .addField("earrape", "500 coinů")
      .addField("penis", "10 coinů")
      .setDescription(`**Příkazy**`)                                          
      message.channel.send({ embeds: [embed] });
    }
    if (message.content.startsWith("betkostky "))
    {
      var sazka = parseInt(message.content.substr("betkostky ".length))

      if (sazka == 0 || sazka < 0)
      {
        const embed = new MessageEmbed()
        .setTitle(`Nemůžeš vsadit 0 nebo mínus!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
      else
      {
        if ((db_coin.get(`${message.author.id}`).value()) >= sazka)
        {
          db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() - sazka)).write()
          var embed = new MessageEmbed()
          const vyhry = [
            2,
            0
            ]

          const vyhra = Math.floor(Math.random() * vyhry.length);
          var vyber = sazka * (vyhry[vyhra]) 

          const autor_name = message.author.username; 

          const vyber1 = ["1", "2", "3", "4", "5", "6"]
          const odpoved1 = (Math.floor(Math.random() * vyber1.length) + 1);

          const author_vysledek = odpoved1;

          const vyber2 = ["1", "2", "3", "4", "5", "6"]
          const odpoved2 = (Math.floor(Math.random() * vyber2.length) + 1);

          const user_vysledek = odpoved2;

          if (author_vysledek > user_vysledek)
          {
            const embed = new MessageEmbed()
            .setColor(0x58be4a)
            .setTitle("Výhra")
            .addField(`${message.author.username} hodil kostkou a padla`, `**${author_vysledek}**`)
            .addField(`Koště hodil kostkou a padla`, `**${user_vysledek}**`)
            .setDescription(`Vyhrál jsi **${sazka}** coinů!`)
            message.channel.send({ embeds: [embed] });
            db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() + (sazka * 2))).write()
          }
          else if (user_vysledek > author_vysledek)
          {
            const embed = new MessageEmbed()
            .setColor(0xbc0600)
            .setTitle("Prohra")
            .addField(`${message.author.username} hodil kostkou a padla`, `**${author_vysledek}**`)
            .addField(`Koště hodil kostkou a padla`, `**${user_vysledek}**`)
            .setDescription(`Prohrál jsi **${sazka}** coinů!`)
            message.channel.send({ embeds: [embed] });
          }
          else if (user_vysledek === author_vysledek)
          {
            const embed = new MessageEmbed()
            .setTitle('**Remíza!**')
            .setColor(0x0e4bef)
            message.channel.send({ embeds: [embed] });
            db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() + sazka)).write()
          }
        }
        else
        {
          const embed = new MessageEmbed()
          .setTitle(`❌Nemáš dostatek coinů!❌`)
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
        } 
      }
    }
    if (message.content === "betkostky")
    {
      const embed = new MessageEmbed()
        .setTitle(`Musíš zadat počet coinů které chceš vsadit!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
    }
    if (message.content.startsWith("ticket "))
    {
      var cislo_losu = message.content.substr("ticket ".length)

      if (cislo_losu <= 0 || cislo_losu > 100)
      {
        const embed = new MessageEmbed()
        .setTitle(`Takový los nemůžeš koupit!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
      else
      {
        if ((db_coin.get(`${message.author.id}`).value()) >= 100)
        {
          if ((db_lotto.get(`${cislo_losu}`).value()) != null)
          {
            const embed = new MessageEmbed()
            .setTitle(`❌Los s číslem **${cislo_losu} má již někdo zakoupený!**❌`)
            .setColor(0xbc0600)
            message.channel.send({ embeds: [embed] }); 
          }
          else
          {
          db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() - 100)).write()
          db_lotto.set(`${cislo_losu}`, `${message.author.id}`).write()

          db_lotto_data.set(`prize`, (db_lotto_data.get(`prize`).value() + 100)).write()

          const embed = new MessageEmbed()
          .setTitle("✅Úspěšně zakoupen los za 100 coinů!✅")
          .setDescription(`Zakoupil jsi los s číslem ${cislo_losu}`)
          .setColor(0x0ace24)
          message.channel.send({ embeds: [embed] });
          }
        }
        else
        {
          const embed = new MessageEmbed()
          .setTitle(`❌Nemáš dostatek coinů!❌`)
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] }); 
        }
      }
    }
    if (message.content === "spin")
    {
      if ((message.createdTimestamp - db_lotto_data.get(`time`).value()) > 82800000)
      {
      const nahodne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
      const vyhr1 = Math.floor(Math.random() * nahodne.length);
      var vyhra1 = (nahodne[vyhr1]) 
      const vyhr2 = Math.floor(Math.random() * nahodne.length);
      var vyhra2 = (nahodne[vyhr2]) 
      const vyhr3 = Math.floor(Math.random() * nahodne.length);
      var vyhra3 = (nahodne[vyhr3]) 
      const vyhr4 = Math.floor(Math.random() * nahodne.length);
      var vyhra4 = (nahodne[vyhr4]) 
      const vyhr5 = Math.floor(Math.random() * nahodne.length);
      var vyhra5 = (nahodne[vyhr5]) 
      const vyhr = Math.floor(Math.random() * nahodne.length);
      var vyhra = (nahodne[vyhr])
      vyhra = 100
      message.channel.send(`Spinning... ${vyhra1}`).then(sentMessage => sentMessage.edit(`Spinning... ${vyhra2}`)).then(sentMessage => sentMessage.edit(`Spinning... ${vyhra3}`)).then(sentMessage => sentMessage.edit(`Spinning... ${vyhra4}`)).then(sentMessage => sentMessage.edit(`Spinning... ${vyhra5}`)).then(sentMessage => sentMessage.edit(`Výherní los je **${vyhra}**`))

      db_lotto_data.set(`time`, `${message.createdTimestamp}`).write()

      if ((db_lotto.get(`${vyhra}`).value()) != null)
      {
        var vyhrece = "<@" + db_lotto.get(`${vyhra}`).value() + ">"
        var prize = db_lotto_data.get(`prize`).value()
        db_coin.set(`${db_lotto.get(`${vyhra}`).value()}`, (db_coin.get(`${db_lotto.get(`${vyhra}`).value()}`).value() + prize)).write()
        
        const embed = new MessageEmbed()
        .setTitle("🥳Výhra🥳")
        .setDescription(`**${db_lotto_data.get(`prize`).value()}** coinů vyhrál **${"<@" + db_lotto.get(`${vyhra}`).value() + ">"}**`)
        .setColor(0x0ace24)
        setTimeout(function(){ message.channel.send({ embeds: [embed] }); }, 2000);
        setTimeout(function(){ db_lotto_data.set(`prize`, 100).write(); }, 1000);

        var ok = [` 
{ 
  "0": "574984880555819020"
}
        `]
        fs.writeFile('/home/pi/DiscordBot/src/lotto.json', ok.toString(), function (error) { 
          if (error) return console.log(error);  
        })
      }
      else
      {
        const embed = new MessageEmbed()
       .setTitle(`❌Tento los nikdo nemá!❌`)
       .setColor(0xbc0600)
        setTimeout(function(){ message.channel.send({ embeds: [embed] }); }, 2000);
      }
      }
      else
      {
        const embed = new MessageEmbed()
       .setTitle(`❌Losovat můžeš pouze jednou za 24 hodin!❌`)
       .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] })
      }
    }
    if (message.content.startsWith("qr "))
    {
      var text = message.content.substr("qr ".length)

      var qr_png = qr.image(`${text}`, { type: 'png' });
      qr_png.pipe(require('fs').createWriteStream('qr.png'));

      message.channel.send( { files: ["/home/pi/DiscordBot/src/qr.png"] });
    }
    if (message.content.startsWith("rob ") || message.content.startsWith("okrast "))
    {
      var mentioned = (message.mentions.members.first()).id;

      if ((db_rob.get(`${message.author.id}`).value()) == undefined || (message.createdTimestamp - db_rob.get(`${message.author.id}`).value()) > 3600000)
      {

        const vyhry = [
          10,
          20,
          30,
          40,
          50,
          60,
          70,
          80,
          90,
          100
          ]
          const vyhra = Math.floor(Math.random() * vyhry.length);
          var bonus = (vyhry[vyhra]) 
          console.log(bonus)

          if ((db_coin.get(`${mentioned}`).value()) == null || (db_coin.get(`${mentioned}`).value()) < bonus)
          {
            const embed = new MessageEmbed()
            .setTitle(`Nemá dostatek coinů!`)
            .setColor(0xbc0600)
            message.channel.send({ embeds: [embed] }); 
          }
          else
          {
            db_coin.set(`${message.author.id}`, (db_coin.get(`${message.author.id}`).value() + bonus)).write()
            console.log("gej2")
            db_coin.set(`${mentioned}`, (db_coin.get(`${mentioned}`).value() - bonus)).write()
            db_rob.set(`${message.author.id}`, message.createdTimestamp).write()

            var usermention = "<@" + mentioned + ">"

            const embed = new MessageEmbed()
            .setDescription(`Okradl jsi ${usermention} o ${bonus} coinů!`)
            .setColor(0x58be4a)
            message.channel.send({ embeds: [embed] });
          }
      }
      else
      {
        const embed = new MessageEmbed()
        .setTitle(`Okrádat můžeš jednou za hodinu!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
    }
    if (message.content === "rob" || message.content === "okrast")
    {
      const embed = new MessageEmbed()
        .setTitle(`Musíš někoho označit`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
    }
    if (message.content.startsWith("gametime"))
    {
      var hra = message.content.substr("gametime ".length); 

      db_gametime.set(`chyba`, 0).write()

      hltbService.search(`${hra}`).then(result => db_gametime.set(`id`, (result.find(element => element = `absolutne nevim co tohle dela`)).id).write()).catch(e => db_gametime.set(`chyba`, 1).write());

      setTimeout(function(){ console.log(db_gametime.get(`id`).value()) }, 2000)

      setTimeout(function(){  

        if (db_gametime.get(`chyba`).value() == 0)
        { 
          hltbService.detail(`${db_gametime.get(`id`).value()}`).then(result => 
            message.channel.send((new MessageEmbed().setTitle(`${result.name}`).addField("Hlavní příběh", `${result.gameplayMain} hodin`).addField("Hlavní příběh a vedlejšími úkoly", `${result.gameplayMainExtra} hodin`).addField("100%", `${result.gameplayCompletionist} hodin`).setColor(0x140fdf)))
          )
        }
        else
        {
          const embed = new MessageEmbed()
          .setTitle(`Špatně zadaný název hry!`)
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] });
        }

      }, 2000);
    }
    if (message.content === "randomgame")
    {
      const hry = [
        "Dead Space 2 (2011)", "Monkey Island 2: LeChuck's Revenge (1991)", "The Secret of Monkey Island: Special Edition (2009)", "Dune II: The Building of a Dynasty (1992)", "Need for Speed: Undercover (2008)", "Need for Speed: Hot Pursuit (2010)", "Loom (1990)", "MDK (1997)", "Age of Empires III (2005)", "RollerCoaster Tycoon 3 (2004)", "Battlefield 1943 (2009)", "Final Fantasy XIII (2009)", "Doom (1993)", "Duke Nukem Forever (2011)", "Lara Croft and the Guardian of Light (2010)", "World of Goo (2008)", "Tom Clancy's Rainbow Six: Vegas (2006)", "Grand Theft Auto V (2013)", "Donkey Kong (1994)", "Darksiders II (2012)", "Plants vs. Zombies (2009)", "Crash: Mind over Mutant (2008)", "Brothers: A Tale of Two Sons (2013)", "Tom Clancy's Ghost Recon Advanced Warfighter 2 (2007)", "XCOM: Enemy Unknown (2012)", "Deus Ex (2000)", "Need for Speed: Most Wanted (2005)", "Half-Life (1998)", "Hellgate: London (2007)", "Doom II: Hell on Earth (1994)", "Riven (1997)", "Fallout: New Vegas (2010)", "BioShock 2 (2010)", "Need for Speed: Carbon (2006)",
        "Myst (1993)", "The Sims 3 (2009)", "American McGee's Alice (2000)", "Total War: Shogun 2 (2011)", "Tom Clancy's Splinter Cell: Conviction (2010)", "Mirror's Edge (2008)", "New Super Mario Bros. (2006)", "Tomb Raider (2013)", "SimCity (2013)", "Darksiders (2010)", "Tom Clancy's Ghost Recon (2001)", "Ancestors Legacy (2018)", "Total War Atilla (2015)", "Cuphead (2017)", "Payday 2 (2013)", "theHunter: Call of the Wild (2017)", "Terraria (2011)", "Youtubers Life (2016)", "Poly Bridge (2016)", "Planet Coaster (2016)", "When Ski Lifts Go Wrong (2019)", "Portal 2 (2011)", "Cyberpunk 2077 (2020)", "For The King (2018)", "Skater XL (2020)", "Who's Your Daddy (2015)", "Mass Effect 2 (2010)", "Amnesia: The Dark Descent (2010)", "Battlefield: Bad Company 2 (2010)", "Red Dead Redemption (2010)", "Super Meat Boy (2010)", "Halo 3 (2007)", "Enter the Matrix (2003)", "Prison Architect (2015)", "Torchlight II (2012)", "Hotline Miami (2012)", "Killzone (2004)", "Mafia (2002)", "Batman: Arkham City (2011)", "Minecraft (2011)", "DiRT 3 (2011)", "Diablo III (2012)",
        "Lula 3D (2005)", "Ride To Hell: Retribution (2013)", "Big Rigs: Over The Road Racing (2003)", "American McGee's Bad Day LA (2006)", "Rambo: The Video Game (2014)", "Ninjabread Man (2005)", "Ghostrunner (2020)", "Women's Volleyball Championship (2008)", "Watch Dogs: Legion (2020)", "Super Seducer 2 - Advanced Seduction Tactics (2018)", "Super Seducer : How to Talk to Girls (2018)", "50 Cent: Blood on the Sand (2009)", "Harry Potter and the Deathly Hallows – Part 1: The Videogame (2010)", "Harry Potter and the Deathly Hallows – Part 2 (2011)", "Wii Sports (2006)", "Wii Sports Resort (2009)", "MadWorld (2009)", "Duke Nukem Forever (2011)", "Post Void (2020)", "GoldenEye 007 (1997)", "The Simpsons: Hit & Run (2003)", "The Simpsons Game (2007)", "Half-Life (1998)", "Hades (2020)", "Cyber Hook (2020)", "SpongeBob SquarePants: Battle for Bikini Bottom (2003)", "Hacknet (2015)", "Hell's Kitchen: The Game (2008)", "Marvel's Spider-Man (2018)", "Mike Tyson's Punch-Out!! (1987)"
      ]

      var hra = (hry[Math.floor(Math.random() * hry.length)]) 
      console.log(hra)

      var embed = new MessageEmbed()
        .setColor(0x140fdf)
        .setDescription(`Měl by jsi si zahrát **${hra}**`)
      message.channel.send({ embeds: [embed] });
    }
    /*if (message.content.includes("xd") && message.author.id === "339882189623918613" || message.content.includes("+") && message.author.id === "339882189623918613")
    {
      message.channel.bulkDelete(1)
    }*/
    /*if (message.content === "steam")
    {
      steam.resolve('https://steamcommunity.com/id/d3f4ult_cz/').then(id => {

        steam.getUserFriends(id).then(summary => {

          console.log(summary)

        });

      });

    }*/
    if (message.content.startsWith("navrh "))
    {
      var navrh = message.content.substr("navrh ".length); 

      fs.appendFile('/home/pi/DiscordBot/src/navrhy.txt', navrh + '\n', { replace: false, append: true }, function (error) { 
        if (error) return console.log(error);  
      })

      const embed = new MessageEmbed()
        .setDescription(`Návrh úspěšně odeslán!`)
        .setColor(0x58be4a)
      message.channel.send({ embeds: [embed] });
    }
    if (message.content.startsWith("btcwallet ")) {

      var adresa = message.content.substr("btcwallet ".length); 

      request({url: `https://mempool.space/api/address/${adresa}`, json: true}, function(err, res, json1) {
        if (err) {
          throw err;
        }
      
      request({url: `https://api.cryptonator.com/api/ticker/btc-usd`, json: true}, function(err, res, json2) {
      if (err) {
        throw err;
      }

      request({url: `https://api.coingecko.com/api/v3/exchange_rates`, json: true}, function(err, res, json3) {
        if (err) {
          throw err;
        }

      const embed = new MessageEmbed()
      .setTitle(`**Balance**`)
        .addField(`**BTC: **`, `**${(json1.chain_stats.funded_txo_sum - json1.chain_stats.spent_txo_sum) * 0.00000001}**`)
        .addField(`**USD: **`, `**${((json1.chain_stats.funded_txo_sum - json1.chain_stats.spent_txo_sum) * 0.00000001) * json2.ticker.price}**`)
        .addField(`**CZK: **`, `**${((json1.chain_stats.funded_txo_sum - json1.chain_stats.spent_txo_sum) * 0.00000001) * json3.rates.czk.value}**`)
        .setColor(0xFFD55E)
      message.channel.send({ embeds: [embed] });
      });
      });
      });
    }
    if (message.content === "bored") {
      request({url: `https://www.boredapi.com/api/activity`, json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
        const embed = new MessageEmbed()
        .setDescription(`You can **${json.activity}**`)
        .setColor(0x58be4a)
        message.channel.send({ embeds: [embed] });
      });
    }
    if (message.content === "btc") {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      request({url: `https://api.coingecko.com/api/v3/exchange_rates`, json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
        const embed = new MessageEmbed()
        .setTitle(`1 BTC = **${json.rates.usd.value} $**`)
        .setDescription(`1 BTC = **${json.rates.czk.value} CZK**`)
        .setColor(0xFFD55E)
        message.channel.send({ embeds: [embed] });
      });
      while (true) {
        try {
          request({url: `https://api.coingecko.com/api/v3/exchange_rates`, json: true}, function(err, res, json) {
            if (err) {
              throw err;
            }
            client.user.setActivity(`BTC: ${(json.rates.usd.value).toFixed(0)}$`, { type: "WATCHING" });
          });
        }
        catch { }
        await delay(60000)
      }
    }
    if (message.content === "čokl") {
      request({url: `https://dog.ceo/api/breeds/image/random`, json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
      const embed = new MessageEmbed()
      .setDescription(`**Random čokl**`)
      .setColor(0x58be4a)
      .setImage(`${json.message}`)
      message.channel.send({ embeds: [embed] });
      });
    }
    if (message.content.startsWith("geoip ")) {
      var ip = message.content.substr("geoip ".length);

      request({url: `https://freegeoip.app/json/${ip}`, json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }

        const embed = new MessageEmbed()
        .setDescription(`**${ip}**`)
        .setColor(0x58be4a)
        .addField(`Země: `, `${json.country_name}`)
        .addField(`Kraj: `, `${json.region_name}`)
        .addField(`Město: `, `${json.city}`)
        .addField(`PSČ: `, `${json.zip_code}`)
        message.channel.send({ embeds: [embed] });

      });
    }
    if (message.content.startsWith("name ")){
      var name = message.content.substr("name ".length);
      var ok = 1

      request({url: `https://api.genderize.io/?name=${name}`, json: true}, function(err, res, json1) {
        if (err) {
          ok == 2
          console.log("gej1")
        }
      
      request({url: `https://api.agify.io/?name=${name}`, json: true}, function(err, res, json2) {
       if (err) {
          ok == 2
          console.log("gej2")
        }

        if (ok === 1){
        const embed = new MessageEmbed()
        .setDescription(`**${name}**`)
        .setColor(0x58be4a)
        .addField(`Pohlaví: `, `${json1.gender} (pravděpodobnost: ${(json1.probability) * 100} %), počet ${json1.count}`)
        .addField(`Průměrný věk: `, `${json2.age}`)
        message.channel.send({ embeds: [embed] });
        }
        if (ok === 2) {
          const embed = new MessageEmbed()
          .setTitle(`Špatně zadané jméno!`)
          .setColor(0xbc0600)
          message.channel.send({ embeds: [embed] });
        }
      });
      });
    }
    if (message.content === "joke") {
      request({url: `https://official-joke-api.appspot.com/random_joke`, json: true}, function(err, res, json) {
       if (err) {
         throw err;
        }
        const embed = new MessageEmbed()
       .setTitle(`${json.setup}`)
       .setDescription(`${json.punchline}`)
       .setColor(0xffffff)
       .setFooter(`😹😹😹`)
        message.channel.send({ embeds: [embed] });
      });
    }
    if (message.content.startsWith("počasí ")) {
      var location = message.content.substr("počasí ".length);
      var ok = 1

      request({url: `https://goweather.herokuapp.com/weather/${location}`, json: true}, function(err, res, json) {
       if (err) {
          ok == 2
        }

      if (ok === 1) {
        const embed = new MessageEmbed()
        .setTitle(`**${location}**`)
        .setDescription(`**${json.description}**, teplota: **${json.temperature}**, větříček: **${json.wind}**`)
        .addField(`**Zítra:**`, `${json.forecast[0].temperature}, ${json.forecast[0].wind}`)
        .addField(`**Pozítří:**`, `${json.forecast[1].temperature}, ${json.forecast[1].wind}`)
        .setColor(0x8e7dea)
       message.channel.send({ embeds: [embed] });
      }
      if (ok === 2) {
        const embed = new MessageEmbed()
        .setTitle(`Špatně zadané město!`)
       .setColor(0xbc0600)
       message.channel.send({ embeds: [embed] });
      }
      });
    }
    if (message.content === "eviljoke") {
      request({url: `https://evilinsult.com/generate_insult.php?lang=en&type=json`, json: true}, function(err, res, json) {
       if (err) {
          ok == 2
        }
        const embed = new MessageEmbed()
        .setTitle(`${json.insult}`)
        .setColor(0xffffff)
        .setFooter(`💀💀💀`)
         message.channel.send({ embeds: [embed] });
      });
    }
    if (message.content.startsWith("textart ")) {
      var txt = message.content.substr("textart ".length);
      var delka = txt.length;
      if (delka > 20) {
        const content = "**Textart musí mít méně než 20 znaků**"
        const embed = new MessageEmbed()
        .setColor(0x940008)
        .setDescription(content)
        message.channel.send({ embeds: [embed] });
      }
      else { 
        request({url: `https://artii.herokuapp.com/make?text=${txt}&font=gothic`, json: true}, function(err, res, json) {
          if (err) {
            ok == 2
          }
          message.channel.send("```" + json + "```")
        });
      }
    }
    /*if (message.content.startsWith("novinky")) {
      var search = message.content.substr("novinky ".length);
      if (!search) { 
        request({url: `https://newsapi.org/v2/top-headlines?country=cz&apiKey=f6d2ffce4cab443baf0a31ef024f1780`, json: true}, function(err, res, json) {
            if (err) {
              ok == 2
            }
            message.channel.send(`${json.articles[0].url}`)
        });
      }
      else {
        request({url: `https://newsapi.org/v2/top-headlines?country=cz&q=${search}&apiKey=f6d2ffce4cab443baf0a31ef024f1780`, json: true}, function(err, res, json) {
            if (err) {
              ok == 2
            }
            if ((json.totalResults) !== 0) { message.channel.send(`${json.articles[0].url}`); }
            else {
              const content = "**Nenalezen žádný článek**"
              const embed = new MessageEmbed()
              .setColor(0x940008)
              .setDescription(content)
              message.channel.send({ embeds: [embed] });
            }
        });
      }
    }*/
    /*if (message.content.startsWith("piskvorky ") || message.content.startsWith("piškvorky ")) {
      hrac1 = message.author.id; //kolecka
      hrac2 = message.mentions.members.first().id; //krizky
      message.channel.send(`<@${hrac1}> má kolečka, <@${hrac2}> má křížky. \nZačíná <@${hrac1}>. \nNapř. A2, B3`)
      jedna = " "; 
      dva = " ";
      tri = " ";
      ctyri = " ";
      pet = " ";
      sest = " ";
      sedm = " "; 
      osm = " ";
      devet = " ";
      selected = [false,false,false,false,false,false,false,false,false];
  
  
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "A1") {
      selected[0] = true;
    if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      if (message.author.id === hrac1) { sedm = "O"; }
      if (message.author.id === hrac2) { sedm = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "A2") {
      selected[1] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { ctyri = "O"; }
      if (message.author.id === hrac2) { ctyri = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "A3") {
      selected[2] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { jedna = "O"; }
      if (message.author.id === hrac2) { jedna = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "B1") {
      selected[3] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { osm = "O"; }
      if (message.author.id === hrac2) { osm = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "B2") {
      selected[4] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { pet = "O"; }
      if (message.author.id === hrac2) { pet = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "B3") {
      selected[5] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { dva = "O"; }
      if (message.author.id === hrac2) { dva = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "C1") {
      selected[6] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { devet = "O"; }
      if (message.author.id === hrac2) { devet = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "C2") {
      selected[7] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { sest = "O"; }
      if (message.author.id === hrac2) { sest = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "C3") {
      selected[8] = true;
      if((selected[0]===true&&selected[1]===true&&selected[2]===true) || (selected[3]===true&&selected[4]===true&&selected[5]===true) || (selected[6]===true&&selected[7]===true&&selected[8]===true) || (selected[0]===true&&selected[3]===true&&selected[6]===true) || (selected[1]===true&&selected[4]===true&&selected[7]===true) || (selected[2]===true&&selected[5]===true&&selected[8]===true) || (selected[0]===true&&selected[4]===true&&selected[8]===true)|| (selected[2]===true&&selected[4]===true&&selected[6]===true)) { message.channel.send("Vyhrál jsi!"); }
      
      if (message.author.id === hrac1) { tri = "O"; }
      if (message.author.id === hrac2) { tri = "X"; }
      message.channel.send("```" + `    A  B  C \n  ╔═════════╗ \n1 ║ ${sedm}  ${osm}  ${devet} ║ \n2 ║ ${ctyri}  ${pet}  ${sest} ║ \n3 ║ ${jedna}  ${dva}  ${tri} ║ \n  ╚═════════╝` + "```")
    }
    if (message.content === "restart piškvorky" || message.content === "restart piskvorky") {
      message.channel.send("Piškvorky restartovány!")
      jedna = " "; 
      dva = " ";
      tri = " ";
      ctyri = " ";
      pet = " ";
      sest = " ";
      sedm = " "; 
      osm = " ";
      devet = " ";
      selected = [false,false,false,false,false,false,false,false,false];
    }
    if (message.content === "cc") {
      var kanal = client.channels.cache.find(channel => channel.id === "785584011853561956");

      kanal.send(`<@&842443904464322660>`).then(zprava => (client.channels.cache.find(channel => channel.id === "785584011853561956")).bulkDelete(1))

      setTimeout(function(){  

        const embed = new MessageEmbed()
        .setTitle(`Likehouse začíná za 5 minut 😮`)
        .setColor(0x6e30d8)
        .setImage("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsimkl.net%2Fposters%2F11%2F1128678035142708db_0.jpg&f=1&nofb=1")
        .setDescription("<@&842443904464322660>")
        .setFooter("Nastav si oznámení pomocí příkazu likehouse")
        kanal.send({ embeds: [embed] })

      }, 1000);      
    }
    if (message.content === "likehouse") {
      const likehouse_role = message.guild.roles.cache.get("842443904464322660");
      message.member.roles.add(likehouse_role).then(message.channel.send("Přidána role **Likehouse Notification**"));

      setTimeout(function(){ message.channel.bulkDelete(2); }, 2000);
    }*/
    if (message.content === "upload") {
      
    }
    if (message.content === "blur") {

      /*console.log(message.author.displayAvatarURL())

      const options = {
        url: `${message.author.displayAvatarURL()}`,
        dest: '/home/pi/DiscordBot/src'                // will be saved to /path/to/dest/image.jpg
      }
      
      download.image(options)
        .then(({ filename }) => {
          console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
        })
        .catch((err) => console.error(err))*/

      Jimp.read("/home/pi/DiscordBot/images/image.jpg", (err, image) => {
        if (err) throw err;
        image
          //.resize(1024, 1024) // resize
          .quality(100) // set JPEG quality
          .blur(50)
          //.greyscale()  // set greyscale
          .write('/home/pi/DiscordBot/images/image.jpg'); // save
      })
      .catch(err => {
        console.error(err);
      });
      
      setTimeout(function() {
        message.channel.send({ files: ["/home/pi/DiscordBot/images/image.jpg"]})
      }, 5000);

      /*const embed = new MessageEmbed()
        .setColor(0x6e30d8)
        .setImage("/home/pi/DiscordBot/src/image-new.jpg")
      message.channel.send({ embeds: [embed] })*/

    }
    if (message.content === "btcfees") {
      request({url: `https://api.cryptonator.com/api/ticker/btc-usd`, json: true}, function(err, res, json2) {
      if (err) {
        throw err;
      }

        request({url: `https://mempool.space/api/v1/fees/recommended`, json: true}, function(err, res, json) {
              if (err) {
                ok == 2
              }

              const embed = new MessageEmbed()
                .setTitle(`**Bitcoin Network Fees**`)
                .addField(`**Fastest: **`, `${json.fastestFee} sat/vB (${(json.fastestFee * ((json2.ticker.price * 0.00000001) * 140)).toFixed(2)} $)`)
                .addField(`**High priority: **`, `${json.halfHourFee} sat/vB (${(json.halfHourFee * ((json2.ticker.price * 0.00000001) * 140)).toFixed(2)} $)`)
                .addField(`**Medium priority: **`, `${json.hourFee} sat/vB (${(json.hourFee * ((json2.ticker.price * 0.00000001) * 140)).toFixed(2)} $)`)
                .addField(`**Low priority: **`, `${json.minimumFee} sat/vB (${(json.minimumFee * ((json2.ticker.price * 0.00000001) * 140)).toFixed(2)} $)`)
                .setColor(0xFFD55E)
              message.channel.send({ embeds: [embed] });

              console.log(json2)
          })
      })
    }
    if (message.content.startsWith("astro ")) {
      var sign = message.content.substr("astro ".length);  

      aztroJs.getTodaysHoroscope(sign, function(res) {
        console.log(res)

        const embed = new MessageEmbed()
          .setColor(0x1d2ae8)
          .setTitle(`**${sign}**`)
          .addField(`**Lucky number: **`, `${res.lucky_number}`)
          .addField(`**Lucky time: **`, `${res.lucky_time}`)
          .addField(`**Compatibility: **`, `${res.compatibility}`)
          .addField(`**Mood: **`, `${res.mood}`)
          .addField(`**Color: **`, `${res.color}`)
          .setFooter(`${res.description}`)
        message.channel.send({ embeds: [embed] });
      })
    }
    if (message.content === "astro") {
      const embed = new MessageEmbed()
          .setColor(0x1d2ae8)
          .setDescription("Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces")
        message.channel.send({ embeds: [embed] });
    }
    if (message.content === "ludixcoins") {
      const db_discord_connection = new Database("/home/pi/DiscordBot/src/LudixCoinDatabase/discord_connection.json", {
        snapshots: {
            enabled: false,
            folder: './backups/'
        }
      });
      if (db_discord_connection.get(message.author.id) === undefined) {
        const embed = new MessageEmbed()
        .setTitle(`S tvým discord ID není propojená žádná peněženka!`)
        .setColor(0xbc0600)
        message.channel.send({ embeds: [embed] }); 
      }
      else {
        const db_wallets_balance = new Database("/home/pi/DiscordBot/src/LudixCoinDatabase/wallets_balance.json", {
          snapshots: {
              enabled: false,
              folder: './backups/'
          }
        });

        nazev_wallet = db_discord_connection.get(message.author.id)
        console.log(nazev_wallet)
        stav_penezenky = db_wallets_balance.get(nazev_wallet)
        console.log(stav_penezenky)

        const embed = new MessageEmbed()
        .setTitle(`Stav tvojí ludixcoin peněženky je: **${stav_penezenky}**`)
        .setColor(0x58be4a)
        message.channel.send({ embeds: [embed] });
      }
    }
    if (message.content === "ludixcoin") {
      const embed = new MessageEmbed()
      .setColor(0x5723f3)
      .setTitle(`**LudixCoin**`)
      .setImage('https://cdn.discordapp.com/attachments/785584011853561956/877216828353548328/ludixcoin.png')
      .setDescription("Coming Soon, Stay Tuned, Stay Tusy")
      message.channel.send({ embeds: [embed] });
    }
    if (message.content.includes("midget") || message.content.includes("Midget")) {
      const embed = new MessageEmbed()
      .setColor(0x5723f3)
      .setTitle(`**MidgetEmpire**`)
      .setImage('https://cdn.discordapp.com/attachments/785584011853561956/905854851353829377/midgetempire_logo.png')
      .setDescription("Chcete být u něčeho nového? Představujeme vám MidgetEmpire, nejrevolučnější věc od vynalezení kola, matematiky, a pervitinu.")
      .setURL('http://midgetempire.jecool.net/')
      message.channel.send({ embeds: [embed] });
    }
    if (message.content === "cow") {
      var cislo_kravy = Math.floor(Math.random() * 400);
      message.channel.send("```" + cows()[cislo_kravy] + "```");
    }
    if (message.content.startsWith("zpoved ")) {
      var zpoved = message.content.substr("zpoved ".length);
      console.log(zpoved)

      var receiver = Math.floor(Math.random() * avaible_users.length);
      console.log("mrdam mamu: " + avaible_users[0])

      db_zpovednice.set(`${(db_zpovednice.get("count")+1)}`, [ `${message.author.id}`, `${zpoved}`, `${avaible_users[receiver]}` ])
      db_zpovednice.set(`count`, db_zpovednice.get("count")+1)

  //    console.log(message.mentions.members.first().id)
      var receiver_sweg = client.users.cache.get(avaible_users[0]);
      receiver_sweg.send("sweg")
      
    }
    if (message.content === "konipele") {
      db_zpovednice.push(`${message.author.id}`, "ano");
    }
    if(message.content === "test") {

      console.log(db_zpovednice.all())
    }
});

client.login(token.token);