import { useState } from 'react';
import Header from '../Header/Header.js';
import EditLecturePopup from '../EditLecturePopup/EditLecturePopup.js';
import DeletePopup from '../DeletePopup/DeletePopup.js';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';

const Main = ({
  activeSchedule,
  setActiveSchedule,
  setSchedules,
  setCoursePopup,
  setLecturePopup,
}) => {
  const [editLecture, setEditLecture] = useState(null); // Текущая лекция для редактирования
  const [deleteLecture, setDeleteLecture] = useState(null); // Лекция для удаления

  // Функция сохранения изменений лекции
  const handleSaveLecture = (updatedLecture) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === activeSchedule.id
          ? {
              ...schedule,
              lections: schedule.lections.map((lecture) =>
                lecture.id === updatedLecture.id ? updatedLecture : lecture
              ),
            }
          : schedule
      )
    );

    // Обновляем activeSchedule напрямую
    setActiveSchedule((prevActive) => ({
      ...prevActive,
      lections: prevActive.lections.map((lecture) =>
        lecture.id === updatedLecture.id ? updatedLecture : lecture
      ),
    }));

    setEditLecture(null);
  };

  // Функция удаления лекции
  const handleDeleteLecture = () => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === activeSchedule.id
          ? {
              ...schedule,
              lections: schedule.lections.filter(
                (lecture) => lecture.id !== deleteLecture.id
              ),
            }
          : schedule
      )
    );

    // Обновляем activeSchedule
    setActiveSchedule((prevActive) => ({
      ...prevActive,
      lections: prevActive.lections.filter(
        (lecture) => lecture.id !== deleteLecture.id
      ),
    }));

    setDeleteLecture(null); // Закрыть попап
  };

  return (
    <>
      <main className="Main">
        <Header setCoursePopup={setCoursePopup} />
        {activeSchedule ? (
          <section className="main-content">
            <section className="btns">
              <h2>Lezioni</h2>
              <button onClick={() => setLecturePopup(true)}>
                <FiPlus /> Lezione
              </button>
            </section>
            {activeSchedule.lections.map((lecture) => (
              <div
                key={lecture.id}
                className="lecture-card"
                onClick={() => setEditLecture(lecture)}
              >
                <MdOutlineCancel
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteLecture(lecture);
                  }}
                />
                <h3>{lecture.title}</h3>
                <p>
                  <strong>Data:</strong> {lecture.startDate.split('T')[0]}
                </p>
                <p>
                  <strong>Ore:</strong> {lecture.startDate.split('T')[1]}
                </p>
                <p>
                  <strong>Reminder:</strong> {lecture.reminder} minutes
                </p>
                <p>
                  <strong>Locazione:</strong> {lecture.location}
                </p>
                <p>
                  <strong>Descrizione:</strong> {lecture.description}
                </p>
              </div>
            ))}
          </section>
        ) : (
          <p>Select a schedule to see its lectures</p>
        )}
      </main>

      {/* Попап для редактирования лекции */}
      {editLecture && (
        <EditLecturePopup
          lecture={editLecture}
          onSave={handleSaveLecture}
          onClose={() => setEditLecture(null)}
        />
      )}

      {/* Попап подтверждения удаления */}
      {deleteLecture && (
        <DeletePopup
          lectureTitle={deleteLecture.title}
          onConfirm={handleDeleteLecture}
          onCancel={() => setDeleteLecture(null)}
        />
      )}
    </>
  );
};

export default Main;
