import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../storeConfig/store";

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;