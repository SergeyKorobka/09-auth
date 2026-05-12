import type { Note, NoteTag } from '@/types/note';
import { api } from './api';
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

interface NotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function fetchNotes({
  search = '',
  page = 1,
  tag,
}: fetchNotesParams) {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return data;
}

export async function fetchNoteById(noteId: string) {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function createNote(payload: NotePayload) {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(noteId: Note['id']) {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
}

export interface UserPayload {
  email: string;
  password: string;
}

export async function register(payload: UserPayload) {
  const { data } = await api.post<User>('/auth/register', payload);
  return data;
}

export async function login(payload: UserPayload) {
  const { data } = await api.post<User>('/auth/login', payload);
  return data;
}

export async function logout() {
  await api.post<User>('/auth/logout');
}

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const { data } = await api.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: Partial<User>) => {
  const { data } = await api.patch<User>('/users/me', payload);
  return data;
};
