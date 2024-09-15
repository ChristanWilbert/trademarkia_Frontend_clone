import React, { useContext } from "react";
import { DataContext } from "../context/contextProvider";

const SearchButton = ({ testing }) => {
  const {
    setData,
    setsearchLoading,
    setaggregations,
    setselectedaggregations,
  } = useContext(DataContext);

  const handleSearch = async () => {
    const updatedFilters = await testing();

    let page = 1;
    const rows = updatedFilters.rows;
    let isMoreData = true;
    setsearchLoading(isMoreData);
    setData([]);
    setaggregations();
    const response2 = await fetch(
      "https://vit-tm-task.api.trademarkia.app/api/v3/us",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "en-GB,en-US;",
          "Content-Type": "application/json",
          Origin: "http://localhost:3001",
          priority: "u=1,i",
          Referer: "http://localhost:3001/",
          "sec-ch-ua":
            '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
          ...updatedFilters,
          page,
          owners: [],
          attorneys: [],
          law_firms: [],
        }),
      }
    );

    const result2 = await response2.json();

    if (result2.body && result2.body.hits && result2.body.hits.hits.length > 0)
      setaggregations(result2.body.aggregations);

    while (isMoreData) {
      const response = await fetch(
        "https://vit-tm-task.api.trademarkia.app/api/v3/us",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "en-GB,en-US;",
            "Content-Type": "application/json",
            Origin: "http://localhost:3001",
            priority: "u=1,i",
            Referer: "http://localhost:3001/",
            "sec-ch-ua":
              '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          },
          body: JSON.stringify({ ...updatedFilters, page }),
        }
      );

      const result = await response.json();

      if (result.body && result.body.hits && result.body.hits.hits.length > 0) {
        setData((prevData) => [...(prevData || []), ...result.body.hits.hits]);
        if (page == 1) await setselectedaggregations(result.body.aggregations);
        if (result.body.hits.hits.length < rows) {
          isMoreData = false;
          setsearchLoading(isMoreData);
        } else {
          page++;
        }
      } else {
        isMoreData = false;
        setsearchLoading(isMoreData);
      }
    }
  };

  return (
    <input
      type="button"
      className="mx-5 px-8 py-0 bg-[#4380EC] hover:bg-[#3362b2] rounded-xl text-white cursor-pointer text-lg"
      value={"Search"}
      onClick={handleSearch}
    />
  );
};

export default SearchButton;
