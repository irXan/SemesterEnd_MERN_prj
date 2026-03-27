const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="empty-state">
      <p className="empty-title">{title}</p>
      <p className="empty-subtitle">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
