import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; 

// esta es otr forma para no importar ngForms
// ventaja que se puede acceder a todo el elemento HTML
// pero para este ejemplo es mas tedioso

  constructor( private gifsService: GifsService ){
    
  }

buscar() {
  const valor = this.txtBuscar.nativeElement.value;
  if( valor ){
    this.gifsService.buscarGifs(valor);
  }

  this.txtBuscar.nativeElement.value = '';
  


}

}
