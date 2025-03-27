import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Trigger the effect whenever the location changes (i.e., when the route changes)

  return null;
};

export default ScrollToTop;
