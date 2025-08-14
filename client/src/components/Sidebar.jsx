import Logo from "./Logo";
import { NavLink } from "react-router"; 
import { navLinks } from "@/utils/constant";
// import LogoutModal from "./LogoutModal";
import Logout from "./Logout";

export default function Sidebar() {
  return (
    <div className="hidden lg:block fixed z-50 min-h-screen w-[200px] bg-slate-100 pt-5   ">
      <Logo classname="mt-2" />

      
      <div className="overflow-y-auto h-[calc(100vh-150px)]  space-y-4 p-1">
  {navLinks.map((section) => (
    <div key={section.title}>
      <p className="text-xs font-semibold text-gray-500 my-2">
        {section.title}
      </p>
      <div className="space-y-1">
        {section.links.map((link) => (
          <NavLink
            key={link.id}
            to={link.to}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-300 font-bold text-white" : ""
              }  px-2 py-2 rounded-full hover:bg-blue-200 text-gray-700 flex items-center gap-2`
            }
            viewTransition
            end
          >
            {link.Icon && <link.Icon className="w-5 h-5" />}
          
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  ))}
</div>

     
      <div className="absolute bottom-4 w-full">
        <Logout /> 
        
      </div>
    </div>
  );
}