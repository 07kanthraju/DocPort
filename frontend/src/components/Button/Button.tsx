import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "primary" }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
