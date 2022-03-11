import React from 'react';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';

const About = () => {
  useTitle('V0CA5 | About');
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex justify-center px-10 mt-5 mb-10">
      <div className="block p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-xl hover:shadow-none dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          V0CA5 (V.1.0.0)
        </h5>
        <a
          target={'_blank'}
          href="https://docs.google.com/spreadsheets/d/17IyFPPFwaXmq8lEeQxXc-tjE2CdPQqrwa1Px1braYVw/edit#gid=0"
          className="font-medium text-sm hover:underline text-gray-500 hover:text-indigo-500 block md:inline-block">
          See Foreword (Java Swing V.1)
        </a>
        <a
          target={'_blank'}
          href="https://youtu.be/LW3Ih6qT9Qs"
          className="font-medium text-sm ml-0 md:ml-3 hover:underline text-gray-500 hover:text-indigo-500 block md:inline-block">
          See YuuJin (C# UWP V.1)
        </a>
        <div className="mt-5">{t('about.text')}</div>
        <div className="flex justify-between mt-5 items-center">
          <small className="text-indigo-500 inline-block">
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
            by{' '}
            <a
              href="https://www.facebook.com/htet.phyo.naing.hpn"
              className="underline">
              Htet Phyo Naing{' '}
            </a>
          </small>
          <a href="mailto:mr.htetphyonaing@gmail.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
