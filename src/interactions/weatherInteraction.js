const weather = require('weather-js');
const WeatherEmbed = require('../workers/weather');

module.exports = {
  search: (interaction) => {
    const degreeType = interaction.options.getString('degree_type') || 'F';
    const locationName = interaction.options.getString('location_name');
    const zipCode = interaction.options.getInteger('zip_code');
    const search = locationName || zipCode;
    if (!search) {
      interaction.reply({ content: 'You need to provide a location name or a zip code', ephemeral: true });
      return;
    }
    console.log(`Location: ${locationName} - Zip ${zipCode} - Degree ${degreeType}`);
    weather.find({ search , degreeType }, (err, result) => {
      if (err) {
        console.log(err);
        interaction.reply({ content: 'An error occured while searching for the weather', ephemeral: true });
        return;
      }

      interaction.reply({ embeds: WeatherEmbed(result) });
    });
  }
}
