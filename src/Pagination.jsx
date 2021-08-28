import React from "react";

const Pagination = ({
  data,
  pageNumbers,
  handlePaginate,
  indexOfFirstData,
  indexOfLastData,
}) => {
  return (
    <main className="flex justify-center flex-col items-center my-6">
      <div className="my-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{indexOfFirstData + 1}</span> to{" "}
          <span className="font-medium">{indexOfLastData}</span> of{" "}
          <span className="font-medium">{data.length}</span> results
        </p>
      </div>
      <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <ul>
                {pageNumbers.map((number) => {
                  return (
                    <li
                      aria-current="page"
                      className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 cursor-pointer hover:bg-blue-700 hover:text-white hover:border-white border text-sm font-medium"
                      key={number}
                      id={number}
                      onClick={handlePaginate}
                    >
                      {number}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pagination;
