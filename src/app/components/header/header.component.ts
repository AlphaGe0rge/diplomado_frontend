import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Información del usuario
  userPhoto = '../../../assets/perfil.avif';
  userName = 'guest';
  
  constructor(private router: Router,
              private authService: AuthService
  ) { }

  ngOnInit(): void {

    let user: any = JSON.parse(localStorage.getItem('user') || '')
    this.userName = user.name;
  }

  // Función para ver un mensaje específico
  openMessage(messageId: number) {
    // Aquí puedes redirigir a la vista del mensaje
    this.router.navigate(['/mensajes', messageId]);
  }

  // Función para ir a la bandeja de entrada
  goToInbox() {
    this.router.navigate(['/mensajes']);
  }

  // Función para cerrar sesión
  logout() {
    this.authService.clearToken()
    this.router.navigate(['/login']);
  }

  toggleDropdown(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const dropdown = target.nextElementSibling as HTMLElement;
    dropdown.classList.toggle('show');
  }
}
