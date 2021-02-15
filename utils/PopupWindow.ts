import { combineToQuery, combineToParams } from '@utils/common';
import { TOptions, TParentWindow } from '@utils/types';

export class PopupWindow {
  id: string;
  url: string;
  parentWindow: TParentWindow | Window;
  options: TOptions;
  iid: number | null;
  promise: Promise<Record<string, string> | undefined> | null;
  window: Window | null;

  static open(
    ...args: [
      id: string,
      url: string,
      parentWindow: TParentWindow | Window,
      options: TOptions,
      ...rest: unknown[]
    ]
  ): PopupWindow {
    const popup = new this(...args);

    popup.open();
    popup.poll();

    return popup;
  }

  constructor(
    id = '',
    url = '',
    parentWindow: TParentWindow | Window = {},
    options: TOptions = { width: 600, height: 400 },
    ..._: unknown[]
  ) {
    this.id = id;
    this.url = url;
    this.parentWindow = parentWindow;
    this.options = options;

    this.iid = null;
    this.promise = null;
    this.window = null; // @TODO: Check first this line, if something with popup works incorrectly
  }

  open(): void {
    const { url, id, parentWindow, options } = this;
    const { top } = parentWindow;
    const { height, width } = options;

    const y = top ? top.outerHeight / 2 + top.screenY - height / 2 : 0;
    const x = top ? top.outerWidth / 2 + top.screenX - width / 2 : 0;

    this.window = window.open(
      url,
      id,
      combineToQuery({ ...options, top: y, left: x }, ',')
    );
  }

  close(): void {
    this.cancel();
    this.window?.close();
  }

  poll(): void {
    this.promise = new Promise((resolve, reject, ..._: unknown[]) => {
      this.iid = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error('The popup was closed'));

            return undefined;
          }

          if (
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

  cancel(): void {
    if (this.iid) {
      clearInterval(this.iid);
      this.iid = null;
    }
  }

  then(...args: [res: () => void, rej: () => void]): Promise<void> | void {
    return this.promise?.then(...args);
  }

  catch(...args: [res: () => void, rej: () => void]): Promise<void> | void {
    return this.promise?.then(...args);
  }
}
