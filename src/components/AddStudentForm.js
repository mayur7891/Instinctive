import React, { useState } from "react";

const AddStudentForm = ({ onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const [cohort, setCohort] = useState("AY 2024-2025");
    const [courses, setCourses] = useState([]);
    const [date_joined, setDateJoined] = useState("");
    const [status, setStatus] = useState("Online");
    const [student_class, setStudentClass] = useState("9");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !cohort || courses.length === 0 || !date_joined || !status || !student_class) {
            setError("All fields are required.");
            return;
        }

        const newStudent = {
            name,
            cohort,
            courses,
            date_joined,
            status: status === "Online", 
            student_class,
        };

        setError("");  
        onSubmit(newStudent);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cohort" className="block text-sm font-medium text-gray-700">Cohort</label>
                        <select
                            id="cohort"
                            value={cohort}
                            onChange={(e) => setCohort(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="AY 2024-2025">AY 2024-2025</option>
                            <option value="AY 2023-2024">AY 2023-2024</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="courses" className="block text-sm font-medium text-gray-700">Courses</label>
                        <div className="flex items-center space-x-2">
                            <div>
                                <input
                                    type="checkbox"
                                    id="math"
                                    value="Math"
                                    onChange={(e) => {
                                        setCourses((prev) =>
                                            e.target.checked
                                                ? [...prev, e.target.value]
                                                : prev.filter((course) => course !== e.target.value)
                                        );
                                    }}
                                />
                                <label htmlFor="math" className="ml-2">Math</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="science"
                                    value="Science"
                                    onChange={(e) => {
                                        setCourses((prev) =>
                                            e.target.checked
                                                ? [...prev, e.target.value]
                                                : prev.filter((course) => course !== e.target.value)
                                        );
                                    }}
                                />
                                <label htmlFor="science" className="ml-2">Science</label>
                            </div>
                            
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date_joined" className="block text-sm font-medium text-gray-700">Date Joined</label>
                        <input
                            id="date_joined"
                            type="date"
                            value={date_joined}
                            onChange={(e) => setDateJoined(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                        <select
                            id="class"
                            value={student_class}
                            onChange={(e) => setStudentClass(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className="flex space-x-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;
