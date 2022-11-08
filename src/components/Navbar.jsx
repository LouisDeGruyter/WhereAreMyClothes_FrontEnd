import { memo } from 'react';
import {
  IoSunny,
  IoStarSharp
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {  themes  } from "../contexts/Theme.context";

const NavItem = ({ label, to }) => {
  /* const { oppositeTheme } = useThemeColors(); */

  return (
    <li className="nav-item">
      <Link
        to={to}
        className={`nav-link active text-`}
      >
        {label}
      </Link>
    </li>
  );
};

export default memo(function Navbar() {
 {/* const { theme, toggleTheme } = useTheme(); */}
  const theme= themes.dark
  return (
    <nav className={`navbar navbar-expand-lg bg- mb-4`}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem label="Kleerkasten" to="/kleerkasten" />
            <NavItem label="Kleren" to="/kleren" />
          </ul>
          <div className="d-flex">
            <button type="button"  > {/*onClick={toggle theme}  */}
                {
                    theme === themes.dark ? <IoStarSharp /> : <IoSunny />
                }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
})