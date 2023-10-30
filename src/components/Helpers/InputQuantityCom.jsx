import { useState } from "react";
export default function InputQuantityCom({ productId, qyt }) {
  const [quantity, setQuantity] = useState(qyt);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="w-[120px] h-[40px] rounded px-[26px] flex items-center border border-qborder">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-lg font-medium transition duration-300 ease-in-out transform scale-100 text-qgray hover:scale-110 hover:text-qpurple"
        >
          -
        </button>
        <span className="text-qblack">{quantity}</span>
        <button
          onClick={increment}
          type="button"
          className="text-lg font-medium transition duration-300 ease-in-out transform scale-100 text-qgray hover:scale-110 hover:text-qpurple"
        >
          +
        </button>
      </div>
    </div>
  );
}
