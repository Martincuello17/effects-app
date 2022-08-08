import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError, of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as usuariosActions from '../actions/usuarios.actions';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      mergeMap(() => this.usuarioService.getUser()
      .pipe(
        map( usuarios => usuariosActions.cargarUsuariosSuccess({usuarios}) ),
        catchError( (error) => of(usuariosActions.cargarUsuariosError({ payload: error })) )
      ))
    )
  );
}
