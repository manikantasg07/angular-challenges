import { provideHttpClient, withXhr, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {errorInterceptor} from "../app/utils/error.interceptor"


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr(), withInterceptors([errorInterceptor]))],
};
