import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private notificationService: NotificationsService,
  ) { }

  // Ejemplo de un método GET
  get(url: any, body: any = {}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${url}`, body).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getUsuario(id:any, url: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}/${id}`);
  }

  // Ejemplo de un método POST
  post(url: any, item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${url}`, item);
  }

  // Ejemplo de un método PUT
  put(url: any, id: any, items: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${url}/${id}`, items);
  }

  // Ejemplo de un método DELETE
  delete(url: any, ids: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${url}`,{
      body:{
        id: ids
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    
    let errorMessage = 'Ocurrió un error desconocido';
  
    if (error.error instanceof ErrorEvent) {
      // Errores del cliente (errores de red o del navegador)
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Errores que provienen del servidor
      const backendError = error.error;
      errorMessage = backendError.message || `Error ${error.status}: Error en el servidor`;
    }

    this.notificationService.error(errorMessage)
  
    // Muestra el error en la consola para debugging
    console.error('Error capturado:', errorMessage);
  
    // Retorna el error como Observable para que el componente lo maneje
    return throwError(() => new Error(errorMessage));
  }


}
