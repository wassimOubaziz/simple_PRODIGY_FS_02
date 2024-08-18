import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import EmployeeForm from "../../components/EmployeeForm";

export default function EditEmployee() {
  const router = useRouter();
  const { id } = router.query; // Access route parameters using router.query

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`/api/employees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
      } else {
        setError("Failed to fetch employee data");
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      setError("An unexpected error occurred");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("An unexpected error occurred");
    }
  };

  if (!employee) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Employee
        </h1>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <EmployeeForm employee={employee} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
