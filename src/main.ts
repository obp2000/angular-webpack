import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, LOCALE_ID } from '@angular/core';
import { AppModule } from './app/app.module';
if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{provide: LOCALE_ID, useValue: 'ru' }]
});

// platformBrowserDynamic().bootstrapModule(AppModule);

