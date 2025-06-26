import { provideHttpClient, withInterceptors } from "@angular/common/http";
import type { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { LoadingInterceptor } from "@/shared/interceptors/loading.interceptor";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([LoadingInterceptor])),
		provideAnimations(),
		provideClientHydration(),
	],
};
