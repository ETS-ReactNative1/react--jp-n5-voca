import React, { useState } from 'react';
import _ from 'lodash';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomRadioButton from '../components/customRadioButton';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Learn = () => {
  const [lesson, setLesson] = useState(1);
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleLessonChange = (value) => {
    setLesson(value);
    setModalVisibility(false);
  };

  const handleModal = () =>
    modalVisibility ? setModalVisibility(false) : setModalVisibility(true);

  const handleModalClose = () => setModalVisibility(false);

  const handleSubmit = () => console.log('submitted');

  return (
    <Container>
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={handleModal}
            className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 shadow-md dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="button">
            Select Lesson...
          </button>
          <span className="ml-3">Selected Lesson: {lesson}</span>
        </div>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 150 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography style={{ fontWeight: 600 }}>No.</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontWeight: 600 }}>
                    Vocabulary
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontWeight: 600 }}>
                    Romaji / Kanji
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontWeight: 600 }}>Meaning</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontWeight: 600 }}>Favorite</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={`${modalVisibility ? '' : 'hidden'}`}>
          <div className="fixed right-0 left-0 top-0 bottom-0 z-50 mx-auto flex h-full items-center justify-center overflow-y-auto overflow-x-hidden shadow-2xl  backdrop-blur-sm backdrop-contrast-50 md:inset-0 firefox:bg-gray-200">
            <div className="relative w-full h-auto max-w-lg px-2">
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                <div className="flex justify-end p-2">
                  <button
                    onClick={handleModalClose}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="px-6 pb-4 space-y-4 lg:px-8 sm:pb-6 xl:pb-8">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Select a lesson
                  </h3>
                  <div className="flex justify-center flex-col">
                    <div className="relative w-full gap-2 text-center">
                      <div class="grid grid-cols-5 gap-4">
                        {_.range(1, 26).map((i) => (
                          <CustomRadioButton
                            value={i}
                            selected={lesson}
                            label={i}
                            onClick={handleLessonChange}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Learn;
