import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Added email field if used in register
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Ensure this is a string and not a buffer
    if (typeof this.password === "string") {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
