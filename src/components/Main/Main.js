import { useNavigate } from 'react-router-dom';
import Schedule from '../Schedule/Schedule.js';

const Main = (props) => {
  const { schedules } = props;
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/schedule/${id}`);
  };

  return (
    <main className="Main">
      {schedules &&
        schedules.map((schedule) => (
          <div key={schedule.id} onClick={() => handleClick(schedule.id)}>
            <Schedule schedule={schedule} />
          </div>
        ))}
    </main>
  );
};

export default Main;
