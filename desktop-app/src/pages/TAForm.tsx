import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function TAForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', model: '', serialNumber: '', address: '', status: 'Работает'
  });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/vending-machines', form);
      navigate('/ta');
    } catch (err) {
      alert("Ошибка: Серийный номер должен быть уникальным!");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-6">Новый торговый автомат</h2>
      <form onSubmit={save} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-xs font-bold text-gray-400">НАЗВАНИЕ</label>
          <input required className="w-full border p-2 rounded mt-1" onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400">МОДЕЛЬ</label>
          <input required className="w-full border p-2 rounded mt-1" onChange={e => setForm({...form, model: e.target.value})} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400">СЕРИЙНЫЙ НОМЕР</label>
          <input required className="w-full border p-2 rounded mt-1" onChange={e => setForm({...form, serialNumber: e.target.value})} />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-bold text-gray-400">АДРЕС УСТАНОВКИ</label>
          <input required className="w-full border p-2 rounded mt-1" onChange={e => setForm({...form, address: e.target.value})} />
        </div>
        <div className="col-span-2 pt-4 flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Сохранить</button>
          <button type="button" onClick={() => navigate('/ta')} className="bg-gray-100 px-6 py-2 rounded-lg text-gray-600">Отмена</button>
        </div>
      </form>
    </div>
  );
}