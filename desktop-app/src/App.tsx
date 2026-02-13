import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Импортируем всё одной пачкой
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AdminTA from './pages/AdminTA';
import TAForm from './pages/TAForm';
import Monitor from './pages/Monitor';

export default function App() {
  // Простая проверка: есть токен — мы в системе
  const [auth, setAuth] = useState(!!localStorage.token);

  // Если не залогинен — показываем вход и дальше не идем
  if (!auth) return <Login setAuth={setAuth} />;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="monitor" element={<Monitor />} />
          <Route path="ta" element={<AdminTA />} />
          <Route path="ta/add" element={<TAForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}