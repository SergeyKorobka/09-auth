import type { Note } from '@/types/note';
import { api } from './api';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

export async function fetchNotes({
  search = '',
  page = 1,
  tag,
}: fetchNotesParams) {
  const cookieStore = await cookies();

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function fetchNoteById(noteId: string) {
  const cookieStore = await cookies();

  const { data } = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
