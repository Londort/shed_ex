const Aside = (props) => {
  const { schedules, selectSchedule } = props;

  return (
    <section className="Aside">
      <div className="logo">
        <h1>ShedEx</h1>
      </div>
      <div className="courses">
        <fieldset>
          <legend>Corsi:</legend>
          <ul>
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <li key={schedule.id} onClick={() => selectSchedule(schedule)}>
                  {schedule.caption}
                </li>
              ))
            ) : (
              <p>Niente corsi presenti</p>
            )}
          </ul>
        </fieldset>
      </div>
    </section>
  );
};

export default Aside;
