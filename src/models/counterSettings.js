const mongoose = require('mongoose');
const CounterSettingsSchema = new mongoose.Schema({
  channel_id: String,
  counter_react_emoji: String,
  counter_breaker_role_name: String,
  counter_miscount_message: String,
  counter_double_count_message: String,
  count: Number,
  last_counter_id: String,
  last_count_breaker_id: String
});

module.exports = mongoose.model("CounterSettings", CounterSettingsSchema);