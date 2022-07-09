import { useRouter } from "next/router";
import { useWindowSize } from "../../../utils/useWindowsSize";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import { SearchBarItem } from "../SearchBarItem/SearchBarItem";
import * as constants from "../../../constants";

export const SearchBarContainer = ({ value }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(constants.api.baseUrl + constants.api.ytSearch + `?q="${value}"`)
      .then((res) => res.json())
      .then((data) => {
        const shorterArray = data.slice(0, 5);
        setData(shorterArray);
        setLoading(false);
      });
  }, [value]);
  return (
    <div className={`rounded ${size.width < 768 ? "" : "px-32"} py-4 absolute z-50 h-56 overflow-y-auto`}>
      {isLoading ? (
        <Spinner />
      ) : data?.length > 0 ? (
        data?.map((item, _index) => (
          <SearchBarItem
            id={item.id}
            title={item.title}
            img={item.thumbnail}
            key={item.id}
          />
        ))
      ) : (
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>No se han encontrado resultados!</span>
          </div>
        </div>
      )}
    </div>
  );
};

SearchBarContainer.propTypes = {};
