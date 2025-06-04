import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher, deleteTeacher, updateTeacher } from '../Slices/TeacherSlice';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa'

export default function Teacher() {
  const [form, setForm] = useState({ name: '', subject: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const teacherList = useSelector(state => state.teachers.teachers);

  const addClassHandler = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateTeacher({ ...form, id: editId }));
      setIsEditMode(false);
      setEditId(null);
    } else {
      dispatch(addTeacher({ ...form, id: Date.now() }));
    }
    setForm({ name: '', subject: '' });
  };

  const cancelEdit = () => {
    setForm({ name: '', subject: '' })
    setIsEditMode(false)
    setEditId(null)
  }

  useEffect(() => {
    localStorage.setItem('teacherList', JSON.stringify(teacherList));
  }, [teacherList]);

  return (
    <>
      <NavBar />
      <h1 className='text-center mt-5'>Teachers</h1>

      {/* Add Teacher Form */}
      <Form onSubmit={addClassHandler} className='d-flex justify-center align-items-center mt-5'>
        <Row>
          <Col>
            <Form.Control required placeholder="Name" value={form.name} maxLength={30}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s']*$/.test(value)) {
                  setForm({ ...form, name: value });
                }
              }}
            />
          </Col>
          <Col>
            <Form.Control required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </Col>
          <Col className="d-flex gap-2 align-items-center">
              <button type="submit" className="btn">
                <FaCheck className='text-success' size={20} />
              </button>
              {isEditMode && (
                <button type="button" className="btn" onClick={cancelEdit}>
                  <FaTimes size={20} />
                </button>
              )}
          </Col>
        </Row>
      </Form>

      {/* Teacher List Table */}
      <Table striped bordered hover size="sm" className='mt-5'>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th colSpan={2} className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teacherList.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.name}</td>
              <td>{cls.subject}</td>
              <td className='d-flex justify-content-evenly'>
                <button className='btn' onClick={() => {
                  setForm({ name: cls.name, subject: cls.subject });
                  setIsEditMode(true);
                  setEditId(cls.id);
                }}>
                  <FaEdit size={20} className='text-primary' />
                </button>
                <button className='btn' onClick={() => dispatch(deleteTeacher(cls.id))}>
                  <FaTrash className='text-danger' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
