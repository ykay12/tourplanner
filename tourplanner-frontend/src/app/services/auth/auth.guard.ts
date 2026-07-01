import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../../states/app-state.service';

export const authGuard: CanActivateFn = () => {
  const appState = inject(AppStateService);
  const router = inject(Router);

  // Prüft das Signal (wird beim App-Start aus localStorage befüllt)
  // sowie direkt localStorage als Fallback für den Fall, dass der
  // Guard vor dem Konstruktor des AppStateService läuft.
  const tokenExists = typeof localStorage !== 'undefined' && !!localStorage.getItem('token');

  if (appState.loggedIn() || tokenExists) {
    return true;
  }

  return router.createUrlTree(['/login']);
};