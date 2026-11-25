import "./styles.css";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="header">
      <h3>{title ?? ''}</h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
