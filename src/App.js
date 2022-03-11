import React, { useState, useEffect } from 'react';
import { Route, Navigate, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NavBar from './components/navBar';
import Learn from './pages/learn';
import Practice from './pages/practice';
import NotFound from './pages/app/notFound';
import './App.css';
import About from './pages/app/about';

const App = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  const setLanguage = (lang) => i18n.changeLanguage(lang);

  const getLangCookie = () => Cookies.get('site-lang');

  const changeLanguage = (e) => {
    const lang = e.target.value;
    Cookies.set('site-lang', lang);
    setLanguage(lang);
  };

  const saveToLocalStorage = (name, value) => localStorage.setItem(name, value);
  const getFromLocalStorage = (name) => localStorage.getItem(name);

  useEffect(() => {
    // lang
    setLanguage(getLangCookie());
  }, []);

  return (
    <>
      <NavBar langChange={changeLanguage} currentLang={getLangCookie()} />
      <Routes>
        <Route
          path="/learn"
          element={<Learn currentLang={getLangCookie()} />}
        />
        <Route
          path="/practice"
          element={<Practice currentLang={getLangCookie()} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" exact element={<Navigate to="/learn" />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
};

export default App;
