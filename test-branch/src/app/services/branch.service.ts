import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RequestResult } from '../models/service/requestResult';
import { Branch } from '../models/branch/branch.model';
import { catchError, map, Observable, retry } from 'rxjs';
import { ResolveRequestResultService } from '../utils/resolve-requestResult';

@Injectable()
export class BranchService {

    constructor(private http: HttpClient,
        private readonly resolveReqSvc: ResolveRequestResultService) {}

    GetBranches(): Observable<Branch[]> {
        return this.http.get<RequestResult<Branch[]>>(`https://localhost:7145/Api/Branch/GetBranches`).pipe(
          retry(0),
          catchError(this.resolveReqSvc.handleError),
          map((vars: RequestResult<Branch[] | []>) =>{
            const result = this.resolveReqSvc.resolve<Branch[]>(vars);
            return result || [];
          })
        );
    }

    DeleteBranch(IDBranch: string): Observable<RequestResult<any>> {
        return this.http
        .post<RequestResult<any>>(`https://localhost:7145/Api/Branch/DeleteBranch?IDBranch=${IDBranch}`, null)
        .pipe(
            retry(0),
            catchError(this.resolveReqSvc.handleError)
            // map((vars: RequestResult<Session>) =>
            //   this.resolveReqSvc.resolve<Session>(vars)
            // )
        );
    }
};