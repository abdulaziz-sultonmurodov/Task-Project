import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const Album = ({ history }) => {
  const [data, setData] = useState("");
  // const [img, setImg] = useState({});

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setData(data);
    };
    fetchData();

    // const fetchImg = async () => {
    //   const data = await axios.get("https://place-puppy.com/300x300");
    //   setImg(data);
    // };
    // fetchImg();
  }, [history, user]);
  const logoutHandler = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [dataPerPage, setDataPerPage] = useState(5);

  const handlePaginate = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const deleteHandler = (item) => {
    const newData = data.filter((i) => i.id !== item);
    setData(newData);
  };
  return (
    <>
      <main>
        <section className=" flex flex-row justify-between">
          <div className="flex flex-row">
            <Link
              to="/album-create"
              className="bg-green-500 font-bold cursor-pointer rounded-lg px-6 text-white m-10 py-2"
            >
              Create
            </Link>
            <Link
              to="/album-edit"
              className="bg-blue-500 font-bold cursor-pointer rounded-lg px-10 text-white m-10 py-2"
            >
              Edit
            </Link>
          </div>
          <div
            onClick={logoutHandler}
            className="bg-gray-700 font-bold cursor-pointer rounded-lg px-6 text-white m-10 py-2"
          >
            Logout
          </div>
        </section>
        <section className="flex justify-center mx-10">
          {data && data.length > 0 ? (
            <table className="table p-4 bg-white shadow rounded-lg">
              <thead className="text-start">
                <tr className="text-start">
                  <th className=" border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-xl text-gray-900">
                    User ID
                  </th>
                  {/* <th className=" border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-xl text-gray-900">
                    Image
                  </th> */}
                  <th className=" border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-xl text-gray-900">
                    Title
                  </th>
                  <th className=" border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-xl text-gray-900">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id} className="text-gray-700 ">
                    <td className="border-b-2 p-4 text-center dark:border-dark-5">
                      <span>{item.id}</span>
                    </td>
                    <td className="border-b-2 p-4 dark:border-dark-5">
                      <span>{item.title}</span>
                    </td>

                    <td
                      className="border-b-2 hover:bg-red-200 dark:border-dark-5 cursor-pointer"
                      onClick={() => deleteHandler(item.id)}
                    >
                      <MdDeleteForever className="h-6 w-6 mx-auto text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            false
          )}
        </section>
        <Pagination
          data={data}
          pageNumbers={pageNumbers}
          handlePaginate={handlePaginate}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
        />
      </main>
    </>
  );
};

export default Album;
