import { ChangeEvent, useState } from "react";

import "./styles.css";

type CheckboxProps = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, children }) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkbox-style"></span>
      {children}
    </label>
  );
};

export default Checkbox;
