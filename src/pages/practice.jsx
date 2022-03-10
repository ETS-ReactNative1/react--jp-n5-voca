import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container } from '@mui/material';
import CustomRadioButton from '../components/customRadioButton';
import FlashCardList from '../components/flashCardList';
import {
  transformFrontAndBack,
  transformUniqueId,
} from '../utils/mutateObjKeys';

const flashCardData = [
  { id: 1, front: 'a', back: 'b' },
  { id: 2, front: 'a', back: 'b' },
  {
    id: 3,
    front: 'a',
    back: 'bdjfkjslfjlsjdflsdjfjksdjdkjfkksjfkjsdklfjklsjdfl',
  },
  { id: 4, front: 'a', back: 'b' },
  { id: 5, front: 'a', back: 'b' },
  {
    id: 6,
    front: 'ajdfsjdfljsklfjsjdfljksdjdkjfkksjfkjsdklfjklsjdfl',
    back: 'bajdfsjdfljsklfjsjdfljksdjdkjfkksjfkjsdklfjklsjdflbajdfsjdfljsklfjsjdfljksdjdkjfkksjfkjsdklfjklsjdflbajdfsjdfljsklfjsjdfljksdjdkjfkksjfkjsdklfjklsjdflbajdfsjdfljsklfjsjdfljksdjdkjfkksjfkjsdklfjklsjdflbajdfsjdfljsklfjsjdfljksdjdkjfkksjfkjsdklfjklsjdfl',
  },
  { id: 7, front: 'a', back: 'b' },
  { id: 8, front: 'a', back: 'b' },
  { id: 9, front: 'a', back: 'b' },
  { id: 10, front: 'a', back: 'b' },
  { id: 11, front: 'a', back: 'b' },
  { id: 12, front: 'a', back: 'b' },
  { id: 13, front: 'a', back: 'b' },
  { id: 14, front: 'a', back: 'b' },
  { id: 15, front: 'a', back: 'b' },
  { id: 16, front: 'a', back: 'b' },
  { id: 17, front: 'a', back: 'b' },
  { id: 18, front: 'a', back: 'b' },
  { id: 19, front: 'a', back: 'b' },
];

const Practice = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [practiceType, setPracticeType] = useState('nonfavorites'); // all, favorites, nonfavorites
  const [visiblePracticeData, setVisiblePracticeData] = useState('vocabulary'); // vocabulary, meaning

  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(2);
  const [isFromSelected, setIsFromSelected] = useState(true);
  const [isToSelected, setIsToSelected] = useState(true);
  const [lessonRange, setLessonRange] = useState([]);
  const [practiceData, setPracticeData] = useState([]);

  const handleModal = () =>
    modalVisibility ? setModalVisibility(false) : setModalVisibility(true);

  const handleModalClose = () => setModalVisibility(false);

  const handlePracticeTypeChange = (value) => setPracticeType(value);

  const handleLessonSelect = (lesson) => {
    if (!isFromSelected) {
      setFrom(lesson);
      setIsFromSelected(true);
      setLessonRange([lesson]);
    } else if (isFromSelected) {
      setTo(lesson);
      setIsToSelected(true);
      setLessonRange(_.range(from, lesson + 1));
      if (from > lesson) setLessonRange(_.range(lesson, from + 1));
    }
    if (isFromSelected && isToSelected) {
      setTo(0);
      setFrom(lesson);
      setIsFromSelected(true);
      setIsToSelected(false);
      setLessonRange([lesson]);
    }
  };

  const handleSubmit = (e) => {
    // console.log(lessonRange, practiceType, visiblePracticeData);
    e.preventDefault();
    handleModalClose();

    // clear previous previous data
    setPracticeData([]);

    // call all data : [lesson range]
    let data = [];
    lessonRange.map((lesson) => {
      data.push(require(`../data/_${lesson}.js`).data);
    });
    const flattenData = _.flattenDeep(data); // [ {id...}, {id...}, {id...}]

    // extract data according to [practice type]
    let allData = [];
    if (practiceType === 'all') {
      allData = _.shuffle(flattenData);
    } else if (practiceType === 'favorites') {
      // get favorites array from local storage : ["1-1","2-1","1-2", "1-3"]
      let favoritesFromStorage = JSON.parse(localStorage.getItem('favorites'));

      // favorites according to selected lesson range
      let favoritesAccordingToLessonRange = favoritesFromStorage.filter((f) => {
        let lesson = parseInt(f.split('-')[1]); // 1, 1, 2
        return _.includes(lessonRange, lesson);
      }); // ['1-1', '2-1', '1-2']

      // flattenData ထဲက favoritesAccordingToLessonRange နဲ့ကိုက်တာကို ခွဲထုတ်
      let favoritesArray = favoritesAccordingToLessonRange.map((f) => {
        let a = f.split('-');
        let id = parseInt(a[0]);
        let lesson = parseInt(a[1]);
        return { id, lesson };
      });

      // favorites ဟုတ်တာကို ယူ
      allData = flattenData.filter((fa) => {
        return favoritesArray.find(
          (fd) => fd.id === fa.id && fd.lesson === fa.lesson
        );
      });
    } else if (practiceType === 'nonfavorites') {
      // get favorites array from local storage : ["1-1","2-1","1-2", "1-3"]
      let favoritesFromStorage = JSON.parse(localStorage.getItem('favorites'));

      // favorites according to selected lesson range
      let favoritesAccordingToLessonRange = favoritesFromStorage.filter((f) => {
        let lesson = parseInt(f.split('-')[1]); // 1, 1, 2
        return _.includes(lessonRange, lesson);
      }); // ['1-1', '2-1', '1-2']

      // flattenData ထဲက favoritesAccordingToLessonRange နဲ့ကိုက်တာကို ခွဲထုတ်
      let favoritesArray = favoritesAccordingToLessonRange.map((f) => {
        let a = f.split('-');
        let id = parseInt(a[0]);
        let lesson = parseInt(a[1]);
        return { id, lesson };
      });

      // favorites မဟုတ်တာကို ယူ
      allData = flattenData.filter((a) => {
        return !favoritesArray.some(
          (b) => a.id === b.id && a.lesson === b.lesson
        );
      });
    }

    // want to see what kind of data: voca or meaning ?
    if (visiblePracticeData === 'vocabulary') {
      // transform keys : transform keys voca and meaning to front and back
      let transformedData = transformFrontAndBack(allData, ['front', 'back']);

      // transform value : make id unique
      let transformedData2 = transformUniqueId(transformedData);

      setPracticeData(transformedData2);
    } else if (visiblePracticeData === 'meaning') {
      // transform keys : transform keys voca and meaning to back and front
      let transformedData = transformFrontAndBack(allData, ['back', 'front']);

      // transform value : make id unique
      let transformedData2 = transformUniqueId(transformedData);

      setPracticeData(transformedData2);
    }
  };

  const handleVisiblePracticeDataChange = (value) =>
    setVisiblePracticeData(value);

  useEffect(() => {
    setLessonRange(_.range(from, to + 1));
  }, []);

  return (
    <Container>
      <div className="container mx-auto mt-5">
        <div className="flex flex-col justify-center">
          <div className="block text-center ">
            {/* modal open button */}
            <button
              onClick={handleModal}
              className="text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>{' '}
              Define Practice Settings
            </button>
          </div>

          {/* flash card list component */}
          <div className="container mx-auto mt-5">
            <FlashCardList data={practiceData} />
          </div>
          {/* end flash card list component */}

          {/* modal start */}
          <div className={`${modalVisibility ? '' : 'hidden'}`}>
            <div className="fixed right-0 left-0 top-0 bottom-0 z-50 mx-auto flex h-full items-center justify-center overflow-y-auto overflow-x-hidden shadow-2xl  backdrop-blur-sm backdrop-contrast-50 md:inset-0 firefox:bg-gray-200">
              <div className="relative w-full h-auto max-w-lg px-2">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                  <div className="flex justify-end p-2">
                    {/* modal close button */}
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
                  {/* form start */}
                  <form
                    onSubmit={handleSubmit}
                    className="px-6 pb-4 space-y-4 lg:px-8 sm:pb-6 xl:pb-8">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      Setup Practice Settings{' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </h3>
                    {/* <span className="text-xs text-red-500 font-semibold">
                      some description
                    </span> */}

                    {/* select lessons */}
                    <div className="flex justify-center flex-col">
                      <label
                        htmlFor="practice"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select range of lessons
                      </label>
                      <div className="relative w-full text-center">
                        <div className="grid grid-cols-5 gap-2">
                          {_.range(1, 26).map((i) => (
                            <CustomRadioButton
                              key={i}
                              value={i}
                              range={lessonRange}
                              styles="py-1"
                              label={i}
                              onClick={() => handleLessonSelect(i)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* select type of practice : all, favorites, unfavorites */}
                    <div className="flex justify-center flex-col">
                      <label
                        htmlFor="practice"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select type of practice
                      </label>
                      <div className="relative w-full text-center">
                        <div className="grid grid-cols-3 gap-2">
                          <CustomRadioButton
                            value="all"
                            selected={practiceType}
                            label="All"
                            description=""
                            styles="py-1"
                            onClick={handlePracticeTypeChange}
                          />
                          <CustomRadioButton
                            value="favorites"
                            selected={practiceType}
                            label="+Favorites"
                            description=""
                            styles="py-1"
                            onClick={handlePracticeTypeChange}
                          />
                          <CustomRadioButton
                            value="nonfavorites"
                            selected={practiceType}
                            label="-Favorites"
                            description=""
                            styles="py-1"
                            onClick={handlePracticeTypeChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* select "i want to see" */}
                    <div className="flex justify-center flex-col">
                      <label
                        htmlFor="practice"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        I want to see...
                      </label>
                      <div className="relative w-full text-center">
                        <div className="grid grid-cols-2 gap-2">
                          <CustomRadioButton
                            value="vocabulary"
                            selected={visiblePracticeData}
                            label="Vocabulary"
                            styles="py-1"
                            onClick={handleVisiblePracticeDataChange}
                          />
                          <CustomRadioButton
                            value="meaning"
                            selected={visiblePracticeData}
                            label="Meaning"
                            styles="py-1"
                            onClick={handleVisiblePracticeDataChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* submit button */}
                    <button
                      type="submit"
                      className="w-full font-bold text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                      Let's start{' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* modal end */}
        </div>
      </div>
    </Container>
  );
};

export default Practice;
