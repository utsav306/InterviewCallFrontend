'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/movie-store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}