import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Plus, Trash2, Search } from 'lucide-react';

export default function AdminTA() {
  const [machines, setMachines] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const loadData = () => {
    api.get('/vending-machines').then(res => setMachines(res.data));
  };

  useEffect(() => { loadData(); }, []);

  const deleteMachine = async (id: number) => {
    if (confirm('Удалить этот аппарат?')) {
      await api.delete(`/vending-machines/${id}`);
      loadData(); // Перезагружаем список
    }
  };

  // Фильтрация по названию
  const filtered = machines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Торговые автоматы</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text" placeholder="Поиск по названию..."
              className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate('/ta/add')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={18} /> Добавить ТА
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Название</th>
            <th className="p-4">Модель</th>
            <th className="p-4">Адрес</th>
            <th className="p-4">Статус</th>
            <th className="p-4 text-center">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {filtered.map(m => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="p-4">{m.id}</td>
              <td className="p-4 font-bold text-blue-600">{m.name}</td>
              <td className="p-4">{m.model}</td>
              <td className="p-4 text-gray-500">{m.address}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-[10px] ${m.status === 'Работает' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {m.status}
                </span>
              </td>
              <td className="p-4 text-center">
                <button onClick={() => deleteMachine(m.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}