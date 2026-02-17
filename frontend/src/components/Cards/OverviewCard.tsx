import React, { type JSX } from "react";
import Button from "../Button/Button";

interface OverviewProps {
  title: string;
  count: number;
}

const OverviewCard = (props: OverviewProps): JSX.Element => {
  return (
    <div style={styles.OverviewCard}>
      <h3>{props.title}</h3>
      <p>{props.count}</p>
      <Button text="check for appointments" />
    </div>
  );
};

const styles = {
  OverviewCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    width: "250px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "10px",
  },
};

export default OverviewCard;
