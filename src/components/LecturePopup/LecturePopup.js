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
    startTime: '',
    duration: {
      hours: 1,
      minutes: 0,
    },
    reminder: 30,
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Обрабатываем duration отдельно
    if (name === 'durationHours' || name === 'durationMinutes') {
      let numericValue = parseInt(value, 10) || 0;

      // Ограничения для часов и минут
      if (name === 'durationHours') {
        numericValue = numericValue > 24 ? 24 : numericValue; // Ограничиваем до 24
      } else if (name === 'durationMinutes') {
        numericValue = numericValue > 59 ? 59 : numericValue; // Ограничиваем до 59
      }

      setLectureData({
        ...lectureData,
        duration: {
          ...lectureData.duration,
          [name === 'durationHours' ? 'hours' : 'minutes']: numericValue,
        },
      });
    } else {
      // Стандартная обработка для остальных полей
      setLectureData({ ...lectureData, [name]: value });
    }
  };

  // Сохранение лекции
  const handleSave = () => {
    if (lectureData.startDate && lectureData.startTime) {
      // Проверка на нулевую продолжительность
      const { hours, minutes } = lectureData.duration;
      const updatedDuration =
        (parseInt(hours, 10) || 0) + (parseInt(minutes, 10) || 0) === 0
          ? { hours: 0, minutes: 30 } // Значение по умолчанию 30 минут
          : lectureData.duration;

      const newLecture = {
        ...lectureData,
        duration: updatedDuration,
        startDate: `${lectureData.startDate}T${lectureData.startTime}`, // Объединяем дату и время
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="form-row">
            <label>Data:</label>
            <input
              type="date"
              name="startDate"
              value={lectureData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Inizio:</label>
            <input
              type="time"
              name="startTime"
              value={lectureData.start}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row duration">
            <label>Durata:</label>
            <input
              type="number"
              name="durationHours"
              value={lectureData.duration.hours.toString().padStart(2, '0')}
              onChange={handleChange}
              onBlur={(e) => {
                if (e.target.value === '') {
                  handleChange({ target: { name: 'durationHours', value: 0 } });
                }
              }}
              placeholder="00"
              min="0"
              required
            />
            :
            <input
              type="number"
              name="durationMinutes"
              value={lectureData.duration.minutes.toString().padStart(2, '0')}
              onChange={handleChange}
              onBlur={(e) => {
                if (e.target.value === '') {
                  handleChange({
                    target: { name: 'durationMinutes', value: 0 },
                  });
                }
              }}
              placeholder="00"
              min="0"
              required
            />
            <span>min.</span>
          </div>

          <div className="form-row reminder">
            <label>Promemoria:</label>
            <input
              type="number"
              name="reminder"
              value={lectureData.reminder}
              onChange={handleChange}
              placeholder="00"
              min="1"
            />
            <span>min.</span>
          </div>

          <div className="field-column">
            <label>Locazione:</label>
            <input
              type="text"
              name="location"
              value={lectureData.location}
              onChange={handleChange}
            />
          </div>

          <div className="field-column">
            <label>Descrizione:</label>
            <textarea
              name="description"
              value={lectureData.description}
              onChange={handleChange}
            />
          </div>

          <div className="popup-actions">
            <button type="submit">Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LecturePopup;
