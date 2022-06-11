const { MessageEmbed } = require('discord.js');

module.exports = (weatherArray) => {
  const curDate = new Date();
  weatherEmbeds = [];
  weatherArray.forEach(weather => {
    let currentDay = weather.forecast.find(curDay => curDate.toDateString().indexOf(curDay.shortday) > -1);
    weatherEmbeds.push(new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Weather in ${weather.location.name}`)
      .setThumbnail(weather.current.imageUrl)
      .addFields({ name: 'Temperature', value: `${weather.current.temperature}°${weather.location.degreetype}` },
        { name: 'Feels Like', value: `${weather.current.feelslike}°${weather.location.degreetype}`, inline: true },
        { name: 'Low / High', value: `${currentDay.low}°${weather.location.degreetype} / ${currentDay.high}°${weather.location.degreetype}`, inline: true },
        { name: 'Sky', value: weather.current.skytext, inline: true },
        { name: 'Wind', value: weather.current.winddisplay, inline: true },
        { name: 'Humidity', value: `${weather.current.humidity}%`, inline: true },
        { name: 'Precip', value: `${currentDay.precip || '0'}%`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Brought to you by TinyGnomeBot', iconURL: 'https://i.imgur.com/e1PA1UD.png' })
    );
  });

  return weatherEmbeds
};
