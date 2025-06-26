import { enableProdMode } from "@angular/core";
import { AppServerModule } from "./app/app.server.module";
import { environment } from "./environments/environment";

if (environment.production) {
	enableProdMode();
}

export { AppServerModule };
