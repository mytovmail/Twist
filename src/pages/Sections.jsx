import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, TrendingUp, Sparkles, ChefHat, Shirt, Star, Smile, Bot, BookOpen, Loader2, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSheetCSV, getSheetUrls, isConfigured } from '@/lib/googleSheets';

const SECTION_META = [
  { id: 'empowerment', title: 'העצמה וטיפול רגשי', icon: Heart, color: 'from-purple-500 to-pink-500' },
  { id: 'finance-paamonim', title: 'צמיחה כלכלית - התנהלות נכונה', icon: TrendingUp, color: 'from-green-500 to-teal-500' },
  { id: 'finance-business', title: 'מדברים עסקים', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
  { id: 'daily-spark', title: 'הניצוץ היומי', icon: Sparkles, color: 'from-amber-500 to-orange-500' },
  { id: 'recipes', title: 'מתכונים', icon: ChefHat, color: 'from-red-500 to-rose-500' },
  { id: 'fashion', title: 'אופנה', icon: Shirt, color: 'from-pink-500 to-fuchsia-500' },
  { id: 'weekly-tip', title: 'הטיפ השבועי', icon: Star, color: 'from-yellow-500 to-amber-500' },
  { id: 'euphoria', title: 'רגע של אופוריה', icon: Smile, color: 'from-teal-500 to-emerald-500' },
  { id: 'ai', title: 'מדור AI הדסים', icon: Bot, color: 'from-indigo-500 to-violet-500' },
  { id: 'story', title: 'סיפור בהמשכים', icon: BookOpen, color: 'from-slate-500 to-gray-600' },
];

export default function Sections() {
  const urlParams = new URLSearchParams(window.location.search);
  const [activeTab, setActiveTab] = useState(urlParams.get('tab') || SECTION_META[0].id);
  const sectionsConfigured = isConfigured('sections');
  const sheetUrl = getSheetUrls().sections;

  const { data: sheetRows = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['sections-sheet', sheetUrl],
    queryFn: () => fetchSheetCSV(sheetUrl),
    enabled: sectionsConfigured,
    staleTime: 5 * 60 * 1000,
  });

  // Merge sheet data with static metadata
  const sections = SECTION_META.map(meta => {
    const sheetRow = sheetRows.find(r => r.section_id === meta.id) || {};
    return {
      ...meta,
      subtitle: sheetRow.subtitle || sheetRow.author || '',
      description: sheetRow.description || sheetRow.content || 'התכנים מתעדכנים מדי שבוע עם גליון חדש של המגזין.',
      extra_content: sheetRow.extra_content || '',
    };
  });

  const activeSection = sections.find(s => s.id === activeTab) || sections[0];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-rubik font-bold text-foreground mb-3">המדורים</h1>
          <p className="text-muted-foreground">תחומי עניין מרתקים שמתעדכנים בכל שבוע</p>
          {sectionsConfigured && (
            <button onClick={() => refetch()} className="mt-2 text-xs text-muted-foreground/60 hover:text-muted-foreground flex items-center gap-1 mx-auto">
              <RefreshCw className="w-3 h-3" /> רענן תוכן
            </button>
          )}
        </motion.div>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === section.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
            </button>
          ))}
        </div>

        {/* Active section content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeSection.color} flex items-center justify-center`}>
                  <activeSection.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-rubik font-bold text-foreground">{activeSection.title}</h2>
                  {activeSection.subtitle && <p className="text-muted-foreground text-sm">{activeSection.subtitle}</p>}
                </div>
              </div>

              {isLoading && sectionsConfigured ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="mr-2 text-muted-foreground">טוען תוכן...</span>
                </div>
              ) : (
                <>
                  <p className="text-foreground/80 leading-relaxed text-lg whitespace-pre-line">
                    {activeSection.description}
                  </p>
                  {activeSection.extra_content && (
                    <p className="text-foreground/70 leading-relaxed mt-4 whitespace-pre-line">
                      {activeSection.extra_content}
                    </p>
                  )}
                </>
              )}

              {!sectionsConfigured && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 text-right">
                  💡 <strong>להפעלת תוכן אוטומטי:</strong> עדכן את כתובת ה-Google Sheets בקובץ <code>lib/googleSheets.js</code>
                </div>
              )}

              {isError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-right">
                  ❌ לא ניתן לטעון תוכן מהגיליון. בדקי שהגיליון פורסם כ-CSV ציבורי.
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}