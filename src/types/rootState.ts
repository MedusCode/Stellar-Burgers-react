import { store } from "../services/store";

type RootState = ReturnType<typeof store.getState>;

export default RootState;