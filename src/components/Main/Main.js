import Header from '../Header/Header.js';

const Main = (props) => {
  const { activeSchedule, setCoursePopup, setSchedules, setLecturePopup } =
    props;

  return (
    <>
      <main className="Main">
        <Header setCoursePopup={setCoursePopup} />
        {activeSchedule ? (
          <section className="main-content">
            <section className="btns">
              <h2>Lezioni</h2>
              <button onClick={() => setLecturePopup(true)}>+ Lezione</button>
            </section>
            {activeSchedule.lections.map((lecture) => {
              const [date, time] = lecture.startDate.split('T'); // Разделяем дату и время
              return (
                <div key={lecture.id} className="lecture-card">
                  <h3>{lecture.title}</h3>
                  <p>
                    <strong>Data:</strong> {date}
                  </p>
                  <p>
                    <strong>Ore:</strong> {time}
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
              );
            })}
          </section>
        ) : (
          <p>Select a schedule to see its lectures</p>
        )}
      </main>
    </>
  );
};

export default Main;
