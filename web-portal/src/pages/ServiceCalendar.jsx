import { useState, useEffect } from 'react';
import api from '../api';

export default function ServiceCalendar() {
  const [machines, setMachines] = useState([]);
  const [filter, setFilter] = useState('');

  // 1. Загружаем данные
  useEffect(() => {
    api.get('/vending-machines').then(res => setMachines(res.data));
  }, []);

  // 2. Функция расчета: когда следующее ТО и какой будет цвет
  const getServiceInfo = (m) => {
    // Берем дату последней проверки из БД
    const lastCheck = new Date(m.lastCheckDate || '2024-01-01');
    const interval = m.serviceInterval || 6; // если интервал не указан, берем 6 месяцев

    // Считаем дату следующего ТО: прибавляем месяцы
    const nextCheck = new Date(lastCheck);
    nextCheck.setMonth(nextCheck.getMonth() + interval);

    // Считаем разницу в днях между сегодня и датой ТО
    const today = new Date();
    const diffTime = nextCheck - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Проверка ресурса (по ТЗ: если ресурс > 80%, то нужно ТО)
    const isResourceLow = m.currentWorkHours > (m.maxResource * 0.8);

    // Выбираем цвет по ТЗ
    let color = 'bg-green-500'; // Зеленый: Плановое ТО
    if (diffDays < 0 || isResourceLow) color = 'bg-red-500'; // Красный: Просрочено
    else if (diffDays < 5) color = 'bg-yellow-500'; // Желтый: Меньше 5 дней

    return {
      dateStr: nextCheck.toLocaleDateString(),
      month: nextCheck.getMonth(),
      color: color
    };
  };

  // 3. Список месяцев для заголовков
  const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Календарь обслуживания</h1>

      {/* Фильтр (простой поиск по названию) */}
      <input
        type="text"
        placeholder="Поиск аппарата..."
        className="border p-2 mb-6 w-full max-w-sm rounded"
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
      />

      {/* Сетка календаря по месяцам */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {months.map((monthName, monthIdx) => (
          <div key={monthName} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold border-b pb-2 mb-4 text-blue-600">{monthName}</h2>

            <div className="space-y-2">
              {machines
                .filter(m => m.name.toLowerCase().includes(filter)) // фильтр
                .filter(m => getServiceInfo(m).month === monthIdx) // только аппараты этого месяца
                .map(m => {
                  const info = getServiceInfo(m);
                  return (
                    <div
                      key={m.id}
                      title={`Модель: ${m.model}\nМесто: ${m.address}`} // Инфо при наведении (по ТЗ)
                      className={`${info.color} text-white p-2 rounded text-xs cursor-help flex justify-between`}
                    >
                      <span className="font-bold">{m.name}</span>
                      <span>{info.dateStr}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}3