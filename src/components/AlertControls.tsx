import { motion } from 'framer-motion';
import { Bell, BellOff } from 'lucide-react';

interface AlertControlsProps {
  onTestOpen: () => void;
  onTestClose: () => void;
}

export function AlertControls({ onTestOpen, onTestClose }: AlertControlsProps) {
  return (
    <motion.div
      className="alert-controls"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <button className="alert-btn alert-btn-open" onClick={onTestOpen}>
        <Bell size={16} />
        Teste Abertura
      </button>
      <button className="alert-btn alert-btn-close" onClick={onTestClose}>
        <BellOff size={16} />
        Teste Fecho
      </button>
    </motion.div>
  );
}
