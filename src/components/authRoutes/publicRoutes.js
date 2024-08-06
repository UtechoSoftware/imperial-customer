import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useSelector } from 'react-redux';

function PublicRoutes() {
  const roles = useSelector(state => state?.adminData?.adminData?.user?.roles);
  const token = useAuth();
  if (roles && roles.length > 0) {
    for (const role of roles) {
      switch (role) {
        case 'question':
          return <Navigate to='/question' />;
        case 'exam':
          return <Navigate to='/exam' />;
        case 'blog':
          return <Navigate to='/blog' />;
        case 'faq':
          return <Navigate to='/faqs' />;
        case 'help':
          return <Navigate to='/help' />;
        default:
          break;
      }
    }
  }

  if (token) {
    return <Navigate to='/dashboard' />;
  }
  return <Outlet />;
}

export default PublicRoutes;
