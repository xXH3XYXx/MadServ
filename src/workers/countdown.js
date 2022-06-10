const CountdownSettings = require('../models/countdownSettings');

module.exports = (msg, name) => {
  const GUILD_ID = msg.guildId;

  CountdownSettings.find({ guild_id: GUILD_ID, name }, (err, countdowns) => {
    if (err) {
      console.log(err);
      interaction.reply('An error occurred while trying to add the countdown!');
      return;
    }
    let daysToGoMessage = `Found the following countdowns with the name ${name}\n`;
    for (let c = 0; c < countdowns.length; c++) {
      const DATE = countdowns[c].date;
      const dateValues = DATE.split('/');
      const today = new Date();
      const futureDate = new Date();
      let daysToGo = 0;

      if (dateValues.length !== 3) {
        msg.reply('There was a problem with reading one of the saved dates! Please try adding a new countdown');
        break;
      }
      futureDate.setMonth(parseInt(dateValues[0] - 1, 10));
      futureDate.setDate(parseInt(dateValues[1], 10));
      futureDate.setFullYear(parseInt(dateValues[2], 10));
      daysToGo = Math.ceil((futureDate.getTime() - today.getTime()) / 1000 / 60 / 60 / 24);
      if (daysToGo < 0) {
        daysToGoMessage = daysToGoMessage.concat(
          ` ${daysToGo * -1} days since ${countdowns[c].date}`,
          ` created by <@${countdowns[c].user_id}>`,
          c === countdowns.length - 1 ? `\n` : ''
        );
      }
      else {
      daysToGoMessage = daysToGoMessage.concat(
        ` ${daysToGo} days until ${countdowns[c].date}`,
        ` created by <@${countdowns[c].user_id}>`,
        c === countdowns.length - 1 ? `\n` : ''
      );
      }
    }
    if (countdowns.length > 0) {
      msg.reply(daysToGoMessage);
    }
    else {
      msg.reply(`No countdown found for ${name}`);
    }
  });
}
