import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../../states/app-state.service';

export const authGuard: CanActivateFn = () => {
  const appState = inject(AppStateService);
  const router = inject(Router);

  if (appState.loggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
