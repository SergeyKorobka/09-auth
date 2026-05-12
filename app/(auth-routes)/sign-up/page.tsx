'use client';

import { register, type UserPayload } from '@/lib/api/clientApi';
import css from './SignUp.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUp() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  async function handleRegistration(formData: FormData) {
    setErrorMsg('');
    const data = Object.fromEntries(formData) as unknown as UserPayload;

    try {
      const res = await register(data);

      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setErrorMsg('Invalid email or password');
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
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleRegistration}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {errorMsg !== '' && <p className={css.error}>{errorMsg}</p>}
      </form>
    </main>
  );
}
