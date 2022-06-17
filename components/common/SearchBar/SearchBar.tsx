import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useWindowSize } from "../../../utils/useWindowsSize";
import { SearchBarContainer } from "../SearchBarContainer/SearchBarContainer";

export const SearchBar = ({}) => {
  const router = useRouter();
  const input = useRef();
  const size = useWindowSize();
  const [value, setValue] = useState("")

  // update the value of the input
  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className="search-container">
      <div className={`rounded ${size.width < 768 ? "" : "px-56"}`}>
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              // @ts-ignore: Object is possibly 'null'.
              ref={input}
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Busca videos..."
              required={true}
              value={value}
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={() =>
                router.push(
                  "/search?q=" +
                    // @ts-ignore: Object is possibly 'null'.
                    value
                )
              }
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      {
        // @ts-ignore: Object is possibly 'null'.
        value !== "" && <SearchBarContainer value={value} />
      }
    </div>
  );
};

SearchBar.propTypes = {};
