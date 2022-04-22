const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./config.json');

var statustring = "Bağlantı hatası!";
var request = require('request');
var mcIP = process.env.ip; // Sunucunun İp Adresi

var url = 'http://mcapi.tc/?' + mcIP + '/json';

function update() {
  /*seconds = seconds + 1;
  secondsString = seconds.toString();
  client.user.setActivity(secondsString, { type: 'Playing' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);*/
  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
          //return message.reply('Minecraft sunucusu durumu alınırken hata oluştu...');
      }
      body = JSON.parse(body);
      var status = ' ' + body.players + " Kişi FireGamerzs";
      console.log(body.description);
      if(body.players) {
          if((body.description=="&cWe are under maintenance.")||(body.players>=body.max_players)){
            client.user.setStatus('dnd')
            //.then(console.log)
            .catch(console.error);
          }else{
            client.user.setStatus('dnd')
            //.then(console.log)
            .catch(console.error);
          }
            if(body.players) {
                status = ' ' + body.players + " Kişi FireGamerzs";
                client.channels.get(`638776673281769502`).setName('• Aktif: '+ body.players + '/'+ body.max_players);
              } else {
                status = ' 0/' + body.max_players;
                client.channels.get(`638776673281769502`).setName('• Aktif: '+ 0 + '/'+ body.max_players);
        }
      } else {
        client.user.setStatus('dnd')
        //.then(console.log)
        .catch(console.error);
      }
      client.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);
  }); 
}

client.on("ready", () => {
  console.log(mcIP);
  client.setInterval(update,30000);
})

client.login(process.env.token);