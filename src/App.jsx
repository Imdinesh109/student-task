import { useState, useEffect } from 'react';
// import StudentTable from './components/StudentTable';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import LoadingSpinner from './components/LoadingSpinner';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with sample data
  useEffect(() => {
    // The following is mock data which i have given to check whether the code is working or not 
    const sampleData = [
      { id: 1, name: 'Dinesh', email: 'dinesh@gmail.com', age: 20 },
      { id: 2, name: 'Chakradhar', email: 'chakradhar@gmail.com', age: 22 },
      { id: 3, name: 'Aapthamitra', email: 'aapthamitra@gmail.cim', age: 21 },
    ];
    setStudents(sampleData);
    setFilteredStudents(sampleData);
  }, []);

  // Filter students based on search
  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.age.toString().includes(searchTerm)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  // Add Student
  const handleAddStudent = (studentData) => {
    setIsLoading(true);
    setTimeout(() => {
      const newStudent = {
        ...studentData,
        id: Date.now(),
      };
      setStudents([...students, newStudent]);
      setShowForm(false);
      setIsLoading(false);
    }, 500); // Simulated loading
  };

  // Update Student
  const handleUpdateStudent = (studentData) => {
    setIsLoading(true);
    setTimeout(() => {
      setStudents(students.map(s =>
        s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s
      ));
      setEditingStudent(null);
      setShowForm(false);
      setIsLoading(false);
    }, 500);
  };

  // Delete Student
  const handleDeleteConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStudents(students.filter(s => s.id !== deleteStudent.id));
      setDeleteStudent(null);
      setIsLoading(false);
    }, 500);
  };

  // Edit Student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Download Excel
  const downloadExcel = () => {
    const dataToExport = filteredStudents.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `students_${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1> Student Management System</h1>
          <p>Manage your students data</p>
        </header>

        <div className="controls">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="button-group">
            <button
              onClick={() => {
                setEditingStudent(null);
                setShowForm(true);
              }}
              className="btn btn-primary"
            >
              Add Student
            </button>
            <button
              onClick={downloadExcel}
              className="btn btn-success"
              disabled={filteredStudents.length === 0}
            >
               Download Excel
            </button>
          </div>
        </div>

        {isLoading && <LoadingSpinner />}

        {showForm && (
          <StudentForm
            student={editingStudent}
            onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
            onCancel={() => {
              setShowForm(false);
              setEditingStudent(null);
            }}
          />
        )}

        <StudentTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={(student) => setDeleteStudent(student)}
        />

        {deleteStudent && (
          <DeleteConfirmation
            student={deleteStudent}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteStudent(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;