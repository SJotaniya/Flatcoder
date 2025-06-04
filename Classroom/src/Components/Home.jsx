import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem, Fab, Autocomplete } from '@mui/material';
import { addClass, updateClass, deleteClass } from '../Slices/ClassSlice';
import { addStudent, updateStudent, deleteStudent } from '../Slices/StudentSlice';

export default function Home() {
  const [openClassDialog, setOpenClassDialog] = useState(false);
  const [openDivisionDialog, setOpenDivisionDialog] = useState(false);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStd, setSelectedStd] = useState('');
  const [selectedDiv, setSelectedDiv] = useState('');
  const [selectedDivTeacher, setSelectedDivTeacher] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newClass, setNewClass] = useState({ std: '', teacher: '' });
  const [newDivision, setNewDivision] = useState({ div: '', teacher: '' });
  const [newStudent, setNewStudent] = useState({ studName: '', contact: '' });

  const classList = useSelector(state => state.classrooms.classes);
  const studentList = useSelector(state => state.students.students);
  const teachers = useSelector(state => state.teachers.teachers);
  const dispatch = useDispatch();

  // Save to localStorage whenever Redux state changes
  useEffect(() => {
    try {
      localStorage.setItem('classList', JSON.stringify(classList));
    } catch (error) {
      console.error('Error saving classList to localStorage: ', error);
    }
  }, [classList]);

  useEffect(() => {
    try {
      localStorage.setItem('studentList', JSON.stringify(studentList));
    } catch (error) {
      console.error('Error saving studentList to localStorage: ', error);
    }
  }, [studentList]);

  useEffect(() => {
    try {
      localStorage.setItem('teachers', JSON.stringify(teachers));
    } catch (error) {
      console.error('Error saving teachers to localStorage: ', error);
    }
  }, [teachers]);

  const classesByStd = classList.reduce((acc, cls) => {
    acc[cls.std] = acc[cls.std] || [];
    acc[cls.std].push(cls);
    return acc;
  }, {});

  // Sort divisions alphabetically for each standard
  Object.keys(classesByStd).forEach(std => {
    classesByStd[std].sort((a, b) => a.div.localeCompare(b.div));
  });

  // Get unique class standards and sort them
  const getUniqueStandards = () => {
    const standards = [...new Set(classList.map(cls => cls.std))];
    return standards.sort((a, b) => parseInt(a) - parseInt(b));
  };

  // Add New Class Dialog Handlers
  const handleOpenClassDialog = () => {
    setOpenClassDialog(true);
    setEditMode(false);
    setNewClass({ std: '', teacher: '' });
  };

  const handleCloseClassDialog = () => {
    setOpenClassDialog(false);
    setNewClass({ std: '', teacher: '' });
  };

  const handleAddClass = () => {
    if (!newClass.std || !newClass.teacher) return;
    
    // Check if class already exists
    const existingClass = classList.find(cls => cls.std === newClass.std);
    if (existingClass) {
      alert(`Class ${newClass.std} already exists`);
      return;
    }

    // Create a default division A for the new class
    const newClassData = {
      std: newClass.std,
      div: 'A',
      teacher: newClass.teacher,
      id: Date.now()
    };

    dispatch(addClass(newClassData));
    handleCloseClassDialog();
  };

  // Division Dialog Handlers
  const handleOpenDivisionDialog = (std, editDivision = null) => {
    setSelectedStd(std);
    setEditMode(!!editDivision);
    setEditingItem(editDivision);
    
    if (editDivision) {
      setNewDivision({ div: editDivision.div, teacher: editDivision.teacher });
    } else {
      setNewDivision({ div: '', teacher: '' });
    }
    
    setOpenDivisionDialog(true);
  };

  const handleCloseDivisionDialog = () => {
    setOpenDivisionDialog(false);
    setNewDivision({ div: '', teacher: '' });
    setSelectedStd('');
    setEditMode(false);
    setEditingItem(null);
  };

  const handleAddOrUpdateDivision = () => {
    if (editMode && editingItem) {
      // Update existing division
      const updatedDivision = {
        ...editingItem,
        div: newDivision.div,
        teacher: newDivision.teacher
      };
      
      dispatch(updateClass(updatedDivision));
    } else {
      // Add new division
      const duplicate = classList.find(
        cls => cls.std === selectedStd && cls.div === newDivision.div
      );

      if (duplicate) {
        alert(`Division ${newDivision.div} already exists for Class ${selectedStd}`);
        return;
      }

      const newClassData = {
        std: selectedStd,
        div: newDivision.div,
        teacher: newDivision.teacher,
        id: Date.now()
      };

      dispatch(addClass(newClassData));
    }

    handleCloseDivisionDialog();
  };

  // Student Dialog Handlers
  const handleOpenStudentDialog = (std, div, teacher, editStudent = null) => {
    setSelectedStd(std);
    setSelectedDiv(div);
    setSelectedDivTeacher(teacher);
    setEditMode(!!editStudent);
    setEditingItem(editStudent);
    
    if (editStudent) {
      setNewStudent({ studName: editStudent.studName, contact: editStudent.contact });
    } else {
      setNewStudent({ studName: '', contact: '' });
    }
    
    setOpenStudentDialog(true);
  };

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false);
    setNewStudent({ studName: '', contact: '' });
    setSelectedStd('');
    setSelectedDiv('');
    setSelectedDivTeacher('');
    setEditMode(false);
    setEditingItem(null);
  };

  const handleAddOrUpdateStudent = () => {
    if (editMode && editingItem) {
      // Update existing student
      const updatedStudent = {
        ...editingItem,
        studName: newStudent.studName.trim(),
        contact: newStudent.contact
      };
      
      dispatch(updateStudent(updatedStudent));
    } else {
      // Add new student
      const duplicate = studentList.find(
        student => student.std === selectedStd && 
                   student.div === selectedDiv && 
                   student.studName.toLowerCase() === newStudent.studName.toLowerCase()
      );

      if (duplicate) {
        alert(`Student "${newStudent.studName}" already exists in Class ${selectedStd}-${selectedDiv}`);
        return;
      }

      const newStudentData = {
        std: selectedStd,
        div: selectedDiv,
        studName: newStudent.studName.trim(),
        contact: newStudent.contact,
        id: Date.now()
      };

      dispatch(addStudent(newStudentData));
    }

    handleCloseStudentDialog();
  };

  // Delete handlers
  const handleDeleteClass = (std) => {
    const divisionsInClass = classList.filter(cls => cls.std === std);
    const studentsInClass = studentList.filter(s => s.std === std);
    
    const confirmMessage = `Are you sure you want to delete Class ${std}?\n\nThis will permanently delete:\n• ${divisionsInClass.length} division(s)\n• ${studentsInClass.length} student(s)\n\nThis action cannot be undone.`;
    
    if (window.confirm(confirmMessage)) {
      // Delete all students in this class first
      studentsInClass.forEach(student => {
        dispatch(deleteStudent(student.id));
      });
      
      // Then delete all divisions in this class
      divisionsInClass.forEach(division => {
        dispatch(deleteClass(division.id));
      });
    }
  };

  const handleDeleteDivision = (division) => {
    if (window.confirm(`Are you sure you want to delete Division ${division.div} from Class ${division.std}? This will also delete all students in this division.`)) {
      // Delete all students in this division first
      const studentsToDelete = studentList.filter(s => s.std === division.std && s.div === division.div);
      studentsToDelete.forEach(student => {
        dispatch(deleteStudent(student.id));
      });
      
      // Then delete the division
      dispatch(deleteClass(division.id));
    }
  };

  const handleDeleteStudent = (student) => {
    if (window.confirm(`Are you sure you want to delete student "${student.studName}"?`)) {
      dispatch(deleteStudent(student.id));
    }
  };

  // Function to get student count for a specific class and division
  const getStudentCount = (std, div) => {
    return studentList.filter(s => s.std === std && s.div === div).length;
  };

  // Function to get students for a specific class and division
  const getStudentsForDivision = (std, div) => {
    return studentList
      .filter(s => s.std === std && s.div === div)
      .sort((a, b) => a.studName.localeCompare(b.studName));
  };

  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: 5, padding: 2, pb: 10 }}>
        {Object.entries(classesByStd).map(([std, divisions]) => (
          <Accordion key={std} sx={{ bgcolor: '#1976d2', color: 'white', borderRadius: 2, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mr: 2 }}>
                <Typography variant="h6">
                  Class {std} ({divisions.length} Division{divisions.length !== 1 ? 's' : ''})
                </Typography>
                <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
                  <Box
                    sx={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '4px',
                      borderRadius: '50%',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDivisionDialog(std);
                    }}
                    title="Add Division"
                  >
                    <AddCircleOutlineIcon sx={{ color: 'white' }} />
                  </Box>
                  <Box
                    sx={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '4px',
                      borderRadius: '50%',
                      '&:hover': {
                        backgroundColor: 'rgba(255,0,0,0.2)'
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClass(std);
                    }}
                    title="Delete Class"
                  >
                    <DeleteIcon sx={{ color: 'white' }} />
                  </Box>
                </Stack>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ bgcolor: 'white', color: 'black', borderRadius: 1 }}>
              {divisions.map((divCls) => {
                const studentCount = getStudentCount(divCls.std, divCls.div);
                const divisionStudents = getStudentsForDivision(divCls.std, divCls.div);
                
                return (
                  <Accordion key={divCls.id} sx={{ bgcolor: '#f5f5f5', color: 'black', borderRadius: 2, mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mr: 2 }}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>Div {divCls.div}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Teacher: {divCls.teacher} • Students: {studentCount}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center" onClick={(e) => e.stopPropagation()}>
                          <Box
                            sx={{ 
                              cursor: 'pointer', 
                              display: 'flex', 
                              alignItems: 'center',
                              padding: '4px',
                              borderRadius: '50%',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.1)'
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenStudentDialog(divCls.std, divCls.div, divCls.teacher);
                            }}
                          >
                            <AddCircleOutlineIcon color="primary" />
                          </Box>
                          <Box
                            sx={{ 
                              cursor: 'pointer', 
                              display: 'flex', 
                              alignItems: 'center',
                              padding: '4px',
                              borderRadius: '50%',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.1)'
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDivisionDialog(divCls.std, divCls);
                            }}
                          >
                            <EditIcon color="action" />
                          </Box>
                          <Box
                            sx={{ 
                              cursor: 'pointer', 
                              display: 'flex', 
                              alignItems: 'center',
                              padding: '4px',
                              borderRadius: '50%',
                              '&:hover': {
                                backgroundColor: 'rgba(255,0,0,0.1)'
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDivision(divCls);
                            }}
                          >
                            <DeleteIcon color="error" />
                          </Box>
                        </Stack>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                      {divisionStudents.length > 0 ? (
                        <Paper elevation={2} sx={{ padding: 2 }}>
                          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Students List ({studentCount} student{studentCount !== 1 ? 's' : ''}):
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {divisionStudents.map((student, index) => (
                              <Paper 
                                key={student.id} 
                                elevation={1} 
                                sx={{ 
                                  p: 2, 
                                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                                  border: '1px solid #e0e0e0'
                                }}
                              >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                      {student.studName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Contact: {student.contact || 'N/A'}
                                    </Typography>
                                  </Box>
                                  <Stack direction="row" spacing={1}>
                                    <Box
                                      sx={{ 
                                        cursor: 'pointer', 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        padding: '4px',
                                        borderRadius: '50%',
                                        '&:hover': {
                                          backgroundColor: 'rgba(0,0,0,0.1)'
                                        }
                                      }}
                                      onClick={() => {
                                        handleOpenStudentDialog(student.std, student.div, divCls.teacher, student);
                                      }}
                                    >
                                      <EditIcon color="action" fontSize="small" />
                                    </Box>
                                    <Box
                                      sx={{ 
                                        cursor: 'pointer', 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        padding: '4px',
                                        borderRadius: '50%',
                                        '&:hover': {
                                          backgroundColor: 'rgba(255,0,0,0.1)'
                                        }
                                      }}
                                      onClick={() => {
                                        handleDeleteStudent(student);
                                      }}
                                    >
                                      <DeleteIcon color="error" fontSize="small" />
                                    </Box>
                                  </Stack>
                                </Box>
                              </Paper>
                            ))}
                          </Box>
                        </Paper>
                      ) : (
                        <Paper elevation={2} sx={{ padding: 3, textAlign: 'center' }}>
                          <Typography variant="body1" color="text.secondary">
                            No students found in this division.
                          </Typography>
                          <Button 
                            variant="outlined" 
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{ mt: 2 }}
                            onClick={() => handleOpenStudentDialog(divCls.std, divCls.div, divCls.teacher)}
                          >
                            Add First Student
                          </Button>
                        </Paper>
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Floating Action Button for Add New Class */}
        <Fab
          color="primary"
          aria-label="add class"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handleOpenClassDialog}
        >
          <AddCircleOutlineIcon />
        </Fab>

        {/* Add New Class Dialog */}
        <Dialog open={openClassDialog} onClose={handleCloseClassDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Class Standard"
                value={newClass.std}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 2) {
                    setNewClass({ ...newClass, std: value });
                  }
                }}
                fullWidth
                required
                placeholder="Enter class standard (e.g., 1, 2, 10, 12)"
                helperText="Enter numeric class standard only"
              />
              <Autocomplete
                options={teachers || []}
                getOptionLabel={(option) => option.name || ''}
                value={teachers?.find(teacher => teacher.name === newClass.teacher) || null}
                onChange={(event, newValue) => {
                  setNewClass({ ...newClass, teacher: newValue ? newValue.name : '' });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Class Teacher"
                    required
                    placeholder="Search and select a teacher"
                    helperText="Type to search for teachers"
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box>
                      <Typography variant="body1">{option.name}</Typography>
                      {option.subject && (
                        <Typography variant="body2" color="text.secondary">
                          Subject: {option.subject}
                        </Typography>
                      )}
                      {option.department && (
                        <Typography variant="body2" color="text.secondary">
                          Department: {option.department}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
                filterOptions={(options, { inputValue }) => {
                  return options.filter(option =>
                    option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                    (option.subject && option.subject.toLowerCase().includes(inputValue.toLowerCase())) ||
                    (option.department && option.department.toLowerCase().includes(inputValue.toLowerCase()))
                  );
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="No teachers found"
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseClassDialog}>Cancel</Button>
            <Button 
              onClick={handleAddClass}
              variant="contained"
              disabled={!newClass.std || !newClass.teacher}
            >
              Add Class
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add/Edit Division Dialog */}
        <Dialog open={openDivisionDialog} onClose={handleCloseDivisionDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editMode ? `Edit Division ${editingItem?.div} in Class ${selectedStd}` : `Add New Division to Class ${selectedStd}`}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Division"
                value={newDivision.div}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  if (/^[A-Z]*$/.test(value)) {
                    setNewDivision({ ...newDivision, div: value });
                  }
                }}
                fullWidth
                required
                placeholder="Enter division (e.g., A, B, C)"
              />
              <FormControl fullWidth required>
                <InputLabel>Class Teacher</InputLabel>
                <Select
                  value={newDivision.teacher}
                  label="Class Teacher"
                  onChange={(e) => setNewDivision({ ...newDivision, teacher: e.target.value })}
                >
                  {teachers?.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.name}>
                      <Box>
                        <Typography variant="body2">{teacher.name}</Typography>
                        {teacher.subject && (
                          <Typography variant="caption" color="text.secondary">
                            {teacher.subject}
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDivisionDialog}>Cancel</Button>
            <Button 
              onClick={handleAddOrUpdateDivision}
              variant="contained"
              disabled={!newDivision.div || !newDivision.teacher}
            >
              {editMode ? 'Update Division' : 'Add Division'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add/Edit Student Dialog */}
        <Dialog open={openStudentDialog} onClose={handleCloseStudentDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editMode ? `Edit Student in Class ${selectedStd}-${selectedDiv}` : `Add Student to Class ${selectedStd}-${selectedDiv}`}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Class Teacher: {selectedDivTeacher}
              </Typography>
              <TextField
                label="Student Name"
                value={newStudent.studName}
                onChange={(e) => setNewStudent({ ...newStudent, studName: e.target.value })}
                fullWidth
                required
                placeholder="Enter student name"
              />
              <TextField
                label="Contact Number"
                value={newStudent.contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setNewStudent({ ...newStudent, contact: value });
                  }
                }}
                fullWidth
                required
                placeholder="Enter 10-digit contact number"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStudentDialog}>Cancel</Button>
            <Button 
              onClick={handleAddOrUpdateStudent}
              variant="contained"
              disabled={!newStudent.studName || !newStudent.contact}
            >
              {editMode ? 'Update Student' : 'Add Student'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}