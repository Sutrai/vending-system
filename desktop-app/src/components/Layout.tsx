import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { User, LogOut, ChevronDown, Key } from 'lucide-react';

export default function Layout() {
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Определяем название текущей страницы для хедера
  const getPageName = () => {
    if (location.pathname === '/') return 'Главная';
    if (location.pathname === '/monitor') return 'Монитор ТА';
    if (location.pathname === '/ta') return 'Администрирование / Торговые автоматы';
    return '';
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] text-sm overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-12 bg-[#2d3748] text-white flex items-center justify-between px-6 shadow-md">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ООО Торговые Автоматы</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-gray-400 text-xs">{getPageName()}</span>
            <div className="relative">
              <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-3 hover:bg-gray-700 p-1 rounded transition">
                <div className="text-right leading-tight">
                  <p className="font-bold text-[11px]">{user.nickname || 'Автоматов А.А.'}</p>
                  <p className="text-[10px] text-gray-400">Администратор</p>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                  <User size={18} />
                </div>
                <ChevronDown size={14} className={showProfile ? 'rotate-180' : ''} />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border rounded shadow-xl z-50 py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"><User size={16}/> Мой профиль</button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-400"><Key size={16}/> Мои сессии</button>
                  <div className="border-t my-1"></div>
                  <button onClick={() => {localStorage.clear(); window.location.reload();}} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 font-bold">
                    <LogOut size={16}/> Выход
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}