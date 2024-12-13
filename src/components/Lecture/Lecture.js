import { MdOutlineCancel } from 'react-icons/md';

const Lecture = ({ lecture, setEditLecture, setDeleteLecture }) => {
  return (
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
        <strong>Data:</strong> {lecture.startDate.split('T')[0]}{' '}
        {lecture.startDate.split('T')[1]}
      </p>
      {/* <p>
        <strong>Inizio:</strong> {lecture.startDate.split('T')[1]}
      </p> */}
      <p>
        <strong>Durata:</strong>{' '}
        {lecture.duration.hours.toString().padStart(2, '0')}
        {' : '}
        {lecture.duration.minutes.toString().padStart(2, '0')} ore
      </p>
      <p>
        <strong>Promemoria:</strong> {lecture.reminder} min.
      </p>
      <p>
        <strong>Locazione:</strong> {lecture.location}
      </p>
      <p>
        <strong>Descrizione:</strong> {lecture.description}
      </p>
    </div>
  );
};

export default Lecture;
