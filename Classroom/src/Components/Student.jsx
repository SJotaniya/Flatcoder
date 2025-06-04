import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import { addStudent, deleteStudent, updateStudent } from '../Slices/StudentSlice';

export default function Student() {
  const [form, setForm] = useState({ studName: '', std: '', div: '', contact: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const studList = useSelector(state => state.students.students);
  const classList = useSelector(state => state.classrooms.classes);

  const standards = [...new Set(classList.map(cls => cls.std))];
  const divisions = classList.filter(cls => cls.std === form.std).map(cls => cls.div);

  const addClassHandler = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.contact)) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    if (isEditMode) {
      dispatch(updateStudent({ ...form, id: editId }));
    } else {
      dispatch(addStudent(form));
    }

    setForm({ studName: '', std: '', div: '', contact: '' });
    setIsEditMode(false);
    setEditId(null);
  };

  useEffect(() => {
    localStorage.setItem('studentList', JSON.stringify(studList));
  }, [studList]);

  const cancelEdit = () => {
    setForm({ name: '', std: '', div: '', contact: '' })
    setIsEditMode(false)
    setEditId(null)
  };

  const sortedStudents = [...studList].sort((a, b) => {
    const stdA = parseInt(a.std);
    const stdB = parseInt(b.std);
    if (stdA !== stdB) return stdA - stdB;
    return a.div.localeCompare(b.div);
  });

  return (
    <>
      <NavBar />
      <h1 className='text-center mt-5'>Students</h1>

      {/* Add Student Form */}
      <Form onSubmit={addClassHandler} className='d-flex justify-center align-items-center mt-5'>
        <Row>
          <Col>
            <Form.Control
              required
              placeholder="Name"
              value={form.studName}
              maxLength={30}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setForm({ ...form, studName: value });
                }
              }}
            />
          </Col>
          <Col>
            <Form.Select
              required
              value={form.std}
              onChange={(e) => setForm({ ...form, std: e.target.value, div: '' })}
            >
              <option value="">Select Standard</option>
              {standards.map(std => (
                <option key={std} value={std}>{std}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              required
              value={form.div}
              onChange={(e) => setForm({ ...form, div: e.target.value })}
              disabled={!form.std}
            >
              <option value="">Select Division</option>
              {divisions.map(div => (
                <option key={div} value={div}>{div}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              required
              placeholder="Contact Number"
              value={form.contact}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setForm({ ...form, contact: value });
                }
              }}
            />
          </Col>
          <Col className="d-flex gap-2 align-items-center">
            <button type="submit" className="btn">
              <FaCheck className='text-success' />
            </button>
            {isEditMode && (
              <button type="button" className="btn" onClick={cancelEdit}>
                <FaTimes />
              </button>
            )}
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover size="sm" className='mt-5'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Standard</th>
            <th>Division</th>
            <th>Contact</th>
            <th colSpan={2} className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.studName}</td>
              <td>{cls.std}</td>
              <td>{cls.div}</td>
              <td>{cls.contact}</td>
              <td className='d-flex justify-content-evenly'>
                <button
                  className='btn'
                  onClick={() => {
                    setForm({ studName: cls.studName, std: cls.std, div: cls.div, contact: cls.contact });
                    setIsEditMode(true);
                    setEditId(cls.id);
                  }}
                >
                  <FaEdit size={20} className='text-primary' />
                </button>
                <button
                  className='btn'
                  onClick={() => dispatch(deleteStudent(cls.id))}
                >
                  <FaTrash className='text-danger' size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
