import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book deleted succcessfully", { variant: "success" });
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("An error happened.", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton></BackButton>
      <h1 className="text-3xl my-4 text-center text-cyan-700"> Delete Book</h1>
      <div className="flex flex-col items-center border-2 border-sky-600p-8 rounded-xl w-[600px] mx-auto">
        <h3 className="text-2xl p-6 text-gray-700">Are you sure?</h3>
        <button
          className="text-2xl m-6 p-3 text-white bg-rose-700 rounded-xl"
          onClick={handleDelete}
        >
          Yes, I want to delete this book
        </button>
      </div>
    </div>
  );
}
