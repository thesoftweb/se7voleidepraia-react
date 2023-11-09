import React from "react";

import "./styles.css";

type PlanProps = {
  description?: string | null;
  title?: string;
  amount?: string;
  hour?: string[] | undefined;
  isSelected?: boolean;
  onSelect?: () => void;

};

export const PlanItem = ({
  description,
  title,
  amount,
  hour,
  isSelected,
  onSelect,
}: PlanProps) => {
  const handleClique = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      className={`plan ${isSelected ? "plan-selected" : ""}`}
      onClick={handleClique}
    >
      <div className="plan-title">{title}</div>
      {description && <p className="plan-description">{description}</p> }
      
      {Array.isArray(hour) && (
        <div className="plan-hour">
          {hour.map((schedule: string, index: number) => (
            <React.Fragment key={index}>
              {schedule}
              <br />
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="plan-amount">{amount}</div>
    </div>


  );
};
