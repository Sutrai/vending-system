import { useState, useEffect } from 'react';
import api from '../api';
import { User, Clock, AlertTriangle } from 'lucide-react';

export default function WorkSchedule() {
  const [tasks, setTasks] = useState([]);      // Заявки (статус Новая/В работе)
  const [engineers, setEngineers] = useState([]); // Список техников

  useEffect(() => {
    // Загружаем задачи и инженеров
    api.get('/tasks').then(res => setTasks(res.data));
    api.get('/users/engineers').then(res => setEngineers(res.data));
  }, []);

  // Функция назначения задачи (Диспетчеризация)
  const assignTask = async (taskId, engId) => {
    try {
      // Отправляем на сервер ID задачи и ID инженера
      await api.post(`/tasks/${taskId}/assign`, { engineerId: engId });
      alert("Задача назначена!");
      // Обновляем список локально
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'В работе', engineerName: 'Назначен' } : t));
    } catch (e) {
      alert("Ошибка: " + e.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">График работ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Колонна 1: Список новых заявок */}
        <div className="space-y-4">
          <h2 className="font-bold text-gray-600 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={20}/> Новые заявки
          </h2>

          {tasks.filter(t => t.status === 'Новая').map(task => (
            <div key={task.id} className="bg-white p-4 rounded shadow border-l-4 border-orange-400">
              <div className="flex justify-between font-bold">
                <span>{task.machineName}</span>
                <span className="text-red-500">{task.priority === 'Авария' ? '!!! АВАРИЯ !!!' : ''}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{task.address}</p>

              <div className="mt-4 border-t pt-3 flex flex-wrap gap-2">
                <span className="text-[10px] text-gray-400 w-full">Назначить инженера:</span>
                {engineers.map(eng => (
                  <button
                    key={eng.id}
                    onClick={() => assignTask(task.id, eng.id)}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-xs hover:bg-blue-600 hover:text-white transition"
                  >
                    {eng.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Колонна 2: Текущая загрузка (Расписание) */}
        <div className="space-y-4">
          <h2 className="font-bold text-gray-600 flex items-center gap-2">
            <User className="text-blue-500" size={20}/> Загрузка сотрудников
          </h2>

          {engineers.map(eng => (
            <div key={eng.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">{eng.name}</span>
                <span className="text-xs text-gray-400">Спец: {eng.models?.join(', ')}</span>
              </div>

              {/* Простая шкала времени (имитация 10-часового дня) */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Загрузка за день</span>
                  <span>{eng.workHours || 0} / 10 ч.</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${eng.workHours > 8 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${(eng.workHours || 0) * 10}%` }}
                  ></div>
                </div>
                {eng.workHours > 10 && <p className="text-[10px] text-red-500 mt-1">Перегрузка! Система перенесет задачи.</p>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}