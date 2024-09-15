import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/contextProvider";

const StatusFilter = () => {
  const [all, setall] = useState(true);
  const [registered, setregistered] = useState(false);
  const [pending, setpending] = useState(false);
  const [abandoned, setabandoned] = useState(false);
  const [others, setothers] = useState(false);
  const { filters, setfilters } = useContext(DataContext);

  useEffect(() => {
    let newFilters = [];
    if (all) {
      newFilters = ["registered", "pending", "abandoned", "others"];
    } else {
      if (registered) newFilters.push("registered");
      if (pending) newFilters.push("pending");
      if (abandoned) newFilters.push("abandoned");
      if (others) newFilters.push("others");
    }

    setfilters((prevFilters) => ({
      ...prevFilters,
      status: newFilters,
    }));
  }, [all, registered, pending, abandoned, others, setfilters]);

  return (
    <div className="flex flex-col px-4 rounded-lg shadow-2xl">
      <div className="py-2">Status</div>
      <div className="flex flex-wrap pb-3">
        <div
          className={`px-3 py-1 m-1 border-2 rounded-xl cursor-pointer ${
            all ? "border-[#4380EC] text-[#4380EC] bg-[#EEF4FF]" : ""
          }`}
          onClick={() => {
            if (!all) {
              setabandoned(true);
              setothers(true);
              setpending(true);
              setregistered(true);
            }
            setall(!all);
          }}
        >
          All
        </div>
        <div
          className={`px-3 py-1 m-1 border-2 rounded-xl cursor-pointer ${
            registered ? "border-[#4380EC] text-[#4380EC] bg-[#EEF4FF]" : ""
          }`}
          onClick={() => {
            setregistered(!registered);
            setall(false);
          }}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-[#52B649] mr-2"></span>
          Registered
        </div>
        <div
          className={`px-3 py-1 m-1 border-2 rounded-xl cursor-pointer ${
            pending ? "border-[#4380EC] text-[#4380EC] bg-[#EEF4FF]" : ""
          }`}
          onClick={() => {
            setpending(!pending);
            setall(false);
          }}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-[#ECC53C] mr-2"></span>
          Pending
        </div>
        <div
          className={`px-3 py-1 m-1 border-2 rounded-xl cursor-pointer ${
            abandoned ? "border-[#4380EC] text-[#4380EC] bg-[#EEF4FF]" : ""
          }`}
          onClick={() => {
            setabandoned(!abandoned);
            setall(false);
          }}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-[#EC3C3C] mr-2"></span>
          Abandoned
        </div>
        <div
          className={`px-3 py-1 m-1 border-2 rounded-xl cursor-pointer ${
            others ? "border-[#4380EC] text-[#4380EC] bg-[#EEF4FF]" : ""
          }`}
          onClick={() => {
            setothers(!others);
            setall(false);
          }}
        >
          <span className="inline-block w-3 h-3 rounded-full bg-[#4380EC] mr-2"></span>
          Others
        </div>
      </div>
    </div>
  );
};
export default StatusFilter;
