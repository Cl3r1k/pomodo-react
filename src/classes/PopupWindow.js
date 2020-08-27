import { combineToQuery, combineToParams } from 'services/utils';

export class PopupWindow {
  static open(...args) {
    const popup = new this(...args);

    popup.open();
    popup.poll();

    return popup;
  }

  constructor(id, url, parentWindow, options = {}) {
    this.id = id;
    this.url = url;
    this.parentWindow = parentWindow;
    this.options = options;
  }

  open() {
    const { url, id, parentWindow, options } = this;

    // TODO: Process situation when parentWindow is undefined; (hint: use || )
    const { top } = parentWindow;
    const { height, width } = options;

    const y = top.outerHeight / 2 + top.screenY - height / 2;
    const x = top.outerWidth / 2 + top.screenX - width / 2;

    const query = combineToQuery(options, ',');
    console.warn('query: ', query);

    // TODO: Improve window options part
    this.window = window.open(
      url,
      id,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${y}, left=${x}`
    );
    // this.window = window.open(url, id, combineToQuery(options, ','));
  }

  close() {
    console.info('called close()!');
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this.iid = window.setInterval(() => {
        try {
          // console.info('tick');
          const popup = this.window;

          // console.info('popup: ', popup, 'popup.closed', popup.closed);

          // console.info('before check --- !popup || popup.closed !== false');

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error('The popup was closed'));

            return undefined;
          }

          // console.info('popup.location: ', popup.location);
          // console.error('popup.location.href: ', popup.location.href);
          // console.info('popup.location.pathname: ', popup.location.pathname);
          // console.info(
          //   'popup.location.href === this.url: ',
          //   popup.location.href === this.url
          // );
          // console.info(`popup.location.pathname === "blank"`, popup.location.pathname === "blank");
          // console.error(
          //   `popup.location.href === this.url ||
          // popup.location.pathname === 'blank'`,
          //   popup.location.href === this.url ||
          //     popup.location.pathname === 'blank'
          // );

          // console.info(`before check --- popup.location.href === this.url ||
          // popup.location.pathname === "blank"`);

          if (
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return undefined;
          }

          // console.info(`AFTER check --- popup.location.href === this.url ||
          // popup.location.pathname === "blank"`);

          // console.info('popup.location:', popup.location);
          console.info('popup.location.href:', popup.location.href);
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
