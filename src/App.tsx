import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Presidency from "@/pages/Presidency";
import ContactPage from "@/pages/Contact";
import Membership from "@/pages/Membership";
import Partners from "@/pages/Partners";
import Experts from "@/pages/Experts";

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
  {
    path: "/membership",
    element: <Membership />,
  },
  {
    path: "/partners",
    element: <Partners />,
  },
  {
    path: "/experts",
    element: <Experts />,
  },
]);

export default router;