import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faQuestionCircle, faEnvelope, faFilter, faBell } from "@fortawesome/free-solid-svg-icons";

const TopNav = () => (
    <div className="flex justify-between items-center p-4 ">
       
        <div className="flex items-center border rounded-lg w-full max-w-3xl p-2 bg-white">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 mr-2 text-lg" />
            <input
                type="text"
                placeholder="Search your course"
                className="w-full focus:outline-none rounded-lg"
            />
        </div>

       
        <div className="flex items-center space-x-6 ml-4">
            <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 cursor-pointer text-3xl" title="Help" />
            <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 cursor-pointer text-3xl" title="Messages" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <FontAwesomeIcon icon={faFilter} className="text-gray-500 cursor-pointer text-3xl" title="Filter" />
            <div className="relative">
                <FontAwesomeIcon icon={faBell} className="text-gray-500 cursor-pointer text-3xl" title="Notifications" />
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
);
export default TopNav;
