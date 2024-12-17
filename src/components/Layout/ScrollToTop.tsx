import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

//scroll to the top of the page when the route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
