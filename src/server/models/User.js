const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  uniqueId: {
    type: String,
    unique: true,
  },
  survivorDetails: new Schema({
    survivorName: {
      type: String,
      required: true,
    },
    survivorLocation: {
      type: String,
      required: true,
    },
  }),
});

UserSchema.pre("save", async function (next) {
  const user = this;
  // Generate a unique id for the user, and make sure it's unique.
  const uniqueId = Math.round(Math.random() * 100000000000000); // 16 digits long
  const found = await UserModel.findOne({ uniqueId });
  if (!found) {
    user.uniqueId = uniqueId;
  }
  // Hash the password before saving the user model
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = await UserModel.findOne({ username: this.username }).select("+password").exec();
  console.log(user);
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
