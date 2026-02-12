import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, ClipboardList, LogOut } from 'lucide-react';

// Импортируем готовые страницы
import Login from './pages/Login';
import Machines from './pages/Machines';
import ServiceCalendar from './pages/ServiceCalendar';
import WorkSchedule from './pages/WorkSchedule'; // Мы его создадим следующим шагом

export default function App() {
  // Проверка авторизации (есть ли токен в памяти браузера)
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // Если не авторизован — показываем только экран входа
  if (!isAuth) return <Login onLoginSuccess={() => setIsAuth(true)} />;

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-200 text-sm">

        {/* Боковая панель (Sidebar) */}
        <aside className="w-64 bg-slate-800 text-slate-300 flex flex-col shadow-lg">
          <div className="p-4 text-white text-xl font-bold bg-slate-900">WEB Portal</div>

          <nav className="flex-1 p-3 space-y-1">
            <Link to="/" className="flex items-center gap-3 p-3 hover:bg-slate-700 hover:text-white rounded transition">
              <LayoutDashboard size={18}/> ТА (Импорт)
            </Link>
            <Link to="/calendar" className="flex items-center gap-3 p-3 hover:bg-slate-700 hover:text-white rounded transition">
              <Calendar size={18}/> Календарь ТО
            </Link>
            <Link to="/schedule" className="flex items-center gap-3 p-3 hover:bg-slate-700 hover:text-white rounded transition">
              <ClipboardList size={18}/> График работ
            </Link>
          </nav>

          <button onClick={logout} className="p-4 flex items-center gap-3 hover:bg-red-600 hover:text-white border-t border-slate-700 transition">
            <LogOut size={18}/> Выход
          </button>
        </aside>

        {/* Зона контента */}
        <main className="flex-1 overflow-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<Machines />} />
            <Route path="/calendar" element={<ServiceCalendar />} />
            <Route path="/schedule" element={<WorkSchedule />} />
            {/* Если адрес не найден — кидаем на главную */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}