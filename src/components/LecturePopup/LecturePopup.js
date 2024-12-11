import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LecturePopup = ({
  onClose,
  activeSchedule,
  setSchedules,
  setActiveSchedule,
}) => {
  // Состояние для формы лекции
  const [lectureData, setLectureData] = useState({
    id: uuidv4(),
    title: `Lezione ${activeSchedule.lections.length + 1}`, // Автоматическое название лекции
    startDate: '',
    time: '',
    reminder: 30,
    location: '',
    description: '',
  });

  // Обновление полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData({ ...lectureData, [name]: value });
  };

  // Сохранение лекции
  const handleSave = () => {
    if (lectureData.startDate && lectureData.time) {
      const newLecture = {
        ...lectureData,
        startDate: `${lectureData.startDate}T${lectureData.time}`, // Объединяем дату и время
      };

      // Обновляем schedules
      setSchedules((prevSchedules) => {
        const updatedSchedules = prevSchedules.map((schedule) =>
          schedule.id === activeSchedule.id
            ? { ...schedule, lections: [...schedule.lections, newLecture] }
            : schedule
        );

        // Обновляем activeSchedule синхронно
        const updatedActiveSchedule = updatedSchedules.find(
          (schedule) => schedule.id === activeSchedule.id
        );
        setActiveSchedule(updatedActiveSchedule);

        return updatedSchedules;
      });

      onClose(); // Закрыть попап
    }
  };

  return (
    <div className="Popup">
      <div className="popup-content">
        <h2>Lezione {activeSchedule.lections.length + 1}</h2>

        <div className="form-row">
          <label>Date:</label>
          <input
            type="date"
            name="startDate"
            value={lectureData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={lectureData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row reminder">
          <label>Reminder:</label>
          <input
            type="number"
            name="reminder"
            value={lectureData.reminder}
            onChange={handleChange}
            min="1"
          />
          <span>minuti</span>
        </div>

        <div className="field-column">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={lectureData.location}
            onChange={handleChange}
          />
        </div>

        <div className="field-column">
          <label>Description:</label>
          <textarea
            name="description"
            value={lectureData.description}
            onChange={handleChange}
          />
        </div>

        <div className="popup-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LecturePopup;
