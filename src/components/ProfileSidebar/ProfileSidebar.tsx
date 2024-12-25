"use client"
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'My Profile', href: '/my-profile' },
  { label: 'Settings', href: '/settings' },
  { label: 'Plan', href: '/plan' },
  { label: 'Team', href: '/team' },
  { label: 'Notifications', href: '/notifications' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'API', href: '/api' },
];

const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-60 flex flex-col space-y-1 bg-white">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href as Route}
          className={`px-4 py-2 rounded-lg text-base ${
            pathname === item.href
              ? 'bg-neutral-100 font-semibold'
              : 'text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default ProfileSidebar;
