"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import EmployeeForm from "../../components/EmployeeForm";

export default function NewEmployee() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
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
        setError(data.message || "Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Add New Employee
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
        <EmployeeForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
