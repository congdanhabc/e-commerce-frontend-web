import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';

import router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Cung cấp router cho toàn bộ ứng dụng */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);