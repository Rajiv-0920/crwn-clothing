import { useContext } from "react";
import Button from "../button/button.component";
import "./product-card.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const handleClick = (productToAdd) => {
    addItemToCart(productToAdd);
  };

  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={`${product.name}`} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>
      <Button onClick={() => handleClick(product)} buttonType="inverted">
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
