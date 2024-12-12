const DeletePopup = ({ lectureTitle, onConfirm, onCancel }) => {
  return (
    <div className="Popup">
      <div className="popup-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete <strong>{lectureTitle}</strong>?
        </p>
        <div className="popup-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
