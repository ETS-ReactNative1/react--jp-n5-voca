import React from 'react';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';

const About = () => {
  useTitle('Momoji | About');
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex justify-center px-10 mt-5 mb-10">
      <div className="block p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-xl hover:shadow-none dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          M0Ji (V.1.0.0)
        </h5>
        <a
          target={'_blank'}
          href="https://hpn-katakana.netlify.app"
          className="font-medium text-sm hover:underline text-gray-500 hover:text-indigo-500 block md:inline-block">
          See Katakana (V.1)
        </a>
        <a
          target={'_blank'}
          href="https://hpn-hiragana.netlify.app"
          className="font-medium text-sm ml-0 md:ml-3 hover:underline text-gray-500 hover:text-indigo-500 block md:inline-block">
          See Hiragana (V.1)
        </a>
        <div className="mt-5">{t('about.text')}</div>
        <small className="text-indigo-500 mt-5 inline-block">
          made with{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline"
            viewBox="0 0 20 20"
            fill="#f00">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>{' '}
          by mr.htetphyonaing@gmail.com
        </small>
      </div>
    </div>
  );
};

export default About;
