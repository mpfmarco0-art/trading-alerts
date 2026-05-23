export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <p>📊 Todos os horários estão em hora de Portugal (WET/WEST)</p>
        <p>🔔 Ativa os alertas sonoros para ser notificado quando as sessões abrem e fecham</p>
      </div>
      <div className="footer-copyright">
        Desenvolvido para traders profissionais • Trading Alerts © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
