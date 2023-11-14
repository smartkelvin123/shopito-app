const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be up to 6 characters"],
      //   maxLength: [23, "Password must not be more than 23 characters"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: [true],
      default: "customer",
      enum: ["customer", "admin"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: Object,
      // address, state, country
    },
    // wishlist: [{ type: ObjectId, ref: "Product" }],
    // balance: {
    //   type: Number,
    //   default: 0,
    // },
    // cartItems: {
    //   type: [Object],
    // },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // stripeCustomerId: {
    //   type: String,
    //   // required: true,
    // },
  },
  {
    timestamps: true,
  }
);

// encrypt password before savin to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // this.password = hashedpassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports.User = mongoose.model("User", userSchema);
