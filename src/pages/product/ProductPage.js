// COMPONENTS
import ProductGallery from "./components/ProductGallery";
import ProductSection from "./components/ProductSection";

// REDUX
import { useSelector } from "react-redux";

export default function ProductPage() {
  const singleProduct = useSelector((state) => state.products.singleProduct);
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-row">
      <ProductGallery product={singleProduct} />
      <ProductSection product={singleProduct} />
    </div>
  );
}
