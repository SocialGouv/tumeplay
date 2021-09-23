/*eslint-disable*/
import { faBars, faCog, faDoorClosed, faTimes, faTable, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useContext} from "react";
import { NavLink, Link } from "react-router-dom";
import AppContext from "../AppContext";
import logo from "../assets/pictures/full-logo.png"


export default function Sidebar() {
  const context = useContext(AppContext)

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 rounded-r-md">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
           <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Brand */}
          <Link
            className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <div className="flex mx-auto justify-center">
              <img className="h-10 px-4" src={logo}/>
            </div>
          </Link>
          {/* Collapse */}
					<div className="mt-4 -mb-2 text-center text-blueGray-600 font-bold">
						{context.user.username}
					</div>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <NavLink
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
										activeClassName="tmp-active-nav-link"
                    to="/"
                  >
                    Tu me play
                  </NavLink>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="mb-4 md:min-w-full" />
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <NavLink
                  className={
                    "text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                  }
									activeClassName="tmp-active-nav-link"
                  to="/orders/box/1"
                >
                  <FontAwesomeIcon
                    icon={faTable}
                    className={
                      "fas fa-tv mr-2 text-sm"
                    }
                  ></FontAwesomeIcon>{" "}
                  Gestion des commandes
                </NavLink>
              </li>
              <li className="items-center">
                <NavLink
                  className={
                    "text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                  }
									activeClassName="tmp-active-nav-link"
                  to="/bilan"
                >
                  <FontAwesomeIcon
                    icon={faClipboard}
                    className={
                      "fas fa-tv mr-2 text-sm"
                    }
                  ></FontAwesomeIcon>{" "}
                  Bilans quotidiens
                </NavLink>
              </li>
							{
								false && (
									<li className="items-center">
										<NavLink
											className={
												"text-xs uppercase py-3 font-bold block " +
												(window.location.href.indexOf("/admin/settings") !== -1
													? "text-sky-500 hover:text-sky-600"
													: "text-blueGray-700 hover:text-blueGray-500")
											}
											to="/settings"
											activeClassName="tmp-active-nav-link"
										>
											<FontAwesomeIcon
												icon={faCog}
												className={
													"fas fa-tools mr-2 text-sm"
												}
											></FontAwesomeIcon>{" "}
											Paramêtres
										</NavLink>
									</li>
								)
							}
              
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 font-bold block text-blueGray-700 hover:text-blueGray-500"
                  }
                  onClick={() => context.logOut()}
                  to='/login'
                >
                  <FontAwesomeIcon
                    icon={faDoorClosed}
                    className={
                      "fas fa-map-marked mr-2 text-sm"
                    }
                  ></FontAwesomeIcon>{" "}
                  Déconnexion
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
