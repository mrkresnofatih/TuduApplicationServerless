import { AllState } from "./main";

export const authUsernameSelector = (state: AllState): string => state.auth.username;

export const authIsLoggedInSelector = (state: AllState): boolean => (state.auth.accessToken !== "");

export const authSelector = (state: AllState) => state.auth;