import { createGlobalstate } from "state-pool";

export const skipToStateFunction = createGlobalstate({
  state: () => () => {
    return null;
  }
});

export const advanceSlideStateFunction = createGlobalstate({
  state: () => () => {
    return null;
  }
});

export const regressSlideStateFunction = createGlobalstate({
  state: () => () => {
    return null;
  }
});
