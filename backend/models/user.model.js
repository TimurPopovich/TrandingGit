const { Schema, model, pluralize } = require('mongoose');
pluralize(null);

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  interes: [{ type: Object }],
  token: {
    type: String
  },
})

const User = model('user', userSchema);
module.exports = User;
