import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Edit = ({ history, id }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [newBody, setNewBody] = useState("");
  const [createdData, setCreatedData] = useState("");
  console.log(createdData);
  useEffect(() => {
    const newData = {
      title: newTitle,
      body: newBody,
      userId: newUserId,
    };
    const create = async () => {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/albums/${id}`,
        newData
      );
      setCreatedData(data);
    };
    create();
  }, [newBody, newTitle, newUserId, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/album");
  };
  return (
    <>
      <div className="ml-10 mt-10">
        <Link
          to="/album"
          className="px-6 py-2 rounded-lg bg-pink-400 text-white font-bold"
        >
          Go Back
        </Link>
      </div>
      <main className="w-full flex items-center justify-center">
        <section className="my-10 flex flex-col justify-center items-center">
          <h1 className="text-4xl my-6 text-gray-600">Update Data</h1>
          <form className="flex flex-col justify-center items-center">
            <input
              name="title"
              className="bg-gray-200 my-3 px-4 py-2 rounded-lg"
              type="text"
              value={newTitle}
              placeholder="Title"
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <input
              name="userId"
              className="bg-gray-200 my-3 px-4 py-2 rounded-lg"
              type="text"
              value={newUserId}
              placeholder="User ID"
              onChange={(e) => setNewUserId(e.target.value)}
            />

            <input
              name="body"
              className="bg-gray-200 my-3 px-4 py-2 rounded-lg"
              type="text"
              value={newBody}
              placeholder="User ID"
              onChange={(e) => setNewBody(e.target.value)}
            />

            <input
              onClick={submitHandler}
              className="bg-blue-400 font-semibold text-white my-3 px-6 cursor-pointer transform hover:scale-95 py-2 rounded-lg"
              type="submit"
              value="Update"
            />
          </form>
        </section>
      </main>
    </>
  );
};

export default Edit;
