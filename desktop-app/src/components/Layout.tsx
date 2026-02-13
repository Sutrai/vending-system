// src/components/Layout.tsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Monitor, Settings, LogOut, User } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.clear();
    window.location.reload(); // Самый простой способ сбросить всё
  };

  return (
    <div className="flex h-screen bg-gray-100 text-sm">

      {/* 1. SIDEBAR (Слева) */}
      <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col">
        <div className="p-4 text-white font-bold text-lg border-b border-gray-800">
          VENDING APP
        </div>

        <nav className="flex-1 p-2 space-y-1">
          <Link to="/" className="flex items-center gap-3 p-2 hover:bg-gray-800 hover:text-white rounded">
            <LayoutDashboard size={18} /> Главная
          </Link>
          <Link to="/monitor" className="flex items-center gap-3 p-2 hover:bg-gray-800 hover:text-white rounded">
            <Monitor size={18} /> Монитор ТА
          </Link>
          <Link to="/ta" className="flex items-center gap-3 p-2 hover:bg-gray-800 hover:text-white rounded">
            <Settings size={18} /> Автоматы
          </Link>
        </nav>
      </aside>

      {/* 2. ПРАВАЯ ЧАСТЬ (Шапка + Контент) */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="h-12 bg-white border-b flex items-center justify-between px-6">
          <span className="font-semibold text-gray-600">Панель управления</span>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold leading-none">{user.nickname || 'Админ'}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Администратор</p>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-red-50 text-red-500 rounded-full transition"
              title="Выйти"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}