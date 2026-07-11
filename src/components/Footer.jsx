import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#060606ef]">
      <div className="h-[50px] flex justify-center items-center text-teal-500 border-t-2 shadow-2xl border-slate-500 p-4">
        <ul className=" ">
          <li
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <FaFacebookSquare className="h-4 w-4 rounded-full" />
          </li>
          <li
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <FaTwitterSquare className="h-4 w-4 rounded-full" />
          </li>
          <li
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <FaLinkedin className="h-4 w-4 rounded-full" />
          </li>
          <li
            className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
          >
            <FaInstagramSquare className="h-4 w-4 rounded-full" />
          </li>
        </ul>
      </div>
      <div className="text-white text-center border-t-[1px] border-slate-500 font-thin text-xs py-2 px-4 md:font-medium md:text-base">
        This project will not be possible without the help of Ms. Michelle from
        KodeGo <br />
        &copy; 2023 Glenn Ladrido - WD20P Student <br />
        All Rights Reserve
      </div>
    </footer>
  );
};

export default Footer;
