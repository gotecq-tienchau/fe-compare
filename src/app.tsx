import 'antd/dist/antd.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CompareList } from './components/compare-page/compare-list';
import { GenerateSitemap } from './components/generate-sitemap';
import './style/app.scss';

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<GenerateSitemap />} />
            <Route path="/compare" element={<CompareList />} />
            <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
    );
};
