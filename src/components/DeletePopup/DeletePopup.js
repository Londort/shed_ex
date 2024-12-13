const DeletePopup = ({ onConfirm, onCancel, lectureTitle }) => {
  return (
    <div className="DeletePopup">
      <div className="popup-content">
        <h4>
          Eliminare <span>"{lectureTitle}"</span>?
        </h4>
        {/* <h4>eliminare ?</h4> */}
        <div className="popup-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
