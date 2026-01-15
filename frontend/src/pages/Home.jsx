import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import BooksTable from "../components/home/BooksTable.jsx";
import BooksCard from "../components/home/BooksCard.jsx";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-end gap-x-4">
        <button
          className="bg-cyan-500 hover:bg-sky-700 cursor-pointer px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-cyan-500 hover:bg-sky-700 cursor-pointer  px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-cyan-700 font-bold bold m-auto my-8">
          Books List
        </h1>

        <Link to="/books/create">
          <IoMdAddCircleOutline className="text-cyan-600 text-5xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
