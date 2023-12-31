import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootPage from "./pages/root/RootPage";
import Home from "./pages/home/Home";
import Store from "./pages/store/Store";
import ProductPage from "./pages/product/ProductPage";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector((state) => state.cart.cart);
  const totalProductsAmount = useSelector(
    (state) => state.cart.totalProductsAmount,
  );
  const totalProductsPrice = useSelector(
    (state) => state.cart.totalProductsPrice,
  );
  console.log("cart", cart);
  console.log("totalProductsAmount", totalProductsAmount);
  console.log("totalProductsPrice", totalProductsPrice);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootPage />}>
        <Route index element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="/store/:id" element={<ProductPage />} />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
