import { useState } from 'react';
import api from '../api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Отправляем данные (подправь URL под свой бэкенд)
      const res = await api.post(`/auth/login?email=${email}&password=${password}`);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        onLoginSuccess();
      }
    } catch (err) {
      alert("Ошибка входа: " + (err.response?.status || "Бэкенд не отвечает"));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 text-sm">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-6 text-center">Вход в Web-Portal</h2>
        <input
          type="email" placeholder="Email" required
          className="w-full border p-2 mb-4 rounded"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Пароль" required
          className="w-full border p-2 mb-6 rounded"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">
          Войти
        </button>
      </form>
    </div>
  );
}