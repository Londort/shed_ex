import { useState } from 'react';

const ScheduleInput = () => {
  const [title, setTitle] = useState(''); // Название лекции
  const [startDate, setStartDate] = useState(''); // Дата и время начала
  const [endDate, setEndDate] = useState(''); // Дата и время окончания
  const [location, setLocation] = useState(''); // Местоположение
  const [description, setDescription] = useState(''); // Описание

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      startDate,
      endDate,
      location,
      description,
    });
  };

  return (
    <form className="ScheduleInput" onSubmit={handleSubmit}>
      <button className="delete">Delete</button>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lecture title"
          required
        />
      </label>
      <label>
        Start Date & Time:
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date & Time:
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (optional)"
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter additional details"
        ></textarea>
      </label>
    </form>
  );
};

export default ScheduleInput;
