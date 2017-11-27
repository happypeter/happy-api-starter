var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema(
  {
    username: { type: String, maxlength: 18 },
    password: String,
    avatar: String,
    followings: [{ type: ObjectId, ref: 'User' }]
  },
  { timestamps:true }
)

UserSchema.methods = {
  comparePassword: (_password, cb) => {
    // TODO: bcrypt here
      let isMatch = false
      if(this.password === _password) {
        isMatch = true
      }
      cb(null, isMatch);
  }
}

module.exports = mongoose.model('User', UserSchema);
