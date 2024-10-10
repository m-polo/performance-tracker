import { createContext } from "react";
import { ApiClientType } from "../App";

export const AuthContext = createContext<string>("");

export const ApiClientContext = createContext<ApiClientType>({} as ApiClientType);