import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootPage from "./pages/root/RootPage";
import Home from "./pages/home/Home";
import Store from "./pages/store/Store";

import ProductsList from "./pages/store/components/ProductsList";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootPage />}>
        <Route index element={<Home />} />
        <Route path="store" element={<Store />}>
          <Route path=":category" element={<ProductsList />} />
        </Route>
      </Route>,
    ),
  );

  return (
    <body className="bg-gray-100">
      <div className="font-roboto m-auto flex w-full max-w-[1600px]">
        <RouterProvider router={router} />
      </div>
    </body>
  );
}

export default App;
