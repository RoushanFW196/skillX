import { atom } from "jotai";

export interface SkillReference {
	_id: string;
	name: string;
}

export interface UserProfile {
	_id: string;
	name?: string;
	email?: string;
	profilePic?: string;
	bio?: string;
	yearsOfExperience?: number;
	credits?: number;
	ratingAvg?: number;
	ratingCount?: number;
	skillsOffered?: SkillReference[];
	skillsToLearn?: SkillReference[];
}

export const loginAtom = atom(false);
export const userInfoAtom = atom<UserProfile | null>(null);
export const conversationIdAtom = atom(null);
export const selectedUserAtom = atom(null);
export const onlineUsersAtom = atom([]);