import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [filters, setfilters] = useState({
    input_query: "check",
    input_query_type: "",
    sort_by: "default",
    status: [],
    exact_match: false,
    date_query: false,
    owners: [],
    attorneys: [],
    law_firms: [],
    mark_description_description: [],
    classes: [],
    page: 1,
    rows: 12,
    sort_order: "desc",
    states: [],
    counties: [],
  });
  const [searchLoading, setsearchLoading] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [aggregations, setaggregations] = useState({});
  const [selectedaggregations, setselectedaggregations] = useState({});

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        filters,
        setfilters,
        searchLoading,
        setsearchLoading,
        searchText,
        setsearchText,
        aggregations,
        setaggregations,
        selectedaggregations,
        setselectedaggregations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
