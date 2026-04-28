import { atom } from "jotai";

export const loginAtom = atom(false);
export const userInfoAtom = atom(null);
export const conversationIdAtom = atom(null);
export const selectedUserAtom = atom(null);
export const onlineUsersAtom = atom([]);