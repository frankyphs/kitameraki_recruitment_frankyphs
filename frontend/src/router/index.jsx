import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Table from "../components/Table";
import AddForm from "../components/AddForm";
import Customize from "../components/Customize";

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
      {
        path: "/customize-form",
        element: <Customize />,
      },
    ],
  },
]);

export default router;
