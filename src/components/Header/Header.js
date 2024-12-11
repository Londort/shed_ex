import { CgProfile } from 'react-icons/cg';

const Header = (props) => {
  const { setCoursePopup } = props;

  return (
    <header className="Header">
      <div className="subHeader">
        <button className="addNew" onClick={() => setCoursePopup(true)}>
          Add New
        </button>
        <div className="login">
          <CgProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
