import AppLogo from "./AppLogo.jsx";

function Navbar() {

    return (
      <div className="Navbar">
          <nav>
              <div className="max-w-screen-xl h-1/6 flex grid-rows-1 flex-wrap items-center justify-between mx-auto p-4 overflow-x-hidden">
                  <div>
                      <a href="#" className="flex items-center space-x-0 rtl:space-x-reverse">
                          <AppLogo />
                      </a>
                  </div>
  
                  <div className="w-auto grid-rows-1 sm:block sm:w-auto">
                          <ul className="flex text-2xl sm:space-x-8 space-x-0 sm:text-5xl font-jomhuria">
                              <li>
                                  <a href="#" className="block py-2 px-3 text-white md:hover:bg-transparent border-0 sm:hover:text-orange duration-500">Restaurants</a>
                              </li>
                          </ul>
                  </div>
              </div>
          </nav>
      </div>
    );
  }
  
  export default Navbar;