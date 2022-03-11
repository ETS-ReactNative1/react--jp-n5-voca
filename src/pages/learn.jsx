import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
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

const Learn = ({ currentLang }) => {
  useTitle('5V0CA | Learn');
  const { t } = useTranslation();
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

  return lessonFile.length === 0 ? (
    <div className="text-center mt-10">
      <svg
        role="status"
        className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  ) : (
    <Container>
      <div className="flex flex-col justify-center mb-20">
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={handleModal}
            className={`text-white bg-red-500 shadow-md hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-xl text-sm px-4 py-2 text-center dark:bg-red-600dark:hover:bg-red-700 dark:focus:ring-red-800 ${
              currentLang === 'my-MM' && 'font-semibold'
            }`}
            type="button">
            {t('learn.body.selectLessonBtn')}{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </button>

          <div className="text-right">
            <span className="ml-3 font-bold block">
              {t('learn.body.lesson')}:{' '}
              <span className="bg-red-300 text-red-800 px-3 py-2 rounded-full">
                {lesson}
              </span>
            </span>
            <span className="text-sm text-red-700 inline-block pt-2">
              {favoritesInSelectedLesson.length} {t('learn.body.favorite')} /{' '}
              {lessonFile.length} {t('learn.body.total')}
            </span>
          </div>
        </div>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 150 }} aria-label="a dense table">
            <TableHead>
              <TableRow className="bg-red-50">
                <TableCell width="auto">
                  <Typography style={{ fontWeight: 600 }}>
                    {t('learn.body.no')}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: 600 }}>
                    {t('learn.body.voca')}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: 600 }}>
                    {t('learn.body.romaji')}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: 600 }}>
                    {t('learn.body.meaning')}
                  </Typography>
                </TableCell>
                <TableCell align="left" className="w-32">
                  <Typography style={{ fontWeight: 600 }}>
                    {t('learn.body.favorite')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonFile &&
                lessonFile.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" className="w-auto">
                      {data.id}
                    </TableCell>
                    <TableCell align="left" className="w-60">
                      <span className="jp-font font-semibold text-gray-700">
                        {data.voca}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="w-auto">
                      {data.romaji}
                    </TableCell>
                    <TableCell align="left" className="w-auto">
                      <span className="text-gray-700 font-semibold">
                        {data.meaning}
                      </span>
                    </TableCell>
                    <TableCell className="w-auto">
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
                  className="px-6 pb-8 space-y-4 lg:px-8 items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('learn.body.selectLessonBtn')}{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
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
                            styles="py-2"
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
        <span className="text-center mt-5 text-gray-400">
          ー {t('learn.body.end')} ー
        </span>
      </div>
    </Container>
  );
};

export default Learn;
