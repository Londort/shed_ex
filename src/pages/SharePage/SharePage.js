import { useParams } from 'react-router-dom';

const SharePage = ({ schedules }) => {
  const { id } = useParams(); // Получаем id курса из URL
  const schedule = schedules.find((item) => item.id === id);

  if (!schedule) {
    return <h2>Course not found!</h2>;
  }

  return (
    <div className="SharePage">
      <header className="share-header">
        <h1>{schedule.caption}</h1>
      </header>
      <section className="lecture-list">
        {schedule.lections.length > 0 ? (
          schedule.lections.map((lecture) => (
            <div key={lecture.id} className="lecture-card">
              <h3>{lecture.title}</h3>
              <p>
                <strong>Data:</strong> {lecture.startDate.split('T')[0]}
              </p>
              <p>
                <strong>Ore:</strong> {lecture.startDate.split('T')[1]}
              </p>
              <p>
                <strong>Reminder:</strong> {lecture.reminder} minutes
              </p>
              <p>
                <strong>Locazione:</strong> {lecture.location}
              </p>
              <p>
                <strong>Descrizione:</strong> {lecture.description}
              </p>
            </div>
          ))
        ) : (
          <p>No lectures available.</p>
        )}
      </section>
    </div>
  );
};

export default SharePage;
