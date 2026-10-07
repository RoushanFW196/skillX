import type { UserProfile } from "../store/atom";

export function fetchUserInfo(userId: string): Promise<UserProfile | undefined>;