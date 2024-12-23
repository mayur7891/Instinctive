import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

const UpdateStudentModal = ({ showModal, onClose, student, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: "",
        cohort: "",
        student_class: "",
        courses: [], 
        date_joined: "",
        last_login: "",
        status: false,
        ...student, 
    });

    useEffect(() => {
        
        if (student && student.courses) {
            setFormData((prevData) => ({
                ...prevData,
                courses: JSON.parse(student.courses),
            }));
        }
    }, [student]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleCoursesChange = (e) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            courses: prevData.courses.includes(value)
                ? prevData.courses.filter((course) => course !== value)
                : [...prevData.courses, value],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({
            ...formData,
            courses: JSON.stringify(formData.courses), 
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Update Student</h2>
                <form onSubmit={handleSubmit}>
                  
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                 
                    <div className="mb-4">
                        <label htmlFor="cohort" className="block text-sm font-medium text-gray-700">Cohort</label>
                        <input
                            type="text"
                            id="cohort"
                            name="cohort"
                            value={formData.cohort}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label htmlFor="student_class" className="block text-sm font-medium text-gray-700">Class</label>
                        <input
                            type="text"
                            id="student_class"
                            name="student_class"
                            value={formData.student_class}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                 
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Courses</label>
                        {["Math", "Science", "History"].map((course, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`course-${idx}`}
                                    value={course}
                                    checked={formData.courses.includes(course)}
                                    onChange={handleCoursesChange}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <label htmlFor={`course-${idx}`} className="text-sm text-gray-700">{course}</label>
                            </div>
                        ))}
                    </div>

                  
                    <div className="mb-4">
                        <label htmlFor="date_joined" className="block text-sm font-medium text-gray-700">Date Joined</label>
                        <input
                            type="date"
                            id="date_joined"
                            name="date_joined"
                            value={formData.date_joined}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label htmlFor="last_login" className="block text-sm font-medium text-gray-700">Last Login</label>
                        <input
                            type="datetime-local"
                            id="last_login"
                            name="last_login"
                            value={formData.last_login}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label htmlFor="status" className="flex items-center">
                            <input
                                type="checkbox"
                                id="status"
                                name="status"
                                checked={formData.status}
                                onChange={handleInputChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Active</span>
                        </label>
                    </div>

                    
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update Student
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudentModal;
