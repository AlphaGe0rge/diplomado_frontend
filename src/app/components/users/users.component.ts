import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataGridComponent } from 'src/app/widgets/data-grid/data-grid.component';
import { ModalComponent } from 'src/app/widgets/modal/modal.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
 @ViewChild('dataGrid', { static: false }) dataGrid: DataGridComponent;
 @ViewChild('userModal') userModal!: ModalComponent;

  filters = {
    nombre: '',
    usuario: '',
    correo: '',
    phoneNumber: '',
    address: null,
    status: null
  };

  isOpenModal = false;

  userId = "";
  userModalTitle = "";

  originalData = [
  ];

  filteredData = [...this.originalData];

  periods: any[] = [];
  grades: any[] = []

  gridColumns: any[] = [];

  constructor(private apiService: ApiService,
              private changeDetectorRef:ChangeDetectorRef
  ) { 
    this.dataGrid = new DataGridComponent();
  }

  ngOnInit(): void {
    this.setupGridColumns();
  }

  setupGridColumns() {
    
    this.gridColumns = [
      { name: 'Nombre', field: 'name', show: true },
      { name: 'Usuario', field: 'userName', show: true },
      { name: 'Celular', field: 'phoneNumber', show: true },
      { name: 'Correo', field: 'email', show: true },
      { name: 'Dirección', field: 'address', show: true }
    ]

  }

  getDataGrid(){

    const {
      nombre,
      usuario,
      correo,
      phoneNumber,
      address
    } = this.filters;

    let where: any = {};

    if (usuario) where.userName = usuario;
    if (correo) where.email = correo;
    if (phoneNumber) where.phone = phoneNumber;
    if (nombre) where.name = nombre;
    if (address) where.address = address;

    this.apiService.get('users/getUsers', {where}).subscribe(data => {
      this.filteredData = data;
      this.changeDetectorRef.detectChanges();
      this.dataGrid.paginateData();
    },
    error => {
      console.log(error);
    });

    
  }

}