import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: Date, required: true },
});

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
