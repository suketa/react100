import { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <div className="count">{count}</div>
      <div className='button__container'>
        <button onClick={() => setCount(count => count + 1)}>+</button>
        <button onClick={() => setCount(count => count - 1)}>-</button>
      </div>
    </div>
  );
};

export default Counter;
