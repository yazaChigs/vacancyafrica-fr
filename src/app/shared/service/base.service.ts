
import { Observable } from 'rxjs';

export interface BaseService {
save(t: any, url: string): Observable<any>;
getItem(url: string): Observable<any>;
getAll(url: string): Observable<any[]>;
delete(url: string): Observable<any>;
}
