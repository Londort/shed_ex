import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SlArrowLeftCircle } from 'react-icons/sl';
import ScheduleInput from '../../components/ScheduleInput/ScheduleInput';

const AddNew = ({ addSchedule }) => {
  const navigate = useNavigate();

  // Состояние для caption и массива лекций
  const [caption, setCaption] = useState('');
  const [lections, setLections] = useState([
    {
      id: uuidv4(),
      title: '',
      startDate: '',
      reminder: 30,
      location: '',
      description: '',
    },
  ]);

  // Добавление новой лекции
  const addLecture = () => {
    const newLecture = {
      id: uuidv4(),
      title: '',
      startDate: '',
      reminder: 30,
      location: '',
      description: '',
    };
    setLections([...lections, newLecture]);
  };

  // Обновление лекции
  const updateLecture = (id, field, value) => {
    setLections(
      lections.map((lecture) =>
        lecture.id === id ? { ...lecture, [field]: value } : lecture
      )
    );
  };

  // Удаление лекции
  const deleteLecture = (id) => {
    setLections(lections.filter((lecture) => lecture.id !== id));
  };

  // Отправка нового schedule
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = {
      id: uuidv4(),
      caption,
      lections,
    };
    addSchedule(newSchedule);
    navigate('/');
  };

  return (
    <div className="AddNew">
      <header>
        <SlArrowLeftCircle onClick={() => navigate('/')} title="Go Back" />
        <h2>Nuovo Corso</h2>
      </header>
      <main>
        <div className="caption">
          <label>
            Nome del corso:
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter schedule caption"
              required
            />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          {lections.map((lecture) => (
            <ScheduleInput
              key={lecture.id}
              data={lecture}
              updateLecture={updateLecture}
              deleteLecture={deleteLecture}
            />
          ))}
          <div className="btns">
            <button className="add-more" type="button" onClick={addLecture}>
              + Add More
            </button>
            <button className="save" type="submit">
              Save Schedule
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNew;
