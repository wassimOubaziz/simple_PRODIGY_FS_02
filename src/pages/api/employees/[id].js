import dbConnect from "../../../lib/dbConnect";
import Employee from "../../../models/Employee";
import { authenticateToken } from "../../../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    case "PUT":
      try {
        authenticateToken(req, res, async () => {
          const employee = await Employee.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
          }
          res.status(200).json(employee);
        });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    case "DELETE":
      try {
        authenticateToken(req, res, async () => {
          const employee = await Employee.findByIdAndDelete(id);
          if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
          }
          res.status(200).json({ message: "Employee deleted successfully" });
        });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
