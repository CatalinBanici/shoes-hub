// COMPONENTS
import SideBar from "./components/SideBar";
import ProductsList from "./components/ProductsList";

export default function Store() {
  return (
    <div className=" relative m-10 mx-auto flex max-w-[1600px] flex-row">
      <SideBar />
      <ProductsList />
    </div>
  );
}
