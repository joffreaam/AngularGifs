import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioURL:   string = 'http://api.giphy.com/v1/gifs'
  private apiKey:        string = 'I0dBk0X5J7alZxalsZWaGUnHFbmVqiz6';
  private _historial:    string[] = [];

  public resultados: Gif[] = [];

  get  historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient){

    //if( localStorage.getItem('historial') ){
      //this._historial =  JSON.parse(localStorage.getItem('historial')!);
    //}

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('UltimaBusqueda')!) || [];


  }

  buscarGifs( query: string = '') { 

    // recorta el arrgelo
    query = query.trim().toLowerCase();
    if( !this._historial.includes(query)){

      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
      
    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params: params })
      .subscribe( ( resp ) => {
          console.log(resp.data);
          this.resultados = resp.data;
          localStorage.setItem('UltimaBusqueda', JSON.stringify(this.resultados));    
      });

    // asi seria con javascript PURO
    //const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=I0dBk0X5J7alZxalsZWaGUnHFbmVqiz6&q=dragon ball z&limit=20')
    //const data = await resp.json();
    //console.log(data);


  }

  eliminarItemHistorial( item: string){
    var index = this._historial.indexOf(item);
    this._historial.splice(index, 1);
  
  }

}



//I0dBk0X5J7alZxalsZWaGUnHFbmVqiz6
