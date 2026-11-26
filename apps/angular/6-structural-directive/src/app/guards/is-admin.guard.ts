import { CanMatchFn, PartialMatchRouteSnapshot, Route, UrlSegment } from "@angular/router";
import { Role } from "../user.model";
import { inject } from "@angular/core";
import { UserStore } from "../user.store";
import { map, Observable } from "rxjs";


export const isAdminGuard = (): CanMatchFn => {
  return (): Observable<boolean> => {
    return inject(UserStore).user$.pipe(
      map((user) => user?.isAdmin || false)
    );
  };
};