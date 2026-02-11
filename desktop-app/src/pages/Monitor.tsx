import { useEffect, useState } from 'react';
import api from '../api/api';
import { Wifi, Search, Filter } from 'lucide-react';

export default function Monitor() {
  const [machines, setMachines] = useState<any[]>([]);

  useEffect(() => {
    api.get('/vending-machines/monitor').then(res => setMachines(res.data));
  }, []);

  return (
    <div className="bg-white border rounded shadow-sm">
      {/* Фильтры сверху */}
      <div className="p-4 border-b bg-gray-50 flex items-center gap-6">
        <div className="flex items-center gap-2">
           <span className="text-[11px] font-bold text-gray-500 uppercase">Общее состояние</span>
           <div className="flex gap-1">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
           </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold">Применить</button>
        <button className="border bg-white px-4 py-1.5 rounded text-xs">Очистить</button>
      </div>

      <table className="w-full text-[10px] border-collapse">
        <thead className="bg-gray-100 border-b text-gray-600">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border text-left">Торговый автомат</th>
            <th className="p-2 border">Связь</th>
            <th className="p-2 border">Загрузка</th>
            <th className="p-2 border text-left">Денежные средства</th>
            <th className="p-2 border text-left">События</th>
            <th className="p-2 border">Оборудование</th>
            <th className="p-2 border">Инфо</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((m, i) => (
            <tr key={m.id} className="border-b hover:bg-blue-50">
              <td className="p-2 text-center border-r text-gray-400">{i+1}</td>
              <td className="p-2 border-r">
                <p className="font-bold text-blue-600">{m.id} - "{m.name}"</p>
                <p className="text-gray-400">Saeco Cristallo 400</p>
                <p className="italic text-gray-400">ул. Пушкина, 10</p>
              </td>
              <td className="p-2 border-r text-center">
                <div className="flex flex-col items-center">
                  <Wifi size={14} className="text-blue-500" />
                  <span className="font-bold text-blue-500">{m.signal}%</span>
                </div>
              </td>
              <td className="p-2 border-r">
                <div className="space-y-1">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden"><div className="bg-green-500 h-full" style={{width: m.stock+'%'}}></div></div>
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden"><div className="bg-red-500 h-full" style={{width: '30%'}}></div></div>
                </div>
              </td>
              <td className="p-2 border-r">
                <p className="font-bold">{m.cash} р.</p>
                <p className="text-gray-400">Сдача: 12129 р.</p>
              </td>
              <td className="p-2 border-r text-gray-400">
                <p>11 мин. назад</p>
                <p>2 дня назад</p>
              </td>
              <td className="p-2 border-r text-center">
                <div className="flex gap-1 justify-center">
                  <span className="p-1 bg-green-100 text-green-600 rounded">MDB</span>
                  <span className="p-1 bg-blue-100 text-blue-600 rounded">EXE</span>
                </div>
              </td>
              <td className="p-2 text-center text-blue-500 underline font-bold">112 / 247</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-2 bg-gray-50 text-[11px] font-bold flex justify-between">
         <span>Итого автоматов: {machines.length} (9 / 0 / 0)</span>
         <span>Денег в автоматах: 22460 р. + 12129 р. (сдача)</span>
      </div>
    </div>
  );
}