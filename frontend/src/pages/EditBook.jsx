import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function EditBook() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book edited successfully.", { variant: "succcess" });
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
        Edit Book
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
          onClick={handleEditBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
}
