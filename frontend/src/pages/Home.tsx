import React from "react";
import Button from "../components/Button/Button";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button text="Click Me" onClick={() => alert("Hello from Home!")} />
    </div>
  );
};

export default Home;
