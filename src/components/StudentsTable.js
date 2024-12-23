import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import AddStudentForm from "./AddStudentForm";
import UpdateStudentModal from "./UpdateStudentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const [cohortFilter, setCohortFilter] = useState(""); 
    const [classFilter, setClassFilter] = useState("");
    const [showModal, setShowModal] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);
    const [editStudent, setEditStudent] = useState(null); 
    const [activeRow, setActiveRow] = useState(null); 


    useEffect(() => {
        const fetchStudents = async () => {
            let query = supabase.from("students").select("*");

            if (cohortFilter) {
                query = query.eq("cohort", cohortFilter);
            }

           
            if (classFilter) {
                query = query.eq("student_class", classFilter);
            }

            const { data } = await query;
            setStudents(data || []);
        };

        fetchStudents();
    }, [cohortFilter, classFilter]);

 
    const handleAddStudent = async (student) => {
        try {
            const { data, error } = await supabase.from("students").insert([student]);

            if (error) {
                console.error("Error adding student:", error.message);
                return;
            }

            if (data && data.length > 0) {
                setStudents([...students, data[0]]); 
            }

            console.log("Student added successfully!");
            setShowModal(false);
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };


    const updateStudent = async (student) => {
        try {
            const { id, ...updateData } = student; 
            if (!id) {
                console.error("Error: Student ID is missing.");
                return;
            }

            const { error } = await supabase
                .from("students")
                .update(updateData)
                .eq("id", id);

            if (error) {
                console.error("Error updating student:", error.message);
                return;
            }

            
            setStudents((prev) =>
                prev.map((s) => (s.id === id ? { ...s, ...updateData } : s))
            );

            console.log("Student updated successfully!");
            setShowModal(false); 
            setIsEditing(false); 
            setEditStudent(null); 
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                const { error } = await supabase.from("students").delete().eq("id", id);

                if (error) {
                    console.error("Error deleting student:", error.message);
                    return;
                }

                setStudents((prev) => prev.filter((s) => s.id !== id));
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        }
    };

   
    const handleSubmit = (student) => {
        if (isEditing) {
            updateStudent(student); 
        } else {
            handleAddStudent(student); 
        }

        setShowModal(false); 
        setIsEditing(false); 
        setEditStudent(null);
    };

    return (
        <div className="bg-white">
            <div className="flex justify-between items-center mb-4 mx-2 py-3">
                <div className="flex space-x-4">
                    <select
                        className="bg-gray-300 border border-gray-400 p-2 rounded"
                        value={cohortFilter}
                        onChange={(e) => setCohortFilter(e.target.value)}
                    >
                        <option value="">All Cohorts</option>
                        <option value="AY 2024-2025">AY 2024-2025</option>
                        <option value="AY 2023-2024">AY 2023-2024</option>
                    </select>
                    <select
                        className="bg-gray-300 border border-gray-400 p-2 rounded"
                        value={classFilter}
                        onChange={(e) => setClassFilter(e.target.value)}
                    >
                        <option value="">All Classes</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                    </select>
                </div>

                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded border border-gray-500"
                    onClick={() => {
                        setShowModal(true);
                        setIsEditing(false);
                        setEditStudent(null);
                    }}
                >
                    + Add New Student
                </button>
            </div>

           
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-2 text-sm">Student Name</th>
                        <th className="p-2 text-sm">Cohort</th>
                        <th className="p-2 text-sm">Courses</th>
                        <th className="p-2 text-sm">Date Joined</th>
                        <th className="p-2 text-sm">Last Login</th>
                        <th className="p-2 text-sm">Status</th>
                    </tr>
                    <td colSpan="6" className="text-center">
                        <div className="w-[95%] mx-auto border-b border-gray-300"></div>
                    </td>
                </thead>
                <tbody className="text-center">
                    {students.map((s, i) => (
                        <React.Fragment key={s.id}>
                            <tr
                                className="relative"
                                onClick={() => setActiveRow(activeRow === i ? null : i)}
                            >
                                <td className="p-2">{s.name}</td>
                                <td className="p-2">{s.cohort}</td>
                                <td className="p-2">
                                    <div className="flex flex-wrap gap-2">
                                        {s.courses &&
                                            JSON.parse(s.courses).map((subject, idx) => (
                                                <button
                                                    key={idx}
                                                    className="flex items-center gap-2 px-3 py-2 text-xs bg-gray-100 border rounded shadow-sm hover:bg-gray-200"
                                                >
                                                    <img
                                                        src="assets/images/image.png"
                                                        alt="Course"
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    <span>{`CBSE ${s.student_class} ${subject}`}</span>
                                                </button>
                                            ))}
                                    </div>
                                </td>
                                <td className="p-2">
                                    {s.date_joined
                                        ? new Date(s.date_joined).toLocaleString("en-US", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : ""}
                                </td>
                                <td className="p-2">
                                    {s.last_login
                                        ? new Date(s.last_login).toLocaleString("en-US", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })
                                        : "Never"}
                                </td>
                                <td className="p-2 flex justify-center items-center">
                                    <div
                                        className={`w-3 h-3 rounded-full ${s.status ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    />
                                </td>

                               
                                {activeRow === i && (
                                    <div className="absolute inset-0 flex justify-center items-center bg-white/70">
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="text-blue-600 mx-2 cursor-pointer"
                                            onClick={() => {
                                                setEditStudent(s);
                                                setIsEditing(true);
                                                setShowModal(true);
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-red-600 mx-2 cursor-pointer"
                                            onClick={() => handleDeleteStudent(s.id)}
                                        />
                                    </div>
                                )}
                            </tr>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <div className="w-[95%] mx-auto border-b border-gray-300"></div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

          
            {showModal && (
                isEditing ? (
                    <UpdateStudentModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        student={editStudent}
                        onUpdate={updateStudent} 
                    />
                ) : (
                    <AddStudentForm
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        onAdd={handleAddStudent} 
                    />
                )
            )}
        </div>
    );
};

export default StudentsTable;
