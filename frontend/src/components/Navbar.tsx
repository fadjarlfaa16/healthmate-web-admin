import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Users", path: "/users" },
  { name: "Appointment", path: "/appointment" },
  { name: "Doctors", path: "/doctors" },
  { name: "Article", path: "/article" },
];

const Navbar = () => {
  const location = useLocation();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  // Create an array of refs for the nav items.
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Determine the active nav item based on the current pathname.
    const activeIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (activeIndex === -1) return;
    const activeLink = navRefs.current[activeIndex];
    if (activeLink) {
      setUnderlineStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [location.pathname]);

  return (
    <nav className="relative p-4">
      <ul className="flex space-x-6 text-gray-700 relative justify-center">
        {navItems.map((item, index) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              ref={(el) => {
                navRefs.current[index] = el;
              }}
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "hover:text-gray-900"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
        {/* Underline element */}
        <div
          className="absolute bottom-0 h-0.5 bg-gray-900 transition-all duration-300"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        ></div>
      </ul>
    </nav>
  );
};

export default Navbar;
