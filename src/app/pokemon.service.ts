import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Pokemon, PokemonCatturato, PokemonDetailResponse, PokemonSearchResponse } from './models/pokemon';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, private authService: AuthService) { }



  search(): Observable<PokemonSearchResponse> {
    return this.http.get<PokemonSearchResponse>(environment.POKEMON_API_BASE_URL + "cards?pageSize=30", {
      headers: new HttpHeaders({
        "X-Api-Key": environment.POKEMON_API_KEY
      })
    }
    )
      .pipe(catchError(this.handleError<PokemonSearchResponse>("search", undefined))
      );
  }

  getById(id: string): Observable<PokemonDetailResponse> {
    return this.http.get<PokemonDetailResponse>(environment.POKEMON_API_BASE_URL + "cards/" + id, {
      headers: new HttpHeaders({
        "X-Api-Key": environment.POKEMON_API_KEY
      })
    })
      .pipe(
        tap(r => console.log("arrivato nuovo dato dall'observable " + r.data.name)),
        catchError(this.handleError<PokemonDetailResponse>("getByid", undefined))
      );
  }

  getCatturati(): Observable<PokemonCatturato[]> {
    let loggeduser = this.authService.getLoggedUser();
    console.log(loggeduser)

    if (loggeduser) {
      return this.http.get<PokemonCatturato[]>(environment.USER_API_BASE_URL + "pokemons?userId=" + loggeduser.user.id, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + loggeduser.accessToken
        })
      })
    } else {
      return of([]);
    }
  }

  cattura(pokemon: Pokemon) {
    let loggeduser = this.authService.getLoggedUser();


    if (loggeduser) {
      let pokemonCatturato: PokemonCatturato = {
        //id: pokemon.id,
        userId: loggeduser.user.id,
        pokemon: pokemon
      };


      return this.http.post<PokemonCatturato>(environment.USER_API_BASE_URL + "pokemons", pokemonCatturato, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + loggeduser.accessToken
        })
      })
    } else {
      return null;
    }
  }

  libera(id: number) {
    let loggeduser = this.authService.getLoggedUser();
  
  
    if (loggeduser) {
      return this.http.delete<any>(environment.USER_API_BASE_URL + "pokemons/" + id, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + loggeduser.accessToken
        })
      })
    }

      return null;
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      console.log(operation, error);

      return of(result as T);
    }
  }
}