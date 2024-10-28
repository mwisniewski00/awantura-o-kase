import React from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
