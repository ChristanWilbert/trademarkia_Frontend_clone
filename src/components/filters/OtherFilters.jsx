import { useState, memo, useContext, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { DataContext } from "../../context/contextProvider";

const Owners = memo(
  ({ value, handleChange, selection, handleCheckboxChange }) => {
    return (
      <div className="flex flex-col m-2">
        <div className="flex flex-row rounded-lg bg-white p-2 items-center border-2 border-gray-300 focus-within:border-blue-500 w-full mr-auto">
          <div className="bg-white px-3">
            <MdOutlineSearch className="text-xl text-gray-600" />
          </div>
          <input
            type="search"
            placeholder="Search Owners"
            className="rounded-xl border-0 focus:outline-none h-8 w-full"
            value={value}
            onChange={handleChange}
          />
        </div>

        {selection
          .filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => (
            <div className="flex flex-row" key={item.name}>
              <input
                type="checkbox"
                name={item.name}
                checked={item.select}
                onChange={() => handleCheckboxChange(item.name)}
              />
              <label
                htmlFor={item.name}
                className={`leading-none ml-2 py-1 ${
                  item.select ? "text-[#4380EC]" : ""
                }`}
              >
                {item.name}
              </label>
            </div>
          ))}
      </div>
    );
  }
);

const LawFirms = memo(
  ({ value, handleChange, selection, handleCheckboxChange }) => {
    return (
      <div className="flex flex-col m-2">
        <div className="flex flex-row rounded-lg bg-white p-2 items-center border-2 border-gray-300 focus-within:border-blue-500 w-full mr-auto">
          <div className="bg-white px-3">
            <MdOutlineSearch className="text-xl text-gray-600" />
          </div>
          <input
            type="search"
            placeholder="Search Law Firms"
            className="rounded-xl border-0 focus:outline-none h-8 w-full"
            value={value}
            onChange={handleChange}
          />
        </div>

        {selection
          .filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => (
            <div className="flex flex-row" key={item.name}>
              <input
                type="checkbox"
                name={item.name}
                checked={item.select}
                onChange={() => handleCheckboxChange(item.name)}
              />
              <label
                htmlFor={item.name}
                className={`leading-none ml-2 py-1 ${
                  item.select ? "text-[#4380EC]" : ""
                }`}
              >
                {item.name}
              </label>
            </div>
          ))}
      </div>
    );
  }
);

const Attorneys = memo(
  ({ value, handleChange, selection, handleCheckboxChange }) => {
    return (
      <div className="flex flex-col m-2">
        <div className="flex flex-row rounded-lg bg-white p-2 items-center border-2 border-gray-300 focus-within:border-blue-500 w-full mr-auto">
          <div className="bg-white px-3">
            <MdOutlineSearch className="text-xl text-gray-600" />
          </div>
          <input
            type="search"
            placeholder="Search Attorneys"
            className="rounded-xl border-0 focus:outline-none h-8 w-full"
            value={value}
            onChange={handleChange}
          />
        </div>

        {selection
          .filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => (
            <div className="flex flex-row" key={item.name}>
              <input
                type="checkbox"
                name={item.name}
                checked={item.select}
                onChange={() => handleCheckboxChange(item.name)}
              />
              <label
                htmlFor={item.name}
                className={`leading-none ml-2 py-1 ${
                  item.select ? "text-[#4380EC]" : ""
                }`}
              >
                {item.name}
              </label>
            </div>
          ))}
      </div>
    );
  }
);

const OtherFilters = () => {
  const { aggregations, setfilters, selectedaggregations } =
    useContext(DataContext);

  const [currentCategory, setcurrentCatergory] = useState(0);
  const [ownerSearchText, setownerSearchText] = useState("");
  const [lawSearchText, setlawSearchText] = useState("");
  const [attorneySearchText, setattorneySearchText] = useState("");

  const [ownerSelection, setOwnerSelection] = useState([]);

  useEffect(() => {
    if (aggregations?.current_owners?.buckets) {
      setOwnerSelection(
        aggregations.current_owners.buckets.map((owner) => ({
          name: owner.key,
          select:
            selectedaggregations?.current_owners?.buckets?.some(
              (bucket) => bucket.key === owner.key
            ) ?? false,
        }))
      );
    }
  }, [
    selectedaggregations?.current_owners?.buckets,
    aggregations?.current_owners?.buckets,
  ]);

  useEffect(() => {
    const ownerfilterlist = ownerSelection
      .filter((item) => item.select)
      .map((item) => item.name);

    setfilters((prevFilters) => ({
      ...prevFilters,
      owners: ownerfilterlist,
    }));
  }, [ownerSelection]);

  const handleOwnerCheckboxChange = (name) => {
    const updatedSelection = ownerSelection.map((item) =>
      item.name === name ? { ...item, select: !item.select } : item
    );
    setOwnerSelection(updatedSelection);
  };

  const [lawfirmSelection, setlawfirmSelection] = useState([]);

  useEffect(() => {
    if (aggregations?.law_firms?.buckets) {
      setlawfirmSelection(
        aggregations.law_firms.buckets.map((firm) => ({
          name: firm.key,
          select:
            selectedaggregations?.law_firms?.buckets?.some(
              (bucket) => bucket.key === firm.key
            ) ?? false,
        }))
      );
    }
  }, [aggregations?.law_firms?.buckets, selectedaggregations]);

  useEffect(() => {
    const lawfirmfilterlist = lawfirmSelection
      .filter((item) => item.select)
      .map((item) => item.name);
    setfilters((prevFilters) => ({
      ...prevFilters,
      law_firms: lawfirmfilterlist,
    }));
  }, [lawfirmSelection]);

  const handlelawfirmCheckboxChange = (name) => {
    const updatedSelection = lawfirmSelection.map((item) =>
      item.name === name ? { ...item, select: !item.select } : item
    );
    setlawfirmSelection(updatedSelection);
  };

  const [attorneySelection, setAttorneySelection] = useState([]);

  useEffect(() => {
    if (aggregations?.attorneys?.buckets) {
      setAttorneySelection(
        aggregations.attorneys.buckets.map((attorney) => ({
          name: attorney.key,
          select:
            selectedaggregations?.attorneys?.buckets?.some(
              (bucket) => bucket.key === attorney.key
            ) ?? false,
        }))
      );
    }
  }, [aggregations?.attorneys?.buckets, selectedaggregations]);

  useEffect(() => {
    const attorneyfilterlist = attorneySelection
      .filter((item) => item.select)
      .map((item) => item.name);
    setfilters((prevFilters) => ({
      ...prevFilters,
      attorneys: attorneyfilterlist,
    }));
  }, [attorneySelection]);

  const handleAttorneyCheckboxChange = (name) => {
    const updatedSelection = attorneySelection.map((item) =>
      item.name === name ? { ...item, select: !item.select } : item
    );
    setAttorneySelection(updatedSelection);
  };

  const handleChange1 = (e) => setownerSearchText(e.target.value);
  const handleChange2 = (e) => setlawSearchText(e.target.value);
  const handleChange3 = (e) => setattorneySearchText(e.target.value);

  return (
    <div className="flex flex-col px-4 my-3 rounded-lg shadow-2xl bg-white">
      <div className="Menu flex flex-row justify-evenly">
        <div
          className={`${
            currentCategory === 0 ? "font-bold underline" : ""
          } p-2 underline-offset-8`}
          onClick={() => setcurrentCatergory(0)}
        >
          Owners
        </div>
        <div
          className={`${
            currentCategory === 1 ? "font-bold underline" : ""
          } p-2 underline-offset-8`}
          onClick={() => setcurrentCatergory(1)}
        >
          Law Firms
        </div>
        <div
          className={`${
            currentCategory === 2 ? "font-bold underline" : ""
          } p-2 underline-offset-8`}
          onClick={() => setcurrentCatergory(2)}
        >
          Attorneys
        </div>
      </div>

      {currentCategory === 0 ? (
        <Owners
          value={ownerSearchText}
          handleChange={handleChange1}
          selection={ownerSelection}
          handleCheckboxChange={handleOwnerCheckboxChange}
        />
      ) : currentCategory === 1 ? (
        <LawFirms
          value={lawSearchText}
          handleChange={handleChange2}
          selection={lawfirmSelection}
          handleCheckboxChange={handlelawfirmCheckboxChange}
        />
      ) : (
        <Attorneys
          value={attorneySearchText}
          handleChange={handleChange3}
          selection={attorneySelection}
          handleCheckboxChange={handleAttorneyCheckboxChange}
        />
      )}
    </div>
  );
};

export default OtherFilters;
