import { MdOutlineSearch } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import SearchButton from "../../services/SearchButton";
import { useContext } from "react";
import { DataContext } from "../../context/contextProvider";

const Search = () => {
  const { filters, setfilters, setsearchText, searchText } =
    useContext(DataContext);

  const testing = () => {
    return new Promise((resolve) => {
      const updatedFilters = {
        ...filters,
        input_query: searchText,
      };
      setfilters(updatedFilters);
      resolve(updatedFilters);
    });
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setsearchText(inputValue);

    return new Promise((resolve) => {
      const updatedFilters = {
        ...filters,
        owners: [],
        attorneys: [],
        law_firms: [],
      };
      setfilters(updatedFilters);
      resolve(updatedFilters);
    });
  };

  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-row rounded-lg bg-white p-2 items-center border-2 border-gray-300 focus-within:border-blue-500 w-full ml-2 mr-auto">
        <div className="bg-white px-3">
          <MdOutlineSearch className="text-xl text-gray-600" />
        </div>
        <input
          type="search"
          placeholder="Search here example: Google"
          className="rounded-xl border-0 focus:outline-none h-8 w-full"
          onChange={handleChange}
        />
        <FaCamera className="ml-auto mx-3 text-xl" />
      </div>
      <SearchButton testing={testing} />
    </div>
  );
};

export default Search;
