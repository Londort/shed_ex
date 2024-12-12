import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import EditLecturePopup from '../EditLecturePopup/EditLecturePopup.js';
import DeletePopup from '../DeletePopup/DeletePopup.js';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { IoShareSocialOutline } from 'react-icons/io5';

const Main = ({
  activeSchedule,
  setActiveSchedule,
  setSchedules,
  setCoursePopup,
  setLecturePopup,
}) => {
  const [editLecture, setEditLecture] = useState(null); // Лекция для редактирования
  const [deleteLecture, setDeleteLecture] = useState(null); // Лекция для удаления
  const [deleteCourse, setDeleteCourse] = useState(null); // Курс для удаления
  const navigate = useNavigate(); // Для навигации на страницу просмотра курса

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

    setActiveSchedule((prevActive) => ({
      ...prevActive,
      lections: prevActive.lections.filter(
        (lecture) => lecture.id !== deleteLecture.id
      ),
    }));

    setDeleteLecture(null);
  };

  // Функция удаления курса
  const handleDeleteCourse = () => {
    setSchedules((prevSchedules) =>
      prevSchedules.filter((schedule) => schedule.id !== deleteCourse.id)
    );

    setActiveSchedule(null); // Сбрасываем активный курс
    setDeleteCourse(null); // Закрываем попап
  };

  // Логика для API "поделиться" или копирования ссылки
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/share/${activeSchedule.id}`;
    const title = `Course: ${activeSchedule.caption}`;

    // Проверяем, поддерживается ли navigator.share
    if (navigator.share) {
      navigator.share({
        title,
        text: 'Check out this course:',
        url: shareUrl,
      });
    } else {
      // Если API не поддерживается – копируем ссылку
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <main className="Main">
        <Header setCoursePopup={setCoursePopup} />
        {activeSchedule ? (
          <section className="main-content">
            {/* Заголовок курса и кнопки */}
            <section className="caption">
              <div className="course-caption">
                <h2>{activeSchedule.caption}</h2>
                <MdOutlineCancel
                  title="Eliminare Corso"
                  onClick={() => setDeleteCourse(activeSchedule)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="btns">
                <button
                  className="new-lection"
                  title="Aggiungere Lezione"
                  onClick={() => setLecturePopup(true)}
                >
                  <FiPlus /> Lezione
                </button>
                <button
                  title="Condividere"
                  className="share"
                  onClick={() => handleShare()}
                >
                  <IoShareSocialOutline />
                </button>
              </div>
            </section>

            {/* Список лекций */}
            <section className="lection-list">
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
                    title="Eliminare Lezione"
                    style={{ cursor: 'pointer' }}
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

      {/* Попап подтверждения удаления лекции */}
      {deleteLecture && (
        <DeletePopup
          lectureTitle={deleteLecture.title}
          onConfirm={handleDeleteLecture}
          onCancel={() => setDeleteLecture(null)}
        />
      )}

      {/* Попап подтверждения удаления курса */}
      {deleteCourse && (
        <DeletePopup
          lectureTitle={deleteCourse.caption}
          onConfirm={handleDeleteCourse}
          onCancel={() => setDeleteCourse(null)}
        />
      )}
    </>
  );
};

export default Main;
