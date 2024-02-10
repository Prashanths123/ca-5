import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Bookpage.css";

const Bookpage = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("");
  const submitStatus = localStorage.getItem("submitstatus");

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      .then((response) => {
        setBooks(response.data.books);
        console.log(response.data.books);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("submitstatus", "!true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const filteredData = books.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    setResult(inputValue ? (filteredData.length > 0 ? "Showing books of your choice 📚" : "no books found 😓") : "");
  };

  return (
    <div className="mainpage" style={{ color: "black", width: "99vw" }}>
      <div className="navbar">
        <div className="logo">
          <img src="https://kalvium.community/images/sidebar-3d-logo.svg" alt="" />
          <h1 style={{ fontSize: "50px", color: "black" }}>KalviumBooks</h1>
        </div>
        <div>
          <input
            className="search"
            type="search"
            placeholder="Search"
            onChange={handleInputChange}
          />
          {submitStatus === "true" ? (
            <button style={{ margin: "5px" }}>Registered</button>
          ) : (
            <Link to={"/register"}>
              <button style={{ margin: "5px" }}>Register</button>
            </Link>
          )}
        </div>
      </div>
      <p className="results">{result}</p>
      <div className="Books">
        {filteredData.map((data) => (
          <div key={data.id}>
            <img src={data.imageLinks.thumbnail} alt="" />
            <h4>{data.title}</h4>
            <p>
              {data.averageRating ? (
                <span>
                  <h3>{data.averageRating}</h3>
                  <h3 className="cost">FREE</h3>
                </span>
              ) : (
                <span>
                  <h3 className="cost">FREE</h3>
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookpage;
