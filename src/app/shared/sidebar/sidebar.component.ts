import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { Gif } from '../../gifs/interface/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent {
  gifs: string[] = [];
  
  get historial(): string[] {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { 
  }

  buscarGifts( gif: string ){
    this.gifsService.buscarGifs(gif);
  }


}

