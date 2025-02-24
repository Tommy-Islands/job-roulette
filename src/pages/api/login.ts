import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

const CORRECT_PASSWORD = '0721';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { password } = req.body;

  if (password === CORRECT_PASSWORD) {
    // 認証用Cookieを設定
    res.setHeader('Set-Cookie', serialize('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24時間
      path: '/',
    }));

    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
} 