import { useParams, useNavigate } from 'react-router-dom';
import { SlArrowLeftCircle } from 'react-icons/sl';

const ScheduleDetails = ({ schedules }) => {
  const { id } = useParams(); // Получаем ID из параметра маршрута
  const navigate = useNavigate();

  // Находим объект schedule по ID
  const schedule = schedules.find((s) => s.id === id);

  if (!schedule) {
    return <div>Schedule not found!</div>;
  }

  return (
    <div className="ScheduleDetails">
      <header>
        <SlArrowLeftCircle onClick={() => navigate('/')} title="Go Back" />
      </header>
      <h2>{schedule.caption}</h2>
      <h3>Lections:</h3>
      <ul>
        {schedule.lections.map((lecture) => (
          <li key={lecture.id}>
            <p>
              <strong>Title:</strong> {lecture.title}
            </p>
            <p>
              <strong>Start Date:</strong> {lecture.startDate}
            </p>
            <p>
              <strong>Reminder:</strong> {lecture.reminder} minutes before
            </p>
            <p>
              <strong>Location:</strong> {lecture.location}
            </p>
            <p>
              <strong>Description:</strong> {lecture.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleDetails;
