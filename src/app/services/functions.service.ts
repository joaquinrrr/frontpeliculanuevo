import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { Observable, Subject } from 'rxjs';
import { Function } from '../models/Functions';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  private url = `${base_url}/functions`
  private urlinsert = `${base_url}/functions/Registro`
  private listaCambio = new Subject<Function[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Function[]>(this.url)
  }
  insert(r: Function): Observable<Function> {
    return this.http.post<Function>(this.urlinsert, r);
  }
  setList(listaNueva: Function[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Function>(`${this.url}/${id}`);
  }
  update(r: Function, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
