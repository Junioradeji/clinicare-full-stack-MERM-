import Logo from "./Logo";
import { NavLink, useLocation, useNavigate } from "react-router";
import { navLinks, roleBasedPathPermissions } from "@/utils/constant";
import { useEffect } from "react";
// import LogoutModal from "./LogoutModal";
import Logout from "./Logout";

export default function Sidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate ();
  const path = location.pathname;
  const roles = ["patient", "doctor", "admin", "nurse", "staff"];
  //match user role based of our roles array using the find method
  const userRole = roles.find((role) => role === user?.role);
  //check if the user role matches any of the allowed subpaths in our roleBasedPathPermissions object
  const isAuthorized =
    (userRole === "admin" && roleBasedPathPermissions.admin.allowedSubpaths) ||
    (userRole === "doctor" &&
      roleBasedPathPermissions.doctor.allowedSubpaths) ||
    (userRole === "patient" &&
      roleBasedPathPermissions.patient.allowedSubpaths) ||
    (userRole === "nurse" && roleBasedPathPermissions.nurse.allowedSubpaths) ||
    (userRole === "staff" && roleBasedPathPermissions.staff.allowedSubpaths);

    useEffect(() => {
    const allowedPaths =
      roleBasedPathPermissions[userRole]?.allowedSubpaths || [];
    const isPathAllowed = allowedPaths.includes(path);
    if (!isAuthorized || !isPathAllowed) {
      navigate("/dashboard");
    }
  }, [isAuthorized, navigate, path, userRole]);

  return (
    <div className="hidden lg:block fixed z-50 min-h-screen w-[200px] bg-slate-100 pt-5 mx-4 ">
      <div className="pb-6">
        <Logo />
      </div>
      {/* Nav Links (Scrollable) */}
      <div className="overflow-y-auto h-[calc(100vh-150px)] space-y-4 p-1">
        {navLinks.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold text-gray-500 mb-6">
              {section.title === "Management" && userRole === "patient"
                ? ""
                : section.title}
            </p>
            <div className="space-y-4">
              {section.links
                .filter((subpaths) => {
                  if (
                    roleBasedPathPermissions[userRole] &&
                    isAuthorized.includes(subpaths.to)
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.to}
                    className={({ isActive }) =>
                      `${
                        isActive || path.split("/")[2] === link.to
                          ? "bg-blue-100 text-blue-500 font-bold rounded-full py-2 px-8 flex gap-4"
                          : "text-black flex gap-4"
                      }`
                    }
                    viewTransition
                    end
                  >
                    <link.Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </NavLink>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
}
