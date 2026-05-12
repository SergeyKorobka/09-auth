import type { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getServerMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'View and edit your profile information, including username, email, and avatar.',
  openGraph: {
    title: 'Profile - NoteHub',
    type: 'website',
    description:
      'View and edit your profile information, including username, email, and avatar.',
    siteName: 'NoteHub',
    url: 'https://08-zustand-tau-sage.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview image',
      },
    ],
  },
};

export default async function Profile() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            loading="eager"
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
