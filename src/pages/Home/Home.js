import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Main from '../../components/Main/Main.js';
import Aside from '../../components/Aside/Aside.js';
import CoursePopup from '../../components/CoursePopup/CoursePopup.js';
import LecturePopup from '../../components/LecturePopup/LecturePopup.js';

const Home = (props) => {
  const { schedules, setSchedules } = props;
  const [activeSchedule, setActiveSchedule] = useState(null);
  const [coursePopup, setCoursePopup] = useState(false);
  const [lecturePopup, setLecturePopup] = useState(false);

  const handleSelectSchedule = (schedule) => {
    setActiveSchedule(schedule);
  };

  const addSchedule = (caption) => {
    const newSchedule = {
      id: uuidv4(), // Генерация id (можно использовать uuid)
      caption,
      lections: [], // Пустой массив лекций
    };
    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
    setCoursePopup(false); // Закрыть попап после сохранения
  };

  console.log(activeSchedule);

  return (
    <section className="Home">
      <Aside schedules={schedules} selectSchedule={handleSelectSchedule} />
      <Main
        activeSchedule={activeSchedule}
        setSchedules={setSchedules}
        setCoursePopup={setCoursePopup}
        setLecturePopup={setLecturePopup}
      />
      {coursePopup && (
        <CoursePopup
          addSchedule={addSchedule}
          onClose={() => setCoursePopup(false)}
        />
      )}
      {lecturePopup && (
        <LecturePopup
          activeSchedule={activeSchedule}
          setSchedules={setSchedules}
          setActiveSchedule={setActiveSchedule}
          onClose={() => setLecturePopup(false)}
        />
      )}
    </section>
  );
};

export default Home;
