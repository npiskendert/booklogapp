import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function CreateBooks() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:3000/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully.", { variant: "succcess" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("An error happened.", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl text-center font-bold my-4 text-cyan-700">
        Create New Book
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-700 text-3xl rounded-xl w-[600px] mx-auto p-4">
        <div className="my-4">
          <label className="text-xl mr-2 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 my-3 px-4 py-2 w-full rounded-xl"
          />
        </div>
        <div className="my-4">
          <label className="text-xl  text-gray-500 ">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 my-3 px-4 py-2 w-full rounded-xl"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-2 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-400 my-3 px-4 py-2 w-full rounded-xl"
          />
        </div>
        <button
          className="p-4 text-xl bg-cyan-700 m-8 text-white rounded-xl"
          onClick={handleSaveBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
}
