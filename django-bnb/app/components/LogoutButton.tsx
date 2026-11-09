'use client';

import { useRouter } from 'next/navigation';
import { resetAuthCookies } from '@/app/lib/actions';
import MenuLink from './navbar/MenuLink';

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const submitLogout = async () => {
        resetAuthCookies();
        router.push('/');
    };

    return (
        <MenuLink
            label="Logout"
            onClick={submitLogout}
        />
    );
};

export default LogoutButton;