type PlanProps = {
  title: string;
  amount: string;
  active: boolean;
  onClick: () => void;
};

import "./styles.css";

export const PlanItem = ({ title, amount, active, onClick }: PlanProps) => {
  return (
    <div
      className="plan"
      onClick={onClick}
      style={{active ? "course-item-selected" : "course-item"}}
    >
      <div className="plan-title">{title}</div>
      <div className="plan-amount">{amount}</div>
    </div>
  );
};
