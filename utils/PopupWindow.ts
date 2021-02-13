/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { combineToQuery, combineToParams } from '@utils/common';

// type TWindow = {
//   top: {
//     outerHeight: number;
//     outerWidth: number;
//     screenX: number;
//     screenY: number;
//   };
// };

export class PopupWindow {
  static open(...args: any[]) {
    // @ts-ignore
    const popup = new this(...args);

    popup.open();
    popup.poll();

    return popup;
  }

  constructor(
    id = '',
    url: any,
    parentWindow = {},
    options = { width: 600, height: 400 }
  ) {
    // @ts-ignore
    this.id = id;
    // @ts-ignore
    this.url = url;
    // @ts-ignore
    this.parentWindow = parentWindow;
    // @ts-ignore
    this.options = options;
  }

  open() {
    // @ts-ignore
    const { url, id, parentWindow, options } = this;
    const { top } = parentWindow;
    const { height, width } = options;

    const y = top ? top.outerHeight / 2 + top.screenY - height / 2 : 0;
    const x = top ? top.outerWidth / 2 + top.screenX - width / 2 : 0;

    // @ts-ignore
    this.window = window.open(
      url,
      id,
      combineToQuery({ ...options, top: y, left: x }, ',')
    );
  }

  close() {
    this.cancel();
    // @ts-ignore
    this.window.close();
  }

  poll() {
    // @ts-ignore
    this.promise = new Promise((resolve, reject) => {
      // @ts-ignore
      this.iid = window.setInterval(() => {
        try {
          // @ts-ignore
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error('The popup was closed'));

            return undefined;
          }

          if (
            // @ts-ignore
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return undefined;
          }

          const params = combineToParams(
            popup.location.search.replace(/^\?/, '')
          );

          resolve(params);

          this.close();
        } catch (err) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame
           */
        }

        return undefined;
      }, 500);
    });
  }

  cancel() {
    // @ts-ignore
    if (this.iid) {
      // @ts-ignore
      clearInterval(this.iid);
      // @ts-ignore
      this.iid = null;
    }
  }

  then(...args: any[]) {
    // @ts-ignore
    return this.promise.then(...args);
  }

  catch(...args: any[]) {
    // @ts-ignore
    return this.promise.then(...args);
  }
}
