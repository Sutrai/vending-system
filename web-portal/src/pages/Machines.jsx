import { useState } from 'react';
import * as XLSX from 'xlsx';
import api from '../api';
import { Upload, AlertCircle, CheckCircle, Database } from 'lucide-react';

export default function Machines() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const json = XLSX.utils.sheet_to_json(ws);

      validateData(json);
    };
    reader.readAsBinaryString(file);
  };

  const validateData = (rows) => {
    const errs = [];
    const valids = [];

    rows.forEach((row, index) => {
      const rowNum = index + 1;
      let hasError = false;

      // Названия полей должны совпадать с VendingMachine.java
      const fields = ['name', 'serialNumber', 'inventoryNumber', 'model', 'address', 'country'];

      fields.forEach(f => {
        if (!row[f]) {
          errs.push(`Строка ${rowNum}: отсутствует поле ${f}`);
          hasError = true;
        }
      });

      if (!hasError) {
        valids.push(row);
      }
    });

    setErrors(errs);
    setData(valids);
  };

  const sendToApi = async () => {
    setLoading(true);
    try {
      // Отправляем массив объектов на эндпоинт /bulk
      await api.post('/vending-machines/bulk', data);
      alert("Успешно импортировано!");
      setData([]);
    } catch (err) {
      alert("Ошибка API: " + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Загрузка торговых аппаратов</h1>

      <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center hover:border-blue-400 transition cursor-pointer relative">
        <input type="file" accept=".xlsx, .xls" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
        <Upload size={48} className="text-blue-500 mb-4" />
        <p className="text-slate-600 font-medium">Перетащите Excel-файл или кликните для выбора</p>
        <p className="text-slate-400 text-xs mt-2">Поддерживаются форматы .xlsx, .xls</p>
      </div>

      {errors.length > 0 && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
            <AlertCircle size={20} /> Ошибки в файле ({errors.length}):
          </div>
          <div className="max-h-32 overflow-auto text-xs text-red-500 space-y-1">
            {errors.map((e, i) => <p key={i}>• {e}</p>)}
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-slate-700 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" /> Готово к импорту: {data.length} ТА
            </h2>
            <button
              onClick={sendToApi}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-slate-400 flex items-center gap-2"
            >
              <Database size={18} /> {loading ? "Загрузка..." : "Сохранить в базу"}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-4 text-slate-500 font-semibold uppercase text-[10px]">Название</th>
                  <th className="p-4 text-slate-500 font-semibold uppercase text-[10px]">Модель</th>
                  <th className="p-4 text-slate-500 font-semibold uppercase text-[10px]">Серийный номер</th>
                  <th className="p-4 text-slate-500 font-semibold uppercase text-[10px]">Адрес</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium">{row.name}</td>
                    <td className="p-4">{row.model}</td>
                    <td className="p-4 font-mono">{row.serialNumber}</td>
                    <td className="p-4">{row.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}