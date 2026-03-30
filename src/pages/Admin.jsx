import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, EyeOff, Settings, CheckCircle, Lock } from 'lucide-react';

const ADMIN_PASSWORD = 'twist2024admin';
const STORAGE_KEY = 'twist_sheet_urls';

const FIELDS = [
  {
    key: 'sections',
    label: 'גיליון מדורים (Sections)',
    placeholder: 'https://docs.google.com/spreadsheets/d/e/...pub?gid=0&single=true&output=csv',
    hint: 'גיליון עם עמודות: section_id, subtitle, description, extra_content',
  },
  {
    key: 'archive',
    label: 'גיליון ארכיון גליונות (Archive)',
    placeholder: 'https://docs.google.com/spreadsheets/d/e/...pub?gid=1&single=true&output=csv',
    hint: 'גיליון עם עמודות: issue_number, title, parasha, date, drive_url, description, cover_image_url',
  },
];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [urls, setUrls] = useState({ sections: '', archive: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setUrls(JSON.parse(stored)); } catch {}
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4a1a6b] via-[#2d1b4e] to-[#1a1a3e] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 w-full max-w-sm text-center"
        >
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-rubik font-bold text-white mb-1">ניהול טוויסט</h1>
          <p className="text-white/50 text-sm mb-6">אזור מוגן</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setPwError(false); }}
                placeholder="סיסמה"
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/40 text-center focus:outline-none focus:ring-2 focus:ring-teal-400 ${pwError ? 'border-red-400' : 'border-white/20'}`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {pwError && <p className="text-red-400 text-sm">סיסמה שגויה</p>}
            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 rounded-xl transition-colors">
              כניסה
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a1a6b] via-[#2d1b4e] to-[#1a1a3e] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal-500/30 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h1 className="text-2xl font-rubik font-bold text-white">ממשק ניהול טוויסט</h1>
              <p className="text-white/50 text-sm">עדכון כתובות Google Sheets</p>
            </div>
          </div>

          <div className="space-y-5 mb-8">
            {FIELDS.map(field => (
              <div key={field.key} className="bg-white/10 border border-white/15 rounded-2xl p-6">
                <label className="block text-white font-semibold mb-1">{field.label}</label>
                <p className="text-white/40 text-xs mb-3">{field.hint}</p>
                <textarea
                  value={urls[field.key] || ''}
                  onChange={e => setUrls(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                  dir="ltr"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-2xl transition-all text-lg"
          >
            {saved ? <><CheckCircle className="w-5 h-5" /> נשמר בהצלחה!</> : <><Save className="w-5 h-5" /> שמור כתובות</>}
          </button>

          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white/50 leading-relaxed">
            <p className="font-semibold text-white/70 mb-2">⚙️ הוראות:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>פתח את הגיליון בגוגל שיטס</li>
              <li>File → Share → Publish to web</li>
              <li>בחר את הטאב הרצוי → CSV → Publish</li>
              <li>העתק את הכתובת והדבק כאן</li>
              <li>לחץ שמור - האתר יתעדכן מיד</li>
            </ol>
            <p className="mt-3 text-white/30 text-xs">הכתובות נשמרות בדפדפן. הדף הזה נגיש רק דרך /admin</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}