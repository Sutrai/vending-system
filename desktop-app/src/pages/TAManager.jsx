import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Edit, Trash2, Plus, Download } from 'lucide-react';

export default function TAManager() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/vending-machines').then(res => setList(res.data));
  }, []);

  return (
    <div className="bg-white p-4 border rounded shadow-sm text-[11px]">
      <div className="flex justify-between mb-4 border-b pb-2">
        <h2 className="text-blue-500 font-bold uppercase">Торговые автоматы</h2>
        <div className="flex gap-2">
          <button onClick={() => navigate('/ta/add')} className="border px-3 py-1 flex items-center gap-1"><Plus size={14}/> Добавить</button>
          <button className="border px-3 py-1 flex items-center gap-1"><Download size={14}/> Экспорт</button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-gray-100 border-b-2 border-blue-400">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Название автомата</th>
            <th className="p-2 text-left">Модель</th>
            <th className="p-2 text-left">Компания</th>
            <th className="p-2 text-left">Модем</th>
            <th className="p-2 text-left">Адрес / Место</th>
            <th className="p-2 text-left">В работе</th>
            <th className="p-2 text-center">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {list.map(m => (
            <tr key={m.id} className="hover:bg-gray-50 odd:bg-gray-50/50">
              <td className="p-2 text-gray-500">{m.id}</td>
              <td className="p-2 font-bold text-blue-600 underline">{m.name}</td>
              <td className="p-2">{m.model}</td>
              <td className="p-2 text-blue-400">ООО Торговые автоматы</td>
              <td className="p-2">1824100025</td>
              <td className="p-2">{m.address}</td>
              <td className="p-2">12.05.2018</td>
              <td className="p-2 flex justify-center gap-2">
                <Edit size={14} className="text-blue-400 cursor-pointer"/>
                <Trash2 size={14} className="text-red-400 cursor-pointer"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}