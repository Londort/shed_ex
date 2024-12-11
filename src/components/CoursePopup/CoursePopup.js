import { useState } from 'react';

const CoursePopup = ({ addSchedule, onClose }) => {
  const [caption, setCaption] = useState(''); // Состояние для caption

  const handleSave = () => {
    if (caption.trim()) {
      addSchedule(caption); // Передаём caption в функцию добавления
    }
  };

  return (
    <div className="Popup">
      <div className="popup-content">
        <h2>Create New Course</h2>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter course caption"
        />
        <div className="popup-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CoursePopup;
