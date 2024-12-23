import TopNav from "./TopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faQuestionCircle, faEnvelope, faFilter, faBell } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../supabase";
import AddStudentForm from "./AddStudentForm";
import UpdateStudentModal from "./UpdateStudentModal";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [cohortFilter, setCohortFilter] = useState(""); 
    const [classFilter, setClassFilter] = useState(""); 
    const [searchQuery, setSearchQuery] = useState(""); 
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

            if (searchQuery) {
                query = query.ilike("name", `%${searchQuery}%`); 
            }

            const { data } = await query;
            setStudents(data || []);
        };

        fetchStudents();
    }, [cohortFilter, classFilter, searchQuery]);


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
        <div className="min-h-screen" style={{ backgroundColor: "#f2f7f4" }}>
            <div className="flex justify-between items-center p-4">
            
                <div className="flex items-center border rounded-lg w-full max-w-3xl p-2 bg-white">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 mr-2 text-lg" />
                    <input
                        type="text"
                        placeholder="Search by student name"
                        className="w-full focus:outline-none rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

             
                <div className="flex items-center space-x-6 ml-4">
                    
                    <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-gray-500 cursor-pointer text-3xl"
                            title="Help"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                            />
                        </svg>
                    </div>

                    
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-gray-500 cursor-pointer text-3xl"
                            title="Messages"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                            />
                        </svg>
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </div>

                    <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-gray-500 cursor-pointer text-3xl"
                            title="Filter"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                            />
                        </svg>
                    </div>

                   
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-gray-500 cursor-pointer text-3xl"
                            title="Notifications"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
                    </div>
                </div>


                <div className="flex items-center space-x-2">
                    <img
                        src="assets/images/profile.png"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                    />
                    <div className="hidden md:flex md:flex-col md:items-end">
                        <span className="text-gray-700 font-medium">Adeline H. Dancy</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="bg-white rounded-lg">
                    <div className="flex justify-between items-center mb-4 mx-2 py-3">
                        <div className="flex space-x-4">
                            <select
                                className=" border border-gray-400 p-2 rounded" style={{backgroundColor:'white'}}
                                value={cohortFilter}
                                onChange={(e) => setCohortFilter(e.target.value)}
                            >
                                <option value="">All Cohorts</option>
                                <option value="AY 2024-2025">AY 2024-2025</option>
                                <option value="AY 2023-2024">AY 2023-2024</option>
                            </select>
                            <select
                                className=" border border-gray-400 p-2 rounded" style={{ backgroundColor: 'white' }}
                                value={classFilter}
                                onChange={(e) => setClassFilter(e.target.value)}
                            >
                                <option value="">All Classes</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                            </select>
                        </div>

                        <button
                            className="text-white px-4 py-2 rounded border border-gray-500" style={{backgroundColor:'black'}}
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
                                onSubmit={handleSubmit}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
