import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="Header">
      <h1>SchedEx</h1>
      <div className="subHeader">
        <button className="addNew" onClick={() => navigate('/add-new')}>
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
