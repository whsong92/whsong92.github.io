import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/views/react/HomePage';
import SubPage from '@/views/react/SubPage';

export default function ReactRouter() {
    return (
        <BrowserRouter basename="/react">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sub" element={<SubPage />} />
            </Routes>
        </BrowserRouter>
    );
}