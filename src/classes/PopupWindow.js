import { combineToQuery, combineToParams } from 'services/utils';

export class PopupWindow {
  static open(...args) {
    const popup = new this(...args);

    popup.open();
    popup.poll();

    return popup;
  }

  constructor(id, url, parentWindow = {}, options = {}) {
    this.id = id;
    this.url = url;
    this.parentWindow = parentWindow;
    this.options = options;
  }

  open() {
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

  close() {
    // console.info('called close()!');
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this.iid = window.setInterval(() => {
        try {
          const popup = this.window;

          // console.info('popup: ', popup, 'popup.closed', popup.closed);

          // console.info('before check --- !popup || popup.closed !== false');

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

          // console.info('popup.location.href:', popup.location.href);
          console.info('popup.location.search:', popup.location.search);

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
    if (this.iid) {
      clearInterval(this.iid);
      this.iid = null;
    }
  }

  then(...args) {
    return this.promise.then(...args);
  }

  catch(...args) {
    return this.promise.then(...args);
  }
}
