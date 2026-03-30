import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function FeedbackMarquee({ feedbacks, type }) {
  if (!feedbacks || feedbacks.length === 0) return null;

  const label = type === 'reader' ? 'קוראים מספרים' : 'מפרסמים ממליצים';

  // Duplicate for infinite scroll
  const items = [...feedbacks, ...feedbacks];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-rubik font-bold text-foreground mb-6 text-center">{label}</h3>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-l from-transparent to-background z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-background z-10" />
        
        <motion.div
          className="flex gap-6"
          animate={{ x: type === 'reader' ? ['0%', '-50%'] : ['-50%', '0%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: feedbacks.length * 5,
              ease: 'linear',
            },
          }}
        >
          {items.map((fb, i) => (
            <div
              key={`${fb.id}-${i}`}
              className="flex-shrink-0 w-72 bg-card rounded-2xl border border-border p-6 shadow-sm"
            >
              <Quote className="w-6 h-6 text-primary/30 mb-3" />
              <p className="text-sm text-foreground/80 leading-relaxed mb-4 line-clamp-4">
                {fb.text}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{fb.name?.[0]}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{fb.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}