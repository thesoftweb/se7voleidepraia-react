import { ChangeEvent, useState } from "react";

import "./styles.css";

type CheckboxProps = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  children,
  ...props
}) => {
  return (
    <div className="checkbox-wrapper">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <span className="checkbox-style"></span>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
