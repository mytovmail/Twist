import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, Users, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import FeedbackMarquee from '../components/about/FeedbackMarquee';

const CONTACT_LINKS = {
  advertising: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D%2C+%D7%90%D7%A0%D7%99+%D7%A8%D7%95%D7%A6%D7%94+%D7%9C%D7%A9%D7%9E%D7%95%D7%A2+%D7%A4%D7%A8%D7%98%D7%99%D7%9D+%D7%A2%D7%9C+%D7%94%D7%A6%D7%A2%D7%AA+%D7%A9%D7%99%D7%95%D7%95%D7%A7+%D7%9E%D7%A9%D7%AA%D7%9C%D7%9E%D7%AA!&to=shivuk.twist%40gmail.com',
  comments: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D+%D7%A8%D7%A6%D7%99%D7%AA%D7%99+%D7%9C%D7%94%D7%A2%D7%99%D7%A8+%2F+%D7%9C%D7%94%D7%90%D7%99%D7%A8+%D7%95%D7%9C%D7%94%D7%A6%D7%99%D7%A2&to=10think.aboutit%40gmail.com',
  requests: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D+%D7%A8%D7%A6%D7%99%D7%AA%D7%99+%D7%9C%D7%91%D7%A7%D7%A9&to=10think.aboutit%40gmail.com',
  readers: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=%D7%A9%D7%9C%D7%95%D7%9D%2C+%D7%A8%D7%A6%D7%99%D7%AA%D7%99+%D7%9C%D7%95%D7%9E%D7%A8+%D7%9C%D7%9B%D7%9D&to=10think.aboutit%40gmail.com',
};

export default function About() {
  const { data: feedbacks } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: () => base44.entities.Feedback.filter({ is_active: true }),
    initialData: [],
  });

  const readerFeedbacks = feedbacks.filter(f => f.type === 'reader');
  const advertiserFeedbacks = feedbacks.filter(f => f.type === 'advertiser');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-5xl font-rubik font-bold text-foreground mb-4">אודות מגזין טוויסט</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              מגזין טוויסט הוא מגזין שבועי דיגיטלי המגיע לאלפי קוראים ומביא תוכן מגוון ומעשיר.
              מדורים בנושאי העצמה וטיפול רגשי, צמיחה כלכלית, מתכונים, אופנה, סיפורים בהמשכים ועוד.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Users, label: 'קוראים שבועיים', value: 'אלפי' },
              { icon: BookOpen, label: 'גליונות שהופצו', value: '80+' },
              { icon: Sparkles, label: 'מדורים מגוונים', value: '10+' },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border p-6 text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-rubik font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <Button asChild size="lg" className="rounded-full gap-2 bg-secondary hover:bg-secondary/90">
            <a href="https://twist1.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Heart className="w-5 h-5" />
              לקבלת המגזין מדי שבוע
            </a>
          </Button>
        </div>
      </section>

      {/* Feedbacks */}
      {(readerFeedbacks.length > 0 || advertiserFeedbacks.length > 0) && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-rubik font-bold text-foreground text-center mb-10">
              מה אומרים עלינו
            </h2>
            <FeedbackMarquee feedbacks={readerFeedbacks} type="reader" />
            <FeedbackMarquee feedbacks={advertiserFeedbacks} type="advertiser" />
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-rubik font-bold text-foreground text-center mb-10">
            צרו איתנו קשר
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'להצעת פרסום', desc: 'פרסום וחשיפה במדיה הדיגיטלית', link: CONTACT_LINKS.advertising, color: 'from-red-500 to-orange-500' },
              { label: 'להערות והארות', desc: 'נשמח לשמוע מכם', link: CONTACT_LINKS.comments, color: 'from-blue-500 to-cyan-500' },
              { label: 'לבקשות', desc: 'בקשות מיוחדות ופניות', link: CONTACT_LINKS.requests, color: 'from-purple-500 to-pink-500' },
              { label: 'למדור קוראים כותבים', desc: 'שלחו לנו את הכתבות שלכם', link: CONTACT_LINKS.readers, color: 'from-green-500 to-teal-500' },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}