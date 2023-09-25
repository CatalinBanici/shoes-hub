import ProductGallery from "./ProductGallery";
import ProductSection from "./ProductSection";

export default function ProductPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-row">
      <ProductGallery />
      <ProductSection />
    </div>
  );
}
