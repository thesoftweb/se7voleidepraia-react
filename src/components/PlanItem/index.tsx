import "./styles.css";

type PlanProps = {
  title: string;
  amount: string;
  isSelected?: boolean;
  onSelect: () => void;
};

export const PlanItem = ({
  title,
  amount,
  isSelected,
  onSelect,
}: PlanProps) => {
  const handleClique = () => {
    onSelect();
  };

  return (
    <div
      className={`plan ${isSelected ? "plan-selected" : ""}`}
      onClick={handleClique}
    >
      <div className="plan-title">{title}</div>
      <div className="plan-amount">{amount}</div>
    </div>
  );
};
