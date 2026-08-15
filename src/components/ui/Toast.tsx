import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
            error: <XCircle className="w-5 h-5 text-red-400 shrink-0" />,
            info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
          };

          const borderColors = {
            success: 'border-emerald-500/30 bg-[#0E1B16]/90 shadow-[0_4px_20px_rgba(16,185,129,0.15)]',
            warning: 'border-amber-500/30 bg-[#1C170E]/90 shadow-[0_4px_20px_rgba(245,158,11,0.15)]',
            error: 'border-red-500/30 bg-[#1C0E0E]/90 shadow-[0_4px_20px_rgba(239,68,68,0.15)]',
            info: 'border-blue-500/30 bg-[#0E1522]/90 shadow-[0_4px_20px_rgba(59,130,246,0.15)]'
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl flex items-start gap-3 text-sm text-text-primary ${borderColors[toast.type]}`}
            >
              {icons[toast.type]}
              <div className="flex-1">
                <div className="font-semibold text-text-primary">{toast.title}</div>
                {toast.message && (
                  <div className="text-xs text-text-secondary mt-0.5 leading-relaxed">{toast.message}</div>
                )}
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-text-muted hover:text-text-primary transition-colors p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
