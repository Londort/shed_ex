import { useState } from 'react';

const CoursePopup = ({ addSchedule, onClose }) => {
  const [caption, setCaption] = useState(''); // Состояние для caption

  const handleSave = () => {
    if (caption.trim()) {
      addSchedule(caption); // Передаём caption в функцию добавления
    }
  };

  return (
    <div className="CoursePopup">
      <div className="popup-content">
        <h2>Nuovo corso</h2>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Nome del corso"
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
