import React from "react";
import { Link } from "react-router-dom";

export const ButtonWarning = ({ label, buttonText, to }) => {
    return (
        <div className="py-2 text-sm flex justify-center items-center">
            <div>{label}</div>
            <Link to={to} className="ml-2 text-blue-500 hover:text-blue-700">{buttonText}</Link>
        </div>
    );
};