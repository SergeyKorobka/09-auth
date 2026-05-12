'use client';

import { useRouter } from 'next/navigation';
import css from './EditProfile.module.css';
import Image from 'next/image';
import { updateMe } from '@/lib/api/clientApi';
import { useState } from 'react';
import type { User } from '@/types/user';
import type { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfile() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  async function handleSave(formData: FormData) {
    const username = formData.get('username') as string;

    try {
      const res = await updateMe({ username });

      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setErrorMsg('Invalid username');
      }
    } catch (error) {
      setErrorMsg(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            loading="eager"
          />
        )}

        <form className={css.profileInfo} action={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>

          {errorMsg !== '' && <p className={css.error}>{errorMsg}</p>}
        </form>
      </div>
    </main>
  );
}
