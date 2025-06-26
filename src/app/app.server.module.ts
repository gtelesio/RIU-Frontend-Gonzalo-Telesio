import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { AppComponent } from "./app";
import { AppModule } from "./app.module";

@NgModule({
	imports: [AppModule, ServerModule, AppComponent],
	bootstrap: [AppComponent],
})
export class AppServerModule {}
