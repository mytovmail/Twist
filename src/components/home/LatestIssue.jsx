import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function LatestIssue() {
  const { data: issues } = useQuery({
    queryKey: ['latest-issue'],
    queryFn: () => base44.entities.MagazineIssue.list('-issue_number', 1),
    initialData: [],
  });

  const latest = issues[0];

  if (!latest) return null;

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          {latest.cover_image_url && (
            <div className="w-full md:w-1/3">
              <img
                src={latest.cover_image_url}
                alt={latest.title}
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-right">
            <span className="text-secondary font-bold text-sm mb-2 block">גליון אחרון</span>
            <h2 className="text-3xl sm:text-4xl font-rubik font-bold text-foreground mb-3">
              {latest.title}
            </h2>
            {latest.parasha && (
              <p className="text-muted-foreground mb-2">פרשת {latest.parasha}</p>
            )}
            {latest.description && (
              <p className="text-muted-foreground mb-6 leading-relaxed">{latest.description}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button asChild className="rounded-full gap-2">
                <Link to="/archive">
                  <Eye className="w-4 h-4" />
                  צפייה בגליון
                </Link>
              </Button>
              {latest.drive_url && (
                <Button asChild variant="outline" className="rounded-full gap-2">
                  <a href={latest.drive_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    פתיחה בדרייב
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}