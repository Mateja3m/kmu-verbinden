import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Presidency from "@/pages/Presidency";
import ContactPage from "@/pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/presidency",
    element: <Presidency />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
]);

export default router;
