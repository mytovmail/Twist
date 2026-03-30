import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Heart } from 'lucide-react';

const LINKS = {
  advertising: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D%2C+%D7%90%D7%A0%D7%99+%D7%A8%D7%95%D7%A6%D7%94+%D7%9C%D7%A9%D7%9E%D7%95%D7%A2+%D7%A4%D7%A8%D7%98%D7%99%D7%9D+%D7%A2%D7%9C+%D7%94%D7%A6%D7%A2%D7%AA+%D7%A9%D7%99%D7%95%D7%95%D7%A7+%D7%9E%D7%A9%D7%AA%D7%9C%D7%9E%D7%AA!&to=shivuk.twist%40gmail.com',
  comments: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D+%D7%A8%D7%A6%D7%99%D7%AA%D7%99+%D7%9C%D7%94%D7%A2%D7%99%D7%A8+%2F+%D7%9C%D7%94%D7%90%D7%99%D7%A8+%D7%95%D7%9C%D7%94%D7%A6%D7%99%D7%A2&to=10think.aboutit%40gmail.com',
  requests: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D+%D7%A8%D7%A6%D7%99%D7%AA%D7%99+%D7%9C%D7%91%D7%A7%D7%A9&to=10think.aboutit%40gmail.com',
  readers: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D%2C+%D7%A8%D7%A6%D7%99%D7%AA%D7%99+%D7%9C%D7%95%D7%9E%D7%A8+%D7%9C%D7%9B%D7%9D&to=10think.aboutit%40gmail.com',
};

export default function Footer() {
  return (
    <footer className="bg-[#1e0a2e] text-white">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-l from-[#e040fb] via-[#00e5ff] to-[#ff6d00]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-rubik font-black text-2xl mb-3"
              style={{ background: 'linear-gradient(135deg, #e040fb, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              טוויסט
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              מגזין שבועי לאישה החרדית.<br />
              העצמה, צמיחה כלכלית, מתכונים, אופנה ועוד.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm text-white/70 tracking-widest uppercase">ניווט</h4>
            <div className="space-y-2">
              {[['/', 'ראשי'], ['/sections', 'מדורים'], ['/archive', 'ארכיון'], ['/about', 'אודות']].map(([path, label]) => (
                <Link key={path} to={path} className="block text-sm text-white/50 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm text-white/70 tracking-widest uppercase">צרו קשר</h4>
            <div className="space-y-2">
              {[
                [LINKS.advertising, 'להצעת פרסום'],
                [LINKS.comments, 'להערות והארות'],
                [LINKS.requests, 'לבקשות'],
                [LINKS.readers, 'קוראים כותבים'],
              ].map(([href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© כל הזכויות שמורות למגזין טוויסט</p>
          <a
            href="https://xsx-x.github.io/Good-heart/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white/60 transition-colors"
          >
            נבנה עם <Heart className="w-3 h-3 text-rose-400" /> ע״י לב טוב
          </a>
        </div>
      </div>
    </footer>
  );
}