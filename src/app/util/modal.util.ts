import {NzModalRef, NzModalService} from 'ng-zorro-antd';
import {HttpErrorResponse} from '@angular/common/http';
import {removeUser} from './app.util';

export function createConfirm(modalService: NzModalService, tplTitle: string, tplContent: any, okCallback?: any): NzModalRef {
  let msg = tplContent;
  if (tplContent instanceof HttpErrorResponse) {
    if (tplContent.error instanceof ProgressEvent) {
      msg = tplContent.message;
    } else {
      msg = tplContent.error;
    }
  }
  if (tplContent.error && tplContent.error.message) {
    msg = tplContent.error.message;
    if (tplContent.error.code === 4008) {
      removeUser();
    }
  }
  if ('error' === tplTitle) {
    return modalService.error({
      nzTitle: tplTitle,
      nzContent: msg,
      nzOnOk: okCallback
    });
  }
  return modalService.confirm({
    nzTitle: tplTitle,
    nzContent: msg,
    nzOnOk: okCallback
  });
}

export function createSuccessConfirm(modalService: NzModalService, tplContent: any, okCallback?: any) {
  createConfirm(modalService, 'Success', tplContent, okCallback);
}

export function createErrorConfirm(modalService: NzModalService, tplContent: any, okCallback?: any) {
  createConfirm(modalService, 'Error', tplContent, okCallback);
}
