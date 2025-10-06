import { Schema, mongoose } from 'mongoose'


// simple user schema for creating user...
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;