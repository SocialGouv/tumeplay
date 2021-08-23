import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center">
        <div className="w-full bg-gray-400 mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <span
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
          >
            Tu.me.play
          </span>
          {/* SearchBar */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch p-2">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <FontAwesomeIcon icon={faSearch} color={"#9CA3AF"} />
              </span>
              <input
                type="text"
                placeholder="Rechercher ...."
                className="border-0 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}

export default Navbar;
