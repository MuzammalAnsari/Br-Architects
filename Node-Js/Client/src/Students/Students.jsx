import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from 'react-icons/fa';

const formDataInitialState = {
  firstName: "",
  lastName: "",
  age: 0,
  courses: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
};

function Students() {
  const [studentsData, setStudentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(formDataInitialState);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/students")
      .then((response) => {
        setStudentsData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDelete = (studentId) => {
    axios
      .delete("http://localhost:8000/deleteStudent/" + studentId)
      .then((response) => {
        const updatedData = studentsData.filter((student) => student._id !== studentId);
        setStudentsData(updatedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEdit = (student, index) => {
    setStudentData(student);
    setIsUpdate(true);
  };

  const handleUpdate = () => {
    setIsSaving(true);
    axios.put("http://localhost:8000/updateStudent/" + studentData._id, studentData)
      .then((response) => {
        const updatedData = studentsData.map((student) =>
          student._id === studentData._id ? studentData : student
        );
        setStudentsData(updatedData);
        setStudentData(formDataInitialState);
        setIsUpdate(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    setIsSaving(true);
    axios.post("http://localhost:8000/createStudent", studentData)
      .then((response) => {
        console.log("Create user response:", response.data);
        setStudentsData([...studentsData, response.data]);
        setStudentData(formDataInitialState);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };


  return (
    <div className="container mx-auto p-4">
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Student Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <input
              type="text"
              placeholder="First Name"
              value={studentData.firstName}
              onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Last Name"
              value={studentData.lastName}
              onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              placeholder="Age"
              value={studentData.age}
              onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Courses (comma-separated)"
              value={studentData.courses}
              onChange={(e) => setStudentData({ ...studentData, courses: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Street"
              value={studentData.address.street}
              onChange={(e) => setStudentData({ ...studentData, address: { ...studentData.address, street: e.target.value } })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-center my-3">
          {isSaving ? (
            <button className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed opacity-50">
              Saving...
            </button>
          ) : (
            <>
              {isUpdate ? (
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleUpdate}>
                  Update User
                </button>
              ) : (
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleCreateUser}>
                  Create User
                </button>
              )}
            </>
          )}
        </div>

      </div>
      <h2 className="text-xl font-bold mb-4">Student Data</h2>
      <div className="grid grid-cols-7 gap-4">
        <div className="text-center font-bold">ID</div>
        <div className="text-center font-bold">First Name</div>
        <div className="text-center font-bold">Last Name</div>
        <div className="text-center font-bold">Age</div>
        <div className="text-center font-bold">Courses</div>
        <div className="text-center font-bold">Address</div>
        <div className="text-center font-bold">Actions</div>
      </div>
      {isLoading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        studentsData.map((student, index) => (
          <div className="grid grid-cols-7 gap-4 mt-2" key={student._id}>
            <div className="text-center">{student._id}</div>
            <div className="text-center">{student.firstName}</div>
            <div className="text-center">{student.lastName}</div>
            <div className="text-center">{student.age}</div>
            <div className="text-center">{student.courses.join(", ")}</div>
            <div className="text-center">
              {`${student.address.street}, ${student.address.city}, ${student.address.state}, zip: ${student.address.zip}`}
            </div>
            <div className="flex justify-center items-center">
              <FaTrash
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(student._id)}
              />
              <FaEdit
                className="cursor-pointer text-blue-500 ms-2"
                onClick={() => handleEdit(student, index)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Students;
