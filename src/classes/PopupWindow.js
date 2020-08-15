import { combineToQuery, combineToParams } from 'services/utils';

export class PopupWindow {
  static open(...args) {
    const popup = new this(...args);

    popup.open();
    popup.poll();

    return popup;
  }

  constructor(id, url, options = {}) {
    this.id = id;
    this.url = url;
    this.options = options;
  }

  open() {
    const { url, id, options } = this;

    this.window = window.open(url, id, combineToQuery(options, ','));
  }

  close() {
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this.iid = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || this.closed) {
            this.close();

            reject(new Error('The popup was closed'));

            console.error('Do we need this return???');
            return undefined;
          }

          if (
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return undefined;
          }

          console.info('popup.location:', popup.location);
          console.info('popup.location.search:', popup.location.search);

          const params = combineToParams(
            popup.location.search.replace(/^\?/, '')
          );

          console.info('params: ', params);

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
