import LockIcon from '@mui/icons-material/Lock';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Auth]: {
    component: asyncComponentLoader(() => import('@/pages/AuthScreen')),
    path: '/',
    title: 'Authentication',
    icon: LockIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
