import { motion } from 'framer-motion';
import { TrendingUp, Volume2, VolumeX } from 'lucide-react';
import { getTimezoneShort } from '../data/timezone';
import { useClock } from '../hooks/useClock';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function Header({ soundEnabled, onToggleSound }: HeaderProps) {
  const now = useClock();
  const tzShort = getTimezoneShort(now);

  return (
    <motion.header
      className="header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-left">
        <div className="header-logo">
          <TrendingUp size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="header-title">Trading Alerts</h1>
          <p className="header-subtitle">Sessões de Mercado em Tempo Real</p>
        </div>
      </div>
      <div className="header-right">
        <button
          className="sound-toggle"
          onClick={onToggleSound}
          title={soundEnabled ? 'Desativar sons' : 'Ativar sons'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span>{soundEnabled ? 'Som ON' : 'Som OFF'}</span>
        </button>
        <div className="timezone-badge">
          <span className="timezone-dot" />
          {tzShort}
        </div>
      </div>
    </motion.header>
  );
}
