import { useState } from 'react';
import api from '../api/api';

export default function Login({ setAuth }: { setAuth: (v: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/login?email=${email}&password=${password}`);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      setAuth(true);
    } catch (err) {
      alert("Ошибка авторизации");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center">Vending System</h1>
        <input
          type="email" placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-700 border-none outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Пароль"
          className="w-full p-3 mb-6 rounded bg-gray-700 border-none outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 py-3 rounded-lg font-bold hover:bg-blue-700">Войти</button>
      </form>
    </div>
  );
}