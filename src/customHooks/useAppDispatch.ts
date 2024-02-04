import { useDispatch } from "react-redux";
import { AppDispatch } from "../storeConfig/store";

export const useAppDispatch : () => AppDispatch = useDispatch;