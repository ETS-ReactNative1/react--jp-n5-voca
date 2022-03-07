import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const NavBar = ({
  currentLang: lang,
  langChange,
  selectedCharacter,
  handleCharacter,
}) => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState('en-US');
  const { pathname } = useLocation();
  const [menuVisibility, setMenuVisibility] = useState(false);

  useEffect(() => {
    // seting language in select box
    // setCurrentLang(lang);
    if (lang === 'ja-JP') setCurrentLang('ja-JP');
    else if (lang === 'my-MM') setCurrentLang('my-MM');
    else setCurrentLang('en-US');
  }, [lang]);

  return (
    <nav className="bg-white w-full z-50 sticky top-0 px-2 sm:px-4 py-0.5 rounded dark:bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-20 border-b border-gray-200 firefox:bg-opacity-90">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="40pt"
            height="40pt"
            className="mr-1"
            viewBox="0 0 120 120"
            preserveAspectRatio="xMidYMid meet">
            <g
              transform="translate(0.000000,110.000000) scale(0.140000,-0.140000)"
              fill="#000000"
              stroke="none">
              <path
                d="M315 595 c0 -40 -4 -77 -8 -82 -5 -4 -38 -8 -73 -8 -35 0 -64 -1 -64
-2 0 -1 7 -9 16 -17 10 -10 33 -16 65 -16 55 0 54 1 43 -83 -6 -42 -11 -49
-49 -71 -23 -14 -58 -43 -78 -65 -31 -34 -37 -49 -37 -84 0 -75 23 -82 117
-37 61 28 63 29 73 10 17 -33 32 -23 28 18 -3 32 5 48 57 120 58 81 61 83 94
78 55 -8 76 -37 76 -101 0 -46 -4 -58 -30 -85 -16 -18 -52 -43 -78 -57 -27
-13 -47 -26 -45 -29 14 -13 117 35 155 71 40 39 43 45 43 96 0 80 -33 117
-121 133 -26 5 -39 13 -44 29 l-7 22 -7 -24 c-5 -18 -18 -27 -56 -37 -28 -7
-51 -13 -53 -14 -2 0 -2 26 0 58 l3 57 75 18 c87 21 104 32 68 46 -18 7 -37 5
-64 -4 -63 -23 -64 -22 -61 46 2 51 -1 63 -18 75 -19 13 -20 11 -20 -61z m88
-266 c-10 -17 -30 -45 -45 -62 l-27 -32 -1 51 c0 49 1 52 33 62 55 17 60 15
40 -19z m-109 -69 c4 -28 4 -55 1 -60 -11 -17 -83 -50 -110 -50 -51 0 -24 71
48 127 23 18 45 33 48 33 4 0 9 -23 13 -50z"
              />
            </g>
          </svg>

          <div className="flex flex-col">
            <span className="whitespace-nowrap text-lg font-bold dark:text-white">
              M0Ji
            </span>
            <div className="md:-mr-20">
              <span className="text-sm text-gray-400">ー welcome</span>
            </div>
          </div>
        </Link>
        <button
          onClick={() => setMenuVisibility(!menuVisibility)}
          data-collapse-toggle="mobile-menu"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto   ${
            menuVisibility ? '' : 'hidden'
          }`}
          id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li className="mb-2 md:mb-0 text-center">
              <ToggleButtonGroup
                value={selectedCharacter}
                onChange={handleCharacter}
                color="primary"
                exclusive>
                <ToggleButton
                  value="ka"
                  sx={{
                    borderRadius: 5,
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                    marginTop: 0.2,
                  }}>
                  ヵ
                </ToggleButton>
                <ToggleButton
                  value="hi"
                  sx={{
                    borderRadius: 5,
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                    marginTop: 0.2,
                  }}>
                  ひ
                </ToggleButton>
              </ToggleButtonGroup>
            </li>
            <li onClick={() => setMenuVisibility(false)}>
              <NavLink
                to="/learn"
                className="block rounded py-2 px-3 md:rounded-3xl"
                aria-current="page">
                Learn{' '}
                {pathname === '/learn' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                )}
              </NavLink>
            </li>
            <li onClick={() => setMenuVisibility(false)}>
              <NavLink
                to="/practice"
                className="block rounded py-2 px-3 md:rounded-3xl">
                Practice{' '}
                {pathname === '/practice' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                )}
              </NavLink>
            </li>
            <li onClick={() => setMenuVisibility(false)}>
              <NavLink
                to="/about"
                className="block rounded py-2 px-3 md:rounded-3xl">
                About{' '}
                {pathname === '/about' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </NavLink>
            </li>
            <li>
              <select
                onChange={langChange}
                value={currentLang}
                className="block mt-3 md:mt-0 mr-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 mb-5 md:mb-0">
                <option value="en-US">English</option>
                <option value="ja-JP">日本語</option>
                <option value="my-MM">မြန်မာ</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
