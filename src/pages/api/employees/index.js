import dbConnect from "../../../lib/dbConnect";
import Employee from "../../../models/Employee";
import { authenticateToken } from "../../../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    case "POST":
      try {
        authenticateToken(req, res, async () => {
          const employee = new Employee(req.body);
          await employee.save();
          res.status(201).json(employee);
        });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
