import { useState, useEffect, useRef, useCallback } from "react";
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
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
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

  const setRef = useCallback((el: HTMLAnchorElement | null, index: number) => {
    navRefs.current[index] = el;
  }, []);

  return (
    <nav className="relative mt-5 px-6 py-3 bg-[#e6f0fd] rounded-full max-w-max mx-auto shadow-sm">
      <ul className="flex items-center space-x-8 text-sm font-medium text-blue-700 relative">
        {navItems.map((item, index) => (
          <li key={item.name} className="relative">
            <NavLink
  to={item.path}
  ref={(el) => {
    navRefs.current[index] = el;
  }}
  className={({ isActive }) =>
    isActive
      ? "text-white bg-blue-600 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
      : "text-blue-700 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:text-blue-900"
  }
  aria-current={location.pathname === item.path ? "page" : undefined}
>
  {item.name}
</NavLink>
          </li>
        ))}
        <div
          className="absolute h-full bg-white/70 rounded-full z-[-1] transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </ul>
    </nav>
  );
};


export default Navbar;