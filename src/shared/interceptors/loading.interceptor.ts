import type { HttpInterceptorFn } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { finalize } from "rxjs/operators";

export const loadingSubject = new BehaviorSubject<boolean>(false);
export const loading$ = loadingSubject.asObservable();

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
	loadingSubject.next(true);

	return next(req).pipe(
		finalize(() => {
			loadingSubject.next(false);
		}),
	);
};
