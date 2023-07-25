import { createGlobalstate } from "state-pool";

export const threeDModelCurrent = createGlobalstate({
  state: {
    modelName: "",
    assembleValues: {},
    disassembleValues: {}
  }
});
