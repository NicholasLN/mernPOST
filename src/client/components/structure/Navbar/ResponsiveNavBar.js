import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

const navbarLinks = {
  links: [
    {
      name: "Register",
      url: "/register",
      isDropdown: false,
    },
    {
      name: "Login",
      url: "/login",
      isDropdown: false,
    },
  ],
};

// Make a function called ResponsiveNavBar with a navbar that has the following: dropdowns, links, and a logo/brand (can be text.) You can use tailwind.
function ResponsiveNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = (index) => {
    if (dropdown === index) {
      setDropdown(false);
    } else {
      setDropdown(index);
    }
  };
  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="flex items-center justify-between flex-wrap dark:bg-gray-900 p-3 mb-3">
      {/* Brand */}
      <div className="flex items-center flex-shrink-0 text-white mr-4">
        <LinkContainer to="/">
          <a className="font-semibold text-3xl hover:text-green-400 tracking-tight font-poppins">POST[APOC]</a>
        </LinkContainer>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded bg-white hover" onClick={toggle}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
        <div className="text-sm lg:flex-grow">
          {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 mx-2 text-black dark:text-white">
            Docs
          </a> */}
          {navbarLinks.links.map((link, index) => {
            if (!link.isDropdown) {
              return (
                <LinkContainer to={link.url} key={index}>
                  <a className="block mt-2 hover:text-green-500 hover:font-bold text-md lg:inline-block lg:mt-0 mx-2 text-black dark:text-white font-poppins font-normal">{link.name}</a>
                </LinkContainer>
              );
            } else {
              // This is a dropdown link. It should have a dropdown menu with all the sublinks. Make it with Tailwind.
              return (
                <div key={index} className="block mt-2 text-md lg:inline-block lg:mt-0 mx-2 text-black dark:text-white font-poppins">
                  <button className="text-sm" onClick={() => toggleDropdown(index)}>
                    {link.name}
                  </button>
                  <div className={`${dropdown === index ? "block" : "hidden"}`}>
                    <div key={index} className="lg:bg-white lg:absolute lg:text-black lg:text-left lg:border lg:border-gray-900 lg:rounded-lg">
                      {link.dropdownLinks.map((dropdownLink, index) => {
                        return (
                          <LinkContainer to={dropdownLink.url} key={index}>
                            <a className="block mt-2 hover:text-green-500 hover:font-bold text-md lg:inline-block lg:mt-0 mx-2 text-black dark:text-white font-poppins font-normal">
                              {dropdownLink.name}
                            </a>
                          </LinkContainer>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveNavBar;
