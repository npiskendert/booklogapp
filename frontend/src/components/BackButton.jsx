import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function BackButton({ destination = "/" }) {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-cyan-700 text-2xl text-white py-1 rounded-md w-fit"
      >
        <BsArrowLeft className="text-4xl" />
      </Link>
    </div>
  );
}
