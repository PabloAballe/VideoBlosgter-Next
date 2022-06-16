import { NavBarStyles } from "./NavBar.styles";
import { useRouter } from "next/router";
import * as constants from "../../../constants";
import Link from "next/link";

export const NavBar = () => {

  const router = useRouter();

  return (
    <NavBarStyles>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />
      <div className="min-h-screen flex flex-row bg-gray-100">
        <div className="flex flex-col w-44 bg-white rounded-r-3xl overflow-hidden">
          <Link href="/">
            <div className="flex items-center justify-center h-20 cursor-pointer">
              <img
                src={`/${constants.site.icon}`}
                alt={constants.site.name}
                className="w-16"
              />
            </div>
          </Link>
          <ul className="flex flex-col py-4">
            <li>
              <Link href="/">
                <a className={`${router.pathname == "/" ? "active" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}>
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home" />
                  </span>
                  <span className="text-sm font-medium">Inicio</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/music">
                <a
                  href="#"
                  className={` ${router.pathname == "/music" ? "active" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-music" />
                  </span>
                  <span className="text-sm font-medium">Música</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/tutorials">
                <a
                  href="#"
                  className={`${router.pathname == "/tutorials" ? "active" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-chalkboard"></i>
                  </span>
                  <span className="text-sm font-medium">Tutoriales</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/series">
                <a
                  href="#"
                  className={`${router.pathname == "/series" ? "active" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bxs-videos"></i>
                  </span>
                  <span className="text-sm font-medium">Series</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/pelis">
                <a
                  href="#"
                  className={`${router.pathname == "/pelis" ? "active" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-video-recording"></i>
                  </span>
                  <span className="text-sm font-medium">Peliculas</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/gameplays">
                <a
                  href="#"
                  className={`${router.pathname == "/gameplay" ? "active" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-video-recording"></i>
                  </span>
                  <span className="text-sm font-medium">GamePlays</span>
                </a>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className={`${router.pathname == "/discover" ? "active" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bxs-hot"></i>
                </span>
                <span className="text-sm font-medium">Descubrir</span>
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-user" />
                </span>
                <span className="text-sm font-medium">Profile</span>
              </a>
            </li> */}
            {/* <li>
              <a
                href="#"
                className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-bell" />
                </span>
                <span className="text-sm font-medium">Notifications</span>
                <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                  5
                </span>
              </a>
            </li> */}
            {/* <li>
              <a
                href="#"
                className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className="bx bx-log-out" />
                </span>
                <span className="text-sm font-medium">Logout</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </NavBarStyles>
  );
};

NavBar.propTypes = {};
