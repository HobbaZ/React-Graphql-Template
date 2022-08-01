const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Schema to create a course model
const userSchema = new Schema(
  {  
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'A valid email address is required']
      },

      password: {
        type: String,
        required: true,
        minlength: 8,
      },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Check for duplicate username or email in signup, show relevant errors depending if username or email already in db
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    if (error.keyValue.username) {
    next(new Error(`The username ${error.keyValue.username} is already in use`));
    } else {
      next(new Error(`The email ${error.keyValue.email} is already in use`));
    }
  } else {
    next();
  }
});

// Check for duplicate username or email in update, show relevant errors depending if username or email already in db
userSchema.post('update', function(error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    if (error.keyValue.username) {
      next(new Error(`The username ${error.keyValue.username} is already in use`));
      } else {
        next(new Error(`The email ${error.keyValue.email} is already in use`));
      }
  } else {
    next();
  }
});

// hash user password
userSchema.pre('save', async function (next) {

  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  };

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;