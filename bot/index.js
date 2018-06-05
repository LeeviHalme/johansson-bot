// Require Dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');

// Require config
var config = require('./config.json');

// Set scheduling rule for every friday
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 5;
rule.hour = 20;

// Login handler
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set bot activity
    client.user.setActivity(`!komennot`);

    // Send welcome message
    client.channels.get("308641346049015809").send("Käynnistyn uudelleen T: Eelis Johansson");    

    // Set scheduling for every friday
    var j = schedule.scheduleJob(rule, function(){
        client.channels.get("308641346049015809").send("@everyone PERJANTAIII!");
    });
});

// Message handler
client.on('message', async msg => {
    // Ignore other bots
    if(msg.author.bot) return;

    // Ignore messages without prefix
    if(msg.content.indexOf(config.prefix) !== 0) {
        if(msg.content.toLowerCase().indexOf("kui") !== -1 || msg.content.toLowerCase().indexOf("mitä sä selität") !== -1) {
            msg.channel.send(config.jaakko_kuvat[Math.floor(Math.random()*config.jaakko_kuvat.length)]);
        } else {
            return;
        }
    }

    // Seperate command and arguments
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        if(msg.author.id === "231490084627546123"){
            // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
            // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
            const m = await msg.channel.send("Pinging...");
            m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        } else {
            msg.channel.send("Vittu älkää rikkoko bottii");
        }
    } else if(command === "quote") {
        if(args.length > 0) {
            if(args[0] === "eelis") {
                msg.channel.send(config.quotes.eelis[Math.floor(Math.random()*config.quotes.eelis.length)]);
            } else if(args[0] === "joonas") {
                msg.channel.send(config.quotes.joonas[Math.floor(Math.random()*config.quotes.joonas.length)]);
            }
        } else if(args.length > 1) {
            msg.channel.send("`!quote <eelis|joonas>`");
        } else {
            msg.channel.send("`!quote <eelis|joonas>`");
        }
    } else if(command === "onko") {
        if(args.length > 0) {
            var randomBoolean = Math.random() >= 0.5;
            var argOne = args[0];
            delete args[0];
            if(randomBoolean) {
                msg.channel.send("NO TOTTA VITUSSA "+argOne+" ON"+args.join(" "));
            } else {
                msg.channel.send("Tervveee, "+argOne+" ei oo"+args.join(" "));
            }
        } else {
            msg.channel.send("`!onko <henkilö> <kysymys>`");
        }
    } else if(command === "päätä") {
        var randomBoolean = Math.random() >= 0.5;

        if(randomBoolean) {
            msg.channel.send("Joo.");
        } else {
            msg.channel.send("Ei.");
        }
    } else if(command === "waduhek") {
        msg.channel.send("Dame tu cosita ah ah\nDame tu cosita ah, ay\nDame tu cosita ah ah\nDame tu cosita ah, ay\n\nDame tu cosita ah ah\nDame tu cosita ah, ay\nDame tu cosita ah ah\nMuévete para aquí, muévete para allá\n\nDame tu cosita (ay toma, cosita, cosita, cosita)\nDame tu cosita (ay toma, cosita, pure energy)\nDame tu cosita (ay toma, cosita, cosita, cosita)\nDame tu cosita (ay toma, cosita, cosita, cosita)\n\nDame tu cosita ah ah\nDame tu cosita ah, ay\nDame tu cosita ah ah\nDame tu cosita ah, ay\n\nDame tu cosita ah ah\nDame tu cosita ah, ay\nDame tu cosita ah ah\nMuévete para aquí, muévete para allá\n\nDame tu cosita (ay toma, cosita, cosita, cosita)\nDame tu cosita (ay toma, cosita, pure energy)\nDame tu cosita (ay toma, cosita, cosita, cosita)\nDame tu cosita (ay toma, cosita, cosita, cosita)\n\nDame tu cosita ah ah\nDame tu cosita ah, ay\nDame tu cosita ah ah\nDame tu cosita ah, ay\n\nDame tu cosita ah ah\nDame tu cosita ah, ay\nDame tu cosita ah ah\nMuévete para aquí, muévete para allá\n\nDame tu cosita (ay toma, cosita, cosita, cosita)\nDame tu cosita (ay toma, cosita, pure energy)\nDame tu cosita (ay toma, cosita, cosita, cosita)\nDame tu cosita (ay toma, cosita, eh)");
    } else if(command === "eelis") {
        msg.channel.send("*Eelis Johanssonin syntymäpäivä on 5.6.2002*");
    } else if(command === "komennot") {
        // Commands info
        msg.channel.send("```Komennot:\n!ping - Kertoo vittu viiveen\n!quote <eelis|joonas> - Kertoo random quoten\n!onko <henkilö> <kysymys> - Kertoo oikean vastauksen\n!päätä - Päättää kyllä tai ei.\n!waduhek - Dame tu cosita\n!eelis - Kertoo Eelis Johanssonin syntymäpäivän.```");
    } else {
        msg.channel.send("`Tuntematon komento!`");
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Moi ${member}! T: Eelis Johansson`);
});

// Create an event listener for guild members leaving
client.on('guildMemberRemove', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`HEIHEI ${member}! T: Eelis Johansson`);
});

// Log in the bot
client.login(config.token);
