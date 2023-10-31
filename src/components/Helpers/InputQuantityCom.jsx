import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/Cart";
export default function InputQuantityCom({ productId, qyt }) {
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(addItemToCart({ id: productId, quantity: 1 }));
  };

  const decrement = () => {
    if (qyt > 1) {
      dispatch(removeItemFromCart({ id: productId }));
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
        <span className="text-qblack">{qyt}</span>
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
