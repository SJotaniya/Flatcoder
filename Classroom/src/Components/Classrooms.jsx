import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Select from 'react-select'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addClass, deleteClass, updateClass } from '../Slices/ClassSlice'
import { deleteStudentsByClass } from '../Slices/StudentSlice';
import { FaCheck, FaTimes, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Classrooms() {
    const [form, setForm] = useState({ std: '', div: '', teacher: '' })
    const [isEditMode, setIsEditMode] = useState(false)
    const [editId, setEditId] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedClassId, setSelectedClassId] = useState(null)
    
    // Sorting state
    const [sortConfig, setSortConfig] = useState({
        key: 'std', // default sort by standard
        direction: 'asc'
    })

    const dispatch = useDispatch()
    const classList = useSelector((state) => state.classrooms.classes)
    const teachers = useSelector((state) => state.teachers.teachers)

    useEffect(() => {
        localStorage.setItem('classList', JSON.stringify(classList))
    }, [classList])

    const addClassHandler = (e) => {
        e.preventDefault()

        const duplicate = classList.find(
            student =>
                student.std === form.std &&
                student.div === form.div &&
                (!isEditMode || student.id !== editId)
        )

        if (duplicate) {
            alert(`Class ${form.std} ${form.div} already exists`)
            return
        }

        if (isEditMode) {
            dispatch(updateClass({ ...form, id: editId }))
            setIsEditMode(false)
            setEditId(null)
        } else {
            dispatch(addClass({ ...form, id: Date.now() }))
        }

        setForm({ std: '', div: '', teacher: '' })
    }

    const cancelEdit = () => {
        setForm({ std: '', div: '', teacher: '' })
        setIsEditMode(false)
        setEditId(null)
    }

    const handleDeleteConfirm = () => {
        const classToDelete = classList.find(cls => cls.id === selectedClassId);
        if (classToDelete) {
            dispatch(deleteClass(selectedClassId));
            dispatch(deleteStudentsByClass(classToDelete.std));
        }
        setShowDeleteModal(false);
        setSelectedClassId(null);
    }

    // Sorting function
    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    // Get sort icon for column headers
    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <FaSort className="ms-2 text-muted" />
        }
        return sortConfig.direction === 'asc' 
            ? <FaSortUp className="ms-2 text-primary" />
            : <FaSortDown className="ms-2 text-primary" />
    }

    // Sort the classroom data
    const sortedClasses = [...classList].sort((a, b) => {
        const { key, direction } = sortConfig
        let aValue, bValue

        switch (key) {
            case 'id':
                aValue = a.id
                bValue = b.id
                break
            case 'std':
                aValue = parseInt(a.std) || 0
                bValue = parseInt(b.std) || 0
                break
            case 'div':
                aValue = a.div || ''
                bValue = b.div || ''
                break
            case 'teacher':
                aValue = (a.teacher || '').toLowerCase()
                bValue = (b.teacher || '').toLowerCase()
                break
            default:
                return 0
        }

        if (aValue < bValue) {
            return direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return direction === 'asc' ? 1 : -1
        }
        return 0
    })

    return (
        <>
            <NavBar />
            <h1 className='text-center mt-5'>Classrooms</h1>

            {/* Add / Edit Classroom Form */}
            <Form onSubmit={addClassHandler} className='d-flex justify-center align-items-center mt-5'>
                <Row>
                    <Col>
                        <Form.Control required placeholder='Standard' value={form.std} maxLength={2}
                            onChange={(e) => {
                                const value = e.target.value
                                if (/^\d{0,2}$/.test(value)) {
                                    const num = parseInt(value, 10)
                                    if (value === '' || (num >= 1 && num <= 12)) {
                                        setForm({ ...form, std: value })
                                    }
                                }
                            }}
                        />
                    </Col>
                    <Col>
                        <Form.Control required placeholder='Division' value={form.div}
                            onChange={(e) => {
                                const value = e.target.value.toUpperCase()
                                if (/^[A-Z]*$/.test(value)) {
                                    setForm({ ...form, div: value })
                                }
                            }}
                        />
                    </Col>
                    <Col sm={4}>
                        <Select required
                            value={teachers.find(t => t.name === form.teacher) || null}
                            onChange={(selected) => setForm({ ...form, teacher: selected?.name || '' })}
                            getOptionLabel={(e) => e.name}
                            getOptionValue={(e) => e.name}
                            options={teachers}
                            placeholder="Class Teacher"
                            isClearable
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

            {/* Classroom List Table */}
            <Table striped bordered hover size='sm' className='mt-5'>
                <thead>
                    <tr>
                        <th 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            onClick={() => handleSort('id')}
                            className="align-middle"
                        >
                            Class Id {getSortIcon('id')}
                        </th>
                        <th 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            onClick={() => handleSort('std')}
                            className="align-middle"
                        >
                            Standard {getSortIcon('std')}
                        </th>
                        <th 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            onClick={() => handleSort('div')}
                            className="align-middle"
                        >
                            Division {getSortIcon('div')}
                        </th>
                        <th 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            onClick={() => handleSort('teacher')}
                            className="align-middle"
                        >
                            Class Teacher {getSortIcon('teacher')}
                        </th>
                        <th colSpan={2} className='text-center'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedClasses.map((cls) => (
                        <tr key={cls.id}>
                            <td>{cls.id}</td>
                            <td>{cls.std}</td>
                            <td>{cls.div}</td>
                            <td>{cls.teacher}</td>
                            <td className='d-flex justify-content-evenly'>
                                <button
                                    className='btn'
                                    onClick={() => {
                                        setForm({ std: cls.std, div: cls.div, teacher: cls.teacher })
                                        setIsEditMode(true)
                                        setEditId(cls.id)
                                    }}
                                >
                                    <FaEdit size={20} className='text-primary' />
                                </button>
                                <button
                                    className='btn'
                                    onClick={() => {
                                        setSelectedClassId(cls.id)
                                        setShowDeleteModal(true)
                                    }}
                                >
                                    <FaTrash className='text-danger' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this class? <br /> If you delete this class all divisions and student of these class will delete permanently.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}