import "./Header.scss";
import logo from "../../assets/Logo/BrainFlix-logo.svg";
import avatar from "../../assets/Images/Mohan-muruge.jpg";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="header__logo-container">
          <Link className="header__logo-link" to="/">
            <img
              className="header__logo-image"
              src={logo}
              alt="brainflix-logo"
            />
          </Link>
        </div>

        <div className="header__content">
          <input
            className="header__search-input"
            type="text"
            id="search"
            name="search"
            placeholder="Search"
          />
          <img src={avatar} className="header__avatar" />
          <Link className="header__upload" to="/upload">
            UPLOAD
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
