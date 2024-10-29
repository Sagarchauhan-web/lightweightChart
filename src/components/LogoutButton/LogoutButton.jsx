import { logout } from '@/services/Auth/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

function LogoutButton() {
  const navigate = useNavigate();

  const logOut = async () => {
    await logout();

    navigate('/');
  };
  return (
    <Button variant='outline' size='sm' className='w-full' onClick={logOut}>
      Logout
    </Button>
  );
}

export default LogoutButton;
