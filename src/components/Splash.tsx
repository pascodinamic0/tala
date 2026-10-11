'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TalaMark } from './TalaLogo';
import { getMeta, setMeta } from '@/lib/db';

export function Splash() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const seen = await getMeta('splashSeen', false);
      if (!cancelled) {
        setShow(!seen);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(async () => {
      await setMeta('splashSeen', true);
      setShow(false);
    }, 2000);
    return () => clearTimeout(t);
  }, [show]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#fb7185_0%,#e11d48_55%,#9f1239_100%)] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.4 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -right-16 bottom-32 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl" />
          </div>
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <TalaMark className="h-24 w-24 drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]" />
            </motion.div>
          </motion.div>
          <motion.p
            className="mt-5 font-display text-4xl font-extrabold tracking-tight"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            Tala
          </motion.p>
          <motion.p
            className="mt-1.5 text-sm font-medium text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            Le marché de Kinshasa
          </motion.p>
          <motion.div
            className="mt-10 h-1 w-32 overflow-hidden rounded-full bg-white/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="tala-shimmer-bar h-full w-1/2 rounded-full bg-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
