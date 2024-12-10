const Schedule = (props) => {
  const { schedule } = props;
  console.log(schedule);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="Schedule">
      <h3>{schedule.caption}</h3>
      <ul>
        <li>
          <span>Start: </span>
          {schedule.lections.length > 0
            ? formatDateTime(schedule.lections[0].startDate)
            : 'No date available'}
        </li>
        <li>
          <span>Lections: </span>
          {schedule.lections.length}
        </li>
      </ul>
    </div>
  );
};

export default Schedule;
