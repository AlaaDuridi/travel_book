export const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST as string;

export enum USER_TYPE {
  ADMIN = 'Admin',
  USER = 'User',
}

export const INITIAL_PAGE_NUMBER = 1;
export const INITIAL_PAGE_SIZE = 10;
export const PAGE_SIZES = [5, 10, 20, 50, 100];
export const DEBOUNCE_SEARCH_DELAY: number = 500;

export enum ACTION_TYPES {
  ADD = 'add',
  EDIT = 'edit',
}

export enum STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
}
