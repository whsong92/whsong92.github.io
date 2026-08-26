// src/views/react/SubPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function SubPage() {
    return (
        <div>
            <h2 className="text-xl font-bold text-blue-800">React SubPage</h2>
            <Link to="/" className="mt-4 inline-block px-3 py-1 bg-blue-600 text-white rounded">React 메인으로</Link>
        </div>
    );
}