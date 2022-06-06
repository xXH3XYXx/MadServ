const mongoose = require('mongoose');
const CountdownSettingsSchema = new mongoose.Schema({
  guild_id: String,
  user_id: String,
  name: String,
  date: String
});

module.exports = mongoose.model("CountdownSettings", CountdownSettingsSchema);
