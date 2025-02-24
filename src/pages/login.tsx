import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('パスワードが正しくありません');
    }
  };

  return (
    <div className="min-h-screen bg-[#1d1c1c] flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="bg-[#2a2829] p-8 rounded-lg w-full max-w-md">
        <h1 className="text-[#fff] text-2xl mb-6 text-center">ログイン</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-[#1d1c1c] text-[#fff] rounded"
          placeholder="パスワードを入力"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#594731] text-[#b89249] rounded hover:bg-[#6a563b]"
        >
          ログイン
        </button>
      </form>
    </div>
  );
} 