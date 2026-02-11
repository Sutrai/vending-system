import { useEffect, useState } from 'react';
import api from '../api/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get('/stats/summary').then(res => setData(res.data));
  }, []);

  if (!data) return <div className="p-10">Загрузка данных...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Главная страница</h2>

      {/* Сетка блоков 3 колонки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1. Эффективность сети */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
          <h3 className="font-bold mb-4 text-gray-500 uppercase text-xs">Эффективность сети</h3>
          <div className="text-center">
             <div className="text-4xl font-black text-green-600">{data.efficiency}%</div>
             <p className="text-gray-400 text-sm mt-2">Работающих автоматов</p>
          </div>
        </div>

        {/* 2. Состояние сети (Круговая диаграмма) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
          <h3 className="font-bold mb-2 text-gray-500 uppercase text-xs">Состояние сети</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.statuses} dataKey="value" innerRadius={30} outerRadius={50} paddingAngle={5}>
                  {data.statuses.map((_:any, i:number) => (
                    <Cell key={i} fill={['#10b981', '#ef4444', '#3b82f6'][i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Сводка */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-orange-500">
          <h3 className="font-bold mb-4 text-gray-500 uppercase text-xs">Сводка (Сегодня)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Выручка:</span> <span className="font-bold">{data.revenueToday} ₽</span></div>
            <div className="flex justify-between"><span>Денег в ТА:</span> <span className="font-bold">{data.cashInMachine} ₽</span></div>
          </div>
        </div>

        {/* 4. Динамика продаж (на 2 колонки) */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-bold mb-6 text-gray-500 uppercase text-xs">Динамика продаж (10 дней)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chartData}>
                <XAxis dataKey="day" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="val" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Новости */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-gray-300">
          <h3 className="font-bold mb-4 text-gray-500 uppercase text-xs">Новости</h3>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-xs text-blue-600 font-bold">Обновление системы 2.0</p>
              <p className="text-[10px] text-gray-400">Добавлена поддержка QR-платежей...</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-bold">Технический перерыв</p>
              <p className="text-[10px] text-gray-400">15 февраля сервер будет недоступен 2 часа.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}