import "./styles.css";

type ButtonProps = {
  label: string;
  color?: string;
  onClick: () => void;

};

export const Button = ({ label, color, onClick }: ButtonProps) => {
  return (
    <button
      className="button"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
