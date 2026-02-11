import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Monitor, FileText, ShoppingCart, Settings, ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const menu = [
    { name: 'Главная', icon: <LayoutDashboard size={18}/>, path: '/' },
    { name: 'Монитор ТА', icon: <Monitor size={18}/>, path: '/monitor' },
    { name: 'Детальные отчеты', icon: <FileText size={18}/>, sub: ['Продажи', 'Инкассация'] },
    { name: 'Учет ТМЦ', icon: <ShoppingCart size={18}/>, sub: ['Склады', 'Товары'] },
    { name: 'Администрирование', icon: <Settings size={18}/>, path: '/ta', sub: ['Торговые автоматы', 'Компании', 'Модемы'] },
  ];

  return (
    <aside className="w-56 bg-[#1a202c] text-gray-400 flex flex-col h-full border-r border-gray-800">
      <div className="h-12 bg-white flex items-center px-6 text-gray-800 font-bold text-lg border-b">
        Лого
      </div>
      <div className="p-2 text-[10px] uppercase font-bold text-gray-600 mt-2 ml-2">Навигация</div>
      <nav className="flex-1 px-2 space-y-1">
        {menu.map(item => (
          <div key={item.name}>
            <div className="flex items-center justify-between p-2 hover:bg-gray-800 hover:text-white rounded cursor-pointer transition">
               <Link to={item.path || '#'} className="flex items-center gap-3">
                 {item.icon} <span className="text-[12px]">{item.name}</span>
               </Link>
               {item.sub && <ChevronDown size={14} onClick={() => setOpenSub(openSub === item.name ? null : item.name)} />}
            </div>
            {item.sub && openSub === item.name && (
              <div className="ml-8 mt-1 space-y-1">
                {item.sub.map(s => <Link key={s} to="/ta" className="block p-2 text-[11px] hover:text-white">{s}</Link>)}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}