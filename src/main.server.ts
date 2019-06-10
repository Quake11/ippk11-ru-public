import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

declare var global: any;
declare var require: any;
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
