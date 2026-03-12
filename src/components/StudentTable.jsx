const StudentTable = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No students found</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td className="actions">
                <button
                  onClick={() => onEdit(student)}
                  className="btn btn-edit"
                  title="Edit Student"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(student)}
                  className="btn btn-delete"
                  title="Delete Student"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;