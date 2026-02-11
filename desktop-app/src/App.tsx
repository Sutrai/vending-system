import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Импорт страниц
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AdminTA from './pages/AdminTA';
import TAForm from './pages/TAForm';
import Monitor from './pages/Monitor';

export default function App() {
  // Инициализируем состояние авторизации: проверяем наличие токена в памяти
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem('token'));

  // Если пользователь не авторизован, показываем только страницу входа
  // Мы передаем функцию setIsAuth, чтобы страница Login могла изменить состояние после успеха
  if (!isAuth) {
    return <Login setAuth={setIsAuth} />;
  }

  return (
    <HashRouter>
      <Routes>
        {/* Layout — это каркас с Sidebar и Header. Все Route внутри него будут отображаться в <Outlet /> */}
        <Route path="/" element={<Layout />}>

          {/* Главная страница (Dashboard) */}
          <Route index element={<Dashboard />} />

          {/* Монитор ТА (датчики и состояние связи) */}
          <Route path="monitor" element={<Monitor />} />

          {/* Администрирование ТА (таблица со списком) */}
          <Route path="ta" element={<AdminTA />} />

          {/* Форма добавления нового ТА */}
          <Route path="ta/add" element={<TAForm />} />

          {/* Если пользователь ввел несуществующий путь — перекидываем на главную */}
          <Route path="*" element={<Navigate to="/" />} />

        </Route>
      </Routes>
    </HashRouter>
  );
}