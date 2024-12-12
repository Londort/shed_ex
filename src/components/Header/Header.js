import { CgProfile } from 'react-icons/cg';
import { FiPlusCircle, FiPlus } from 'react-icons/fi';

const Header = (props) => {
  const { setCoursePopup } = props;

  return (
    <header className="Header">
      <div className="subHeader">
        <button
          title="Creare Corso"
          className="addNew"
          onClick={() => setCoursePopup(true)}
        >
          <FiPlus /> Corso
        </button>
        <div className="login">
          <CgProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
