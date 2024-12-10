const ScheduleInput = ({ data, updateLecture, deleteLecture }) => {
  return (
    <div className="ScheduleInput">
      <button type="button" onClick={() => deleteLecture(data.id)}>
        Delete Lecture
      </button>
      <label>
        Title:
        <input
          type="text"
          value={data.title}
          onChange={(e) => updateLecture(data.id, 'title', e.target.value)}
          placeholder="Enter lecture title"
          required
        />
      </label>
      <label>
        Start Date & Time:
        <input
          type="datetime-local"
          value={data.startDate}
          onChange={(e) => updateLecture(data.id, 'startDate', e.target.value)}
          required
        />
      </label>
      <label>
        Reminder (minutes):
        <input
          type="number"
          value={data.reminder}
          onChange={(e) => updateLecture(data.id, 'reminder', e.target.value)}
          min="1"
          max="1440"
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={data.location}
          onChange={(e) => updateLecture(data.id, 'location', e.target.value)}
          placeholder="Enter location"
        />
      </label>
      <label>
        Description:
        <textarea
          value={data.description}
          onChange={(e) =>
            updateLecture(data.id, 'description', e.target.value)
          }
          placeholder="Enter description"
        ></textarea>
      </label>
    </div>
  );
};

export default ScheduleInput;
