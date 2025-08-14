import Contact from "@/components/Contact";
import Logo from "@/components/Logo"
import { RiCopyrightFill } from "@remixicon/react"
import { NavLink, Link, Outlet } from "react-router"


export default function RootLayout() {
  return (
    <div>
    {/* don't use your max-width on the fixed div unless it won't work */}
    <div className="fixed top-0 left-0 right-0 bg-slate-100">
      <div className="container mx-auto py-5 px-4 flex justify-between items-center">
        <Logo/>

<div className="justify-between space-x-10 hidden md:block">
    <NavLink>Features</NavLink>
            <NavLink to={""}>How It Works</NavLink>
            <NavLink><Contact /></NavLink>
            </div>
 <Link to="/account/signin" className="btn bg-blue-500 text-white font-normal ">Get Started</Link>
        
    </div>


    </div>
    <Outlet/>
    <div className="container mx-auto py-5 px-4 bg-[#0232A2]">
        <div className="flex justify-center text-white  gap-1 md:justify-start">
            <RiCopyrightFill size={18}/>
            <span className="text-sm">{new Date().getFullYear()} Clinicare.All rights reserved.</span>
        </div>
    </div>
    </div>
  );
}