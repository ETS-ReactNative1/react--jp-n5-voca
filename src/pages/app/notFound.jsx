import React from 'react';
import { useTitle } from 'react-use';
import notFound from '../../assets/icons/notFound.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  useTitle('Hiragana | Oops');
  const { t } = useTranslation();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={notFound} alt="not-found" className="mb-5 w-64" />
      <span className="mb-3 text-3xl font-bold text-red-600">Oops!</span>
      <span className="mx-3 text-center font-semibold text-gray-500 md:mx-0">
        {t('notFound.text')}
      </span>
      <Link to="/">
        <button className="mt-5 items-center rounded-2xl bg-indigo-500 p-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 hover:text-white hover:shadow-none focus:ring-4 focus:ring-indigo-300 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:focus:ring-indigo-800 md:inline-flex">
          {t('notFound.button')}
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
