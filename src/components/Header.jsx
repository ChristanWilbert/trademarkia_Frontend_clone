import logo from "../assets/images/logo.png";
import Search from "./Search/Search";

const Header = () => {
  return (
    <>
      <div className="flex flex-row top-0 w-full bg-[#F8FAFE] h-[100px] items-center px-20">
        <div className="w-1/5 justify-center">
          <img className="p-3" src={logo} alt="" srcset="" />
        </div>
        <div className="w-3/5 text-left pl-5 py-3">
          <Search />
        </div>
      </div>
      <div className="w-full h-2 bg-[#EAF1FF]"></div>
    </>
  );
};
export default Header;
