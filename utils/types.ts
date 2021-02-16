export type TOptions = {
  height: number;
  width: number;
};

export type TParentWindow = {
  top?: {
    screenX: number;
    screenY: number;
    outerHeight: number;
    outerWidth: number;
  };
};

export type TResolveData = {
  code?: string;
};

export type TRejectError = {
  error: string;
};
