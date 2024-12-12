import { useState } from 'react';

const EditLecturePopup = ({ lecture, onSave, onClose }) => {
  // Локальное состояние для редактируемых данных лекции
  const [editedLecture, setEditedLecture] = useState({ ...lecture });

  // Обновление полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLecture({ ...editedLecture, [name]: value });
  };

  // Сохранение изменений
  const handleSave = () => {
    onSave(editedLecture);
  };

  return (
    <div className="Popup">
      <div className="popup-content">
        <h2>Modificare {lecture.title}</h2>

        <div className="form-row">
          <label>Date:</label>
          <input
            type="date"
            name="startDate"
            value={editedLecture.startDate.split('T')[0]}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Time:</label>
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

        <div className="form-row">
          <label>Reminder:</label>
          <input
            type="number"
            name="reminder"
            value={editedLecture.reminder}
            onChange={handleChange}
            min="1"
          />
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
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditLecturePopup;
