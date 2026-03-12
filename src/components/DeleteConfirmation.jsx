const DeleteConfirmation = ({ student, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal modal-small">
        <h2>⚠️ Confirm Delete</h2>
        <p>Are you sure you want to delete <strong>{student.name}</strong>?</p>
        <p className="warning-text">This action cannot be undone.</p>
        <div className="form-actions">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;