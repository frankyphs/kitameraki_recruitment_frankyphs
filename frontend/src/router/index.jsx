import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Table from "../components/Table";
import AddForm from "../components/AddForm";

const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
    children: [
      {
        path: "/",
        element: <Table />,
      },
      {
        path: "/add-task",
        element: <AddForm />,
      },
    ],
  },
]);

export default router;
