import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Sparkles, ChefHat, Shirt, Star, Smile, Bot, BookOpen, ArrowLeft } from 'lucide-react';

const SECTIONS = [
  { id: 'empowerment', title: 'העצמה וטיפול רגשי', subtitle: 'הרב חנניה מנס', icon: Heart, bg: 'bg-orange-500' },
  { id: 'finance-paamonim', title: 'צמיחה כלכלית', subtitle: 'ארגון פעמונים', icon: TrendingUp, bg: 'bg-teal-500' },
  { id: 'finance-business', title: 'מדברים עסקים', subtitle: 'נחום ברוק', icon: TrendingUp, bg: 'bg-blue-500' },
  { id: 'daily-spark', title: 'הניצוץ היומי', subtitle: 'רעות', icon: Sparkles, bg: 'bg-amber-500' },
  { id: 'recipes', title: 'מתכונים', subtitle: '', icon: ChefHat, bg: 'bg-rose-500' },
  { id: 'fashion', title: 'אופנה וסטייל', subtitle: '', icon: Shirt, bg: 'bg-fuchsia-500' },
  { id: 'weekly-tip', title: 'הטיפ השבועי', subtitle: 'סקירת מוצרים', icon: Star, bg: 'bg-yellow-500' },
  { id: 'euphoria', title: 'רגע של אופוריה', subtitle: '', icon: Smile, bg: 'bg-emerald-500' },
  { id: 'ai', title: 'מדור AI הדסים', subtitle: 'הדסה בלוי', icon: Bot, bg: 'bg-violet-500' },
  { id: 'story', title: 'סיפור בהמשכים', subtitle: 'שרי רובל', icon: BookOpen, bg: 'bg-slate-600' },
];

export default function SectionsPreview() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Magazine-style section header */}
          <div className="flex items-center gap-4 mb-3">
            <div className="h-1 flex-1 bg-gradient-to-l from-primary/20 to-transparent rounded-full" />
            <span className="text-xs font-bold tracking-[0.2em] text-primary/60 uppercase">תחומי עניין</span>
            <div className="h-1 flex-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-rubik font-black text-center text-foreground">
            המדורים שלנו
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/sections?tab=${section.id}`}
                className="group flex flex-col items-center p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 text-center h-full"
              >
                <div className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-sm text-foreground mb-0.5 leading-tight">{section.title}</h3>
                {section.subtitle && <p className="text-xs text-muted-foreground">{section.subtitle}</p>}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/sections"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold rounded-full px-7 py-3 hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
          >
            לכל המדורים
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}