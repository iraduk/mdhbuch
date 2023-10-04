// import { Counter } from "./components/Counter";
// import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { UploadFile } from "./components/UploadFile";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/UploadFile',
    element: <UploadFile />
  }
];

export default AppRoutes;
