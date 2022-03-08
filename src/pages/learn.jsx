import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomRadioButton from '../components/customRadioButton';
import Favorite from '../components/favorite';

const Learn = () => {
  const [lesson, setLesson] = useState(1);
  const [lastViewedLesson, setLastViewedLesson] = useState(1);
  const [lessonFile, setLessonFile] = useState([]);
  const [favoritesInSelectedLesson, setFavoritesInSelectedLesson] = useState(
    []
  );
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleModal = () =>
    modalVisibility ? setModalVisibility(false) : setModalVisibility(true);

  const handleModalClose = () => setModalVisibility(false);

  const handleSubmit = () => console.log('submitted');

  const handleLessonChange = (value) => {
    setLesson(value);
    saveLastViewedLesson(value);
    setLastViewedLesson(value);
    setModalVisibility(false);
    setLessonFile(require(`../data/_${value}.js`).data);

    paintUiForPastFavorites(value);
  };

  const saveLastViewedLesson = (l) => saveToLocalStorage('lastViewedLesson', l);
  const retrieveLastViewedLesson = () =>
    getFromLocalStorage('lastViewedLesson');

  const paintUiForPastFavorites = (currentLesson) => {
    const prevFavorites = JSON.parse(getFromLocalStorage('favorites'));
    const favoritesInLesson = prevFavorites.filter(
      (f) => currentLesson == f.split('-')[1]
    );
    const a = favoritesInLesson.map((f) => parseInt(f.split('-')[0]));
    setFavoritesInSelectedLesson(a);
  };

  const handleFavorite = (data) => {
    const items = [...lessonFile];
    const index = items.indexOf(data);
    items[index] = { ...items[index] };
    items[index].isFavorite = !lessonFile[index].isFavorite;
    setLessonFile(items);

    let newVocaId = `${items[index].id}-${lesson}`;
    const prevFavorites = JSON.parse(getFromLocalStorage('favorites'));
    // prevFavorites ['1-1', '1-2'] ထဲမှာ '1-1' ပါ/မပါ စစ်. မပါဘူးဆို ထည့်.
    if (!_.includes(prevFavorites, newVocaId))
      setFavorite(JSON.stringify([...prevFavorites, newVocaId]));
    else removeFavorite('favorites', newVocaId); // ပါတယ်ဆို ဖြုတ်.
    paintUiForPastFavorites(lesson); // ui ကို update လုပ်
  };

  const setFavorite = (data) => saveToLocalStorage('favorites', data);

  function removeFavorite(name, value) {
    const f = JSON.parse(getFromLocalStorage(name));
    const updatedFavorites = _.without(f, value);
    setFavorite(JSON.stringify(updatedFavorites));
  }

  const initializeFavorites = () => {
    saveToLocalStorage('favorites', JSON.stringify([]));
  };

  const saveToLocalStorage = (name, value) => localStorage.setItem(name, value);
  const getFromLocalStorage = (name) => localStorage.getItem(name);

  useEffect(() => {
    // initialize favorites array for the first time user
    if (!('favorites' in localStorage)) initializeFavorites();

    // get the user to the last viewed lesson
    const _lastViewedLesson = retrieveLastViewedLesson();
    if (_lastViewedLesson) {
      setLesson(_lastViewedLesson);
      setLessonFile(require(`../data/_${_lastViewedLesson}.js`).data);
      paintUiForPastFavorites(_lastViewedLesson);
    } else {
      setLesson(1);
      setLessonFile(require(`../data/_1.js`).data);
      paintUiForPastFavorites(1);
    }
  }, []);

  useEffect(() => {
    paintUiForPastFavorites(lesson);
    setLastViewedLesson(lesson);
  }, [lesson]);

  return (
    <Container>
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={handleModal}
            className="text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-xl text-sm px-4 py-2 text-center dark:bg-purple-600dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            type="button">
            Select Lesson...
          </button>

          <div className="text-right">
            <span className="ml-3 block">Selected Lesson: {lesson}</span>
            <span className="text-sm text-purple-700">
              {favoritesInSelectedLesson.length} favorites in this lesson
            </span>
          </div>
        </div>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 150 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell width="auto">
                  <Typography style={{ fontWeight: 600 }}>No.</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: 600 }}>
                    Vocabulary
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: 600 }}>
                    Romaji / Kanji
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: 600 }}>Meaning</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: 600 }}>Favorite</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonFile &&
                lessonFile.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" className="w-5">
                      {data.id}
                    </TableCell>
                    <TableCell align="left" className="w-60">
                      {data.voca}
                    </TableCell>
                    <TableCell align="left" className="w-60">
                      {data.romaji}
                    </TableCell>
                    <TableCell align="left">{data.meaning}</TableCell>
                    <TableCell>
                      <Favorite
                        checked={_.includes(favoritesInSelectedLesson, data.id)}
                        onClick={() => handleFavorite(data)}
                      />
                    </TableCell>
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
                      <div className="grid grid-cols-5 gap-4">
                        {_.range(1, 26).map((i) => (
                          <CustomRadioButton
                            key={i}
                            value={i}
                            selected={lastViewedLesson}
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
