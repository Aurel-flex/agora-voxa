"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  id: string; 
  name: string;
  email: string;
  xp: number;
  gems?: number; 
  claimedQuests?: number[]; 
  completedCourses: string[];
  isFirstVisit?: boolean;
  avatar?: string;
  dailyXp?: number; 
  lastActiveDate?: string; 
  dailyChallengeCompleted?: boolean; 
  isPremium?: boolean; 
  hasUsedStudioTrial?: boolean; 
}

interface UserContextType {
  user: UserProfile | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (newName: string, newAvatar: string) => Promise<void>; 
  addXp: (amount: number) => void;
  markCourseCompleted: (id: string) => void;
  claimQuestReward: (questId: number, xpReward: number, gemsReward: number) => void;
  completeDailyChallenge: () => void; 
  markStudioTrialUsed: () => void; 
  isPremium: boolean; 
  hasUsedStudioTrial: boolean; 
  xp: number;
  gems: number; 
  dailyXp: number; 
  claimedQuests: number[]; 
  dailyChallengeCompleted: boolean; 
  completedCourses: string[];
  level: number;
  league: { name: string; icon: string; color: string };
  isFirstVisit: boolean;
  isFirstSession: boolean;
  completeFirstVisit: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFirstSession, setIsFirstSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          let userData = docSnap.data() as UserProfile;
          const today = new Date().toISOString().split('T')[0];

          if (userData.lastActiveDate !== today) {
            const resetData = {
              lastActiveDate: today,
              dailyXp: 0,
              claimedQuests: [],
              dailyChallengeCompleted: false
            };
            
            await updateDoc(docRef, resetData);
            userData = { ...userData, ...resetData };
          }

          setUser(userData);
          setIsFirstSession(userData.isFirstVisit || false);
        }
      } else {
        setUser(null);
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const today = new Date().toISOString().split('T')[0];

      const newUser: UserProfile = { 
        id: firebaseUser.uid, 
        name, 
        email: email.toLowerCase(), 
        xp: 0, 
        gems: 0, 
        claimedQuests: [], 
        completedCourses: [], 
        isFirstVisit: true,
        avatar: "🦉",
        dailyXp: 0,
        lastActiveDate: today,
        dailyChallengeCompleted: false,
        isPremium: false, 
        hasUsedStudioTrial: false 
      };
      
      await setDoc(doc(db, "users", firebaseUser.uid), newUser);
      setUser(newUser);
      setIsFirstSession(true);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const docRef = doc(db, "users", userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data() as UserProfile;
        setUser(userData); 
        setIsFirstSession(userData.isFirstVisit || false);
      }
      
      return true; 
    } catch (error: any) {
      // 💡 Masque l'erreur effrayante de Firebase dans la console pour un simple faux mot de passe
      if (error.code !== 'auth/invalid-credential') {
        console.error("Erreur de connexion détaillée:", error);
      }
      return false; 
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/connexion"); 
  };

  const updateDatabase = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, updates);
  };

  const updateProfile = async (newName: string, newAvatar: string) => {
    if (!user) return;
    try {
      await updateDatabase({ name: newName, avatar: newAvatar });
      setUser({ ...user, name: newName, avatar: newAvatar });
    } catch (error) {
      console.error("Erreur de mise à jour du profil :", error);
      throw error; 
    }
  };

  // =========================================================================
  // 💡 SÉPARATION DES EFFETS (Firebase) ET DE L'ÉTAT (React)
  // Cela empêche l'erreur "Promise.then" causée par le Strict Mode de React !
  // =========================================================================

  const addXp = (amount: number) => {
    if (!user) return;
    const newXp = user.xp + amount;
    const newDailyXp = (user.dailyXp || 0) + amount;
    
    updateDatabase({ xp: newXp, dailyXp: newDailyXp });
    setUser({ ...user, xp: newXp, dailyXp: newDailyXp });
  };

  const completeDailyChallenge = () => {
    if (!user) return;
    updateDatabase({ dailyChallengeCompleted: true });
    setUser({ ...user, dailyChallengeCompleted: true });
  };

  const markStudioTrialUsed = () => {
    if (!user) return;
    updateDatabase({ hasUsedStudioTrial: true });
    setUser({ ...user, hasUsedStudioTrial: true });
  };

  const markCourseCompleted = (id: string) => {
    if (!user) return;
    if (user.completedCourses.includes(id)) return;
    
    const newCompleted = [...user.completedCourses, id];
    updateDatabase({ completedCourses: newCompleted });
    setUser({ ...user, completedCourses: newCompleted });
  };

  const claimQuestReward = (questId: number, xpReward: number, gemsReward: number) => {
    if (!user) return;
    const currentClaimed = user.claimedQuests || [];
    if (currentClaimed.includes(questId)) return;

    const newDailyXp = (user.dailyXp || 0) + xpReward; 
    const newXp = user.xp + xpReward;
    const newGems = (user.gems || 0) + gemsReward;
    const newClaimedQuests = [...currentClaimed, questId];

    updateDatabase({ 
      xp: newXp, 
      dailyXp: newDailyXp,
      gems: newGems, 
      claimedQuests: newClaimedQuests 
    });
    
    setUser({ 
      ...user, 
      xp: newXp, 
      dailyXp: newDailyXp,
      gems: newGems, 
      claimedQuests: newClaimedQuests 
    });
  };

  const completeFirstVisit = () => {
    if (!user) return;
    updateDatabase({ isFirstVisit: false });
    setUser({ ...user, isFirstVisit: false });
  };

  const currentXp = user?.xp || 0;
  const level = Math.floor(currentXp / 500) + 1;

  const getLeague = (lvl: number) => {
    if (lvl >= 10) return { name: "Diamant", icon: "💎", color: "text-cyan-500" };
    if (lvl >= 6) return { name: "Or", icon: "🥇", color: "text-yellow-500" };
    if (lvl >= 3) return { name: "Argent", icon: "🥈", color: "text-slate-400" };
    return { name: "Bronze", icon: "🥉", color: "text-amber-700" };
  };

  if (!isLoaded) return null; 

  return (
    <UserContext.Provider value={{ 
      user, register, login, logout, updateProfile, addXp, markCourseCompleted, claimQuestReward, 
      completeDailyChallenge, 
      markStudioTrialUsed, 
      isPremium: user?.isPremium || false, 
      hasUsedStudioTrial: user?.hasUsedStudioTrial || false, 
      xp: currentXp,
      gems: user?.gems || 0, 
      dailyXp: user?.dailyXp || 0, 
      claimedQuests: user?.claimedQuests || [],
      dailyChallengeCompleted: user?.dailyChallengeCompleted || false, 
      completedCourses: user?.completedCourses || [],
      level, 
      league: getLeague(level),
      isFirstVisit: user?.isFirstVisit ?? false, 
      isFirstSession,
      completeFirstVisit 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser doit être utilisé dans UserProvider");
  return context;
};