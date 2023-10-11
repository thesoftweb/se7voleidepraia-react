import "./styles.css";

type ButtonProps = {
  label: string;
  color?: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({ label, color, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="button"
      style={{ backgroundColor: color }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
