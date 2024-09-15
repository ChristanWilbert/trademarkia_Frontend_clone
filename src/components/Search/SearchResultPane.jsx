import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/contextProvider";
import { ClipLoader } from "react-spinners";
import UnixTimestampConverter from "../timestampconversion";
import image_unavailable from "../../assets/images/Image_Unavailable.svg";
import { FiRefreshCw } from "react-icons/fi";
import StatusFilter from "../filters/Status";
import OtherFilters from "../filters/OtherFilters";
import { IoIosArrowForward } from "react-icons/io";
import tubeicon from "../../assets/images/testube.svg";

const SearchResultPane = () => {
  const { data, filters, searchLoading } = useContext(DataContext) ?? {
    data: null,
    filters: null,
  };
  const n = data ? data.length : 0;

  return filters ? (
    <div className="flex flex-col w-full px-20">
      <div className="searchsummary text-xl font-bold p-4 font-poppinsReg items-center align-middle">
        <ClipLoader loading={searchLoading} className="text-sm" />{" "}
        {searchLoading
          ? `Searching.. ` +
            `About ` +
            n +
            ` Trademarks for "` +
            filters.input_query +
            `"`
          : n > 0
          ? `About ` + n + ` Trademarks for "` + filters.input_query + `"`
          : "No Results"}
      </div>
      <div className="h-[1px] bg-[#E7E6E6] px-4" />
      <div className="w-2/3 p-4 font-lg flex flex-row items-center font-semibold">
        <div>Also try searching for: </div>
        <div className="rounded-xl border-2 text-[#E7760E] border-[#E7760E] px-4 py-1 mx-2 bg-[#ffdfc287]">
          {filters.input_query.replace(/^./, "*")}
        </div>
        <div className="rounded-xl border-2 text-[#E7760E] border-[#E7760E] px-4 py-1 bg-[#ffdfc287]">
          {filters.input_query.slice(0, -1) + "*"}
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="w-3/4 flex flex-row">
          <SearchResultTable />
        </div>
        <div className="w-1/4 flex flex-col">
          <StatusFilter />
          <OtherFilters />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const SearchResultTable = () => {
  const headings = ["Mark", "Details", "Status", "Class/Description", " "];
  const { data } = useContext(DataContext);
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(data && data.length > 0 ? 1 : 0);
  }, [data]);

  const totalPages = data ? Math.ceil(data.length / rowsPerPage) : 0;

  const paginatedData = data
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex-col">
      <div>
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr>
              {headings.map((element) => (
                <th key={element} className="pb-2 border-b-2 border-[#E7E6E6]">
                  {element}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(paginatedData) &&
              paginatedData.map((trademark, index) => {
                try {
                  return (
                    <tr
                      key={index}
                      className="items-center hover:bg-slate-100 ease-in-out rounded-xl"
                    >
                      <td className="text-center">
                        <div className="h-32 w-40 mx-5 border-gray-50000 shadow-2xl flex items-center justify-center rounded-lg">
                          <img src={image_unavailable} alt="unavailable" />
                        </div>
                      </td>
                      <td className="h-full">
                        <div className="flex flex-col h-full justify-around px-2">
                          <div className="flex flex-col pb-5 text-left min-w-40">
                            <div className="font-poppinsReg font-bold px-4">
                              {trademark._source.search_bar
                                .mark_identification ?? " "}
                            </div>
                            <div className="font-poppinsReg font-light text-sm px-4">
                              {trademark._source.search_bar.owner ?? " "}
                            </div>
                          </div>
                          <div className="font-poppinsReg font-light text-sm px-4">
                            <div className="font-medium">
                              {trademark._source.registration_number ?? " "}
                            </div>
                            <div className="text-xs">
                              On{" "}
                              <UnixTimestampConverter
                                unixTimestamp={trademark._source.filing_date}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col px-3">
                          <div className="flex flex-row h-full items-center">
                            {trademark._source.status_type === "registered" ? (
                              <p className="text-[#41B65C] flex items-center font-semibold">
                                <span className="inline-block w-3 h-3 rounded-full bg-[#41B65C] mr-2 "></span>
                                Live/Registered
                              </p>
                            ) : trademark._source.status_type ===
                              "abandoned" ? (
                              <p className="text-red-900 flex items-center font-semibold">
                                <span className="inline-block w-3 h-3 rounded-full bg-red-900 mr-2"></span>
                                Abandoned
                              </p>
                            ) : trademark._source.status_type === "pending" ? (
                              <p className="text-yellow-500 flex items-center font-semibold">
                                <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                                Pending
                              </p>
                            ) : (
                              <p className="text-blue-900 flex items-center font-semibold">
                                <span className="inline-block w-3 h-3 rounded-full bg-blue-900 mr-2"></span>
                                Others
                              </p>
                            )}
                          </div>
                          <div className="text-xs font-bold">
                            <span className="font-normal">On </span>
                            <UnixTimestampConverter
                              unixTimestamp={trademark._source.status_date}
                              className="font-semibold"
                            />
                          </div>
                          <div className="inline-block mt-8 font-bold text-xs align-middle">
                            <FiRefreshCw className="text-red-600 inline align-middle" />{" "}
                            <span className="align-middle">
                              <UnixTimestampConverter
                                unixTimestamp={trademark._source.renewal_date}
                              />
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <div className="flex flex-col h-full justify-evenly text-sm">
                          <div className="line-clamp-3 overflow-ellipsis ">
                            {trademark._source
                              .mark_description_description[0] ?? ""}
                          </div>
                          <div className="flex flex-row line-clamp-1 ">
                            {trademark._source.class_codes
                              .slice(0, 3)
                              .map((code, index) => (
                                <div key={index} className="flex py-2 px-3">
                                  <img
                                    src={tubeicon}
                                    className="px-1"
                                    alt="Class Icon"
                                  />
                                  Class {parseInt(code)}
                                </div>
                              ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <IoIosArrowForward className="mr-5" />
                      </td>
                    </tr>
                  );
                } catch (error) {
                  console.error(
                    `Error processing trademark at index ${index}:`,
                    trademark
                  );
                  console.error("Error details:", error);
                  return null;
                }
              })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-5 mb-20">
        <button
          className="mx-2 px-4 py-2 bg-white text-[#3b82f6] border border-[#3b82f6] hover:text-white hover:bg-[#3b82f6] rounded"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2 px-4 py-2 bg-white text-[#3b82f6] border border-[#3b82f6] rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="mx-2 px-4 py-2 bg-white text-[#3b82f6] border border-[#3b82f6] hover:text-white hover:bg-[#3b82f6] rounded"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default SearchResultPane;
