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
    }, 1800);
    return () => clearTimeout(t);
  }, [show]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <TalaMark className="h-20 w-20 drop-shadow-lg" />
          </motion.div>
          <motion.p
            className="mt-4 font-display text-3xl font-bold tracking-tight"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Tala
          </motion.p>
          <motion.p
            className="mt-1 text-sm text-white/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Le marché de Kinshasa
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
