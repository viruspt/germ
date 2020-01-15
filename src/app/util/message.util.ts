import {NzMessageService} from 'ng-zorro-antd';
import {HttpErrorResponse} from '@angular/common/http';
import {removeUser} from './app.util';

export function createMessage(messageService: NzMessageService, type: string, message: string, duration = 3000): void {
  messageService.create(type, message, {nzDuration: duration});
}

export function createSuccessMessage(messageService: NzMessageService, message: string) {
  createMessage(messageService, 'success', message);
}

export function createErrorMessage(messageService: NzMessageService, message: any) {
  let msg = message;
  if (message instanceof HttpErrorResponse) {
    if (message.error instanceof ProgressEvent) {
      msg = message.message;
    } else {
      msg = message.error;
    }
  }
  if (message.error && message.error.message) {
    msg = message.error.message;
    if (message.error.code === 4008) {
      removeUser();
    }
  }
  createMessage(messageService, 'error', msg, 10000);
}

export function createWarningMessage(messageService: NzMessageService, message: string) {
  createMessage(messageService, 'warning', message);
}

