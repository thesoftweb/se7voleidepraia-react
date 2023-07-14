import "./styles.css";

type ButtonProps = {
  label: string;
  color?: string;
  onClick: () => void;
};

export const Button = ({ label, color, onClick }: ButtonProps) => {
  return (
    <div
      className="button"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
