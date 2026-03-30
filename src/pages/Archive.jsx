import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ExternalLink, X, BookOpen, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fetchSheetCSV, getSheetUrls, isConfigured } from '@/lib/googleSheets';

export default function Archive() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const archiveConfigured = isConfigured('archive');
  const sheetUrl = getSheetUrls().archive;

  const { data: sheetIssues = [], isLoading: sheetLoading, isError: sheetError, refetch } = useQuery({
    queryKey: ['archive-sheet', sheetUrl],
    queryFn: () => fetchSheetCSV(sheetUrl),
    enabled: archiveConfigured,
    staleTime: 5 * 60 * 1000,
  });

  const { data: dbIssues = [], isLoading: dbLoading } = useQuery({
    queryKey: ['archive-issues'],
    queryFn: () => base44.entities.MagazineIssue.list('-issue_number'),
    enabled: !archiveConfigured || sheetError,
    initialData: [],
  });

  const rawIssues = archiveConfigured && !sheetError ? sheetIssues : dbIssues;
  const isLoading = archiveConfigured ? sheetLoading : dbLoading;

  // Normalize sheet rows to match expected shape
  const issues = rawIssues.map(item => ({
    id: item.id || item.issue_number || Math.random(),
    title: item.title || `גליון ${item.issue_number}`,
    issue_number: Number(item.issue_number) || 0,
    parasha: item.parasha || '',
    date: item.date || '',
    drive_url: item.drive_url || '',
    cover_image_url: item.cover_image_url || '',
    description: item.description || '',
  })).sort((a, b) => b.issue_number - a.issue_number);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-5xl font-rubik font-bold text-foreground mb-3">ארכיון גליונות</h1>
          <p className="text-muted-foreground">כל הגליונות שהופצו - במקום אחד</p>
          {archiveConfigured && (
            <button onClick={() => refetch()} className="mt-2 text-xs text-muted-foreground/60 hover:text-muted-foreground flex items-center gap-1 mx-auto">
              <RefreshCw className="w-3 h-3" /> רענן מהגיליון
            </button>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-4 animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-xl mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">עדיין אין גליונות בארכיון</p>
            <p className="text-muted-foreground/60 text-sm mt-2">הגליונות יתעדכנו בקרוב</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {issues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedIssue(issue)}
              >
                <div className="bg-card rounded-2xl border border-border p-4 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  {issue.cover_image_url ? (
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4">
                      <img
                        src={issue.cover_image_url}
                        alt={issue.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                      <BookOpen className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  <h3 className="font-bold text-sm text-foreground mb-1">{issue.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {issue.parasha && <span>פרשת {issue.parasha}</span>}
                    {issue.date && (
                      <>
                        {issue.parasha && <span>•</span>}
                        <span>{format(new Date(issue.date), 'dd/MM/yyyy')}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="rounded-full gap-2">
            <a
              href="https://drive.google.com/drive/folders/1Zsp_VdtG6NIaXF2iDnLxKGJNR6dLOOo4?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              פתיחת תיקיית הדרייב
            </a>
          </Button>
        </div>
      </div>

      {/* Embedded viewer modal */}
      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div>
                  <h2 className="font-bold text-foreground">{selectedIssue.title}</h2>
                  {selectedIssue.parasha && (
                    <p className="text-sm text-muted-foreground">פרשת {selectedIssue.parasha}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selectedIssue.drive_url && (
                    <Button asChild variant="outline" size="sm" className="rounded-full gap-1">
                      <a href={selectedIssue.drive_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5" />
                        פתיחה בדרייב
                      </a>
                    </Button>
                  )}
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1">
                {selectedIssue.drive_url ? (
                  <iframe
                    src={selectedIssue.drive_url.replace('/view', '/preview').replace('?usp=drive_link', '')}
                    className="w-full h-full border-0"
                    title={selectedIssue.title}
                    allow="autoplay"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>לא זמין לתצוגה מוטמעת</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}