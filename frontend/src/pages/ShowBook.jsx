import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

export default function ShowBook() {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [book, setBook] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 ">
      <BackButton />
      <h1 className="text-3xl text-center text-cyan-700 font-bold bold my-3">
        {book.title}
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className=" flex items-center justify-center text-center">
          <div className=" flex flex-col border-2  border-sky-400 rounded-xl min-w-md w-fit my-20 p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Id</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Create Time</span>
              <span>{new Date(book.createdAt).toDateString()}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Last Update Time
              </span>
              <span>{new Date(book.updatedAt).toDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
