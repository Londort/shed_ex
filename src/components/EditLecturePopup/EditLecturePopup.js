import { useState } from 'react';

const EditLecturePopup = ({ lecture, onSave, onClose }) => {
  // Локальное состояние для редактируемых данных лекции
  const [editedLecture, setEditedLecture] = useState({ ...lecture });

  // Обновление полей формы

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Обработка duration отдельно
    if (name === 'durationHours' || name === 'durationMinutes') {
      let numericValue = parseInt(value, 10) || 0;

      // Ограничения для часов и минут
      if (name === 'durationHours') {
        numericValue = numericValue > 24 ? 24 : numericValue; // Ограничиваем до 24
      } else if (name === 'durationMinutes') {
        numericValue = numericValue > 59 ? 59 : numericValue; // Ограничиваем до 59
      }

      setEditedLecture({
        ...editedLecture,
        duration: {
          ...editedLecture.duration,
          [name === 'durationHours' ? 'hours' : 'minutes']: numericValue,
        },
      });
    } else {
      // Обновление других полей
      setEditedLecture({ ...editedLecture, [name]: value });
    }
  };

  // Сохранение изменений
  const handleSave = () => {
    const { hours, minutes } = editedLecture.duration;

    // Проверка на нулевую длительность
    const updatedDuration =
      (parseInt(hours, 10) || 0) + (parseInt(minutes, 10) || 0) === 0
        ? { hours: 0, minutes: 30 } // Устанавливаем 30 минут по умолчанию
        : {
            hours: parseInt(hours, 10) || 0,
            minutes: parseInt(minutes, 10) || 0,
          };

    // Обновляем лекцию с исправленной длительностью
    const updatedLecture = {
      ...editedLecture,
      duration: updatedDuration,
    };

    onSave(updatedLecture); // Сохранение лекции
  };

  return (
    <div className="Popup">
      <div className="popup-content">
        <h2>Modificare {lecture.title}</h2>
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
              value={editedLecture.startDate.split('T')[0]}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Inizio:</label>
            <input
              type="time"
              name="time"
              value={editedLecture.startDate.split('T')[1]}
              onChange={(e) =>
                setEditedLecture({
                  ...editedLecture,
                  startDate: `${editedLecture.startDate.split('T')[0]}T${
                    e.target.value
                  }`,
                })
              }
              required
            />
          </div>

          <div className="form-row duration">
            <label>Durata:</label>
            <input
              type="number"
              name="durationHours"
              value={
                editedLecture.duration.hours?.toString().padStart(2, '0') ||
                '00'
              }
              onChange={handleChange}
              min="0"
              required
            />
            :
            <input
              type="number"
              name="durationMinutes"
              value={
                editedLecture.duration.minutes?.toString().padStart(2, '0') ||
                '00'
              }
              onChange={handleChange}
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
              value={editedLecture.reminder}
              onChange={handleChange}
              min="1"
            />
            <span>min.</span>
          </div>

          <div className="field-column">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={editedLecture.location}
              onChange={handleChange}
            />
          </div>

          <div className="field-column">
            <label>Description:</label>
            <textarea
              name="description"
              value={editedLecture.description}
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

export default EditLecturePopup;
