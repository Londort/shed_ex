const DeletePopup = ({ onConfirm, onCancel, lectureTitle }) => {
  return (
    <div className="Popup">
      <div className="popup-content">
        <h3>Eliminare {lectureTitle} ?</h3>
        <div className="popup-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
