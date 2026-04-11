"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface UserProfile {
  id: string; 
  name: string;
  email: string;
  xp: number;
  completedCourses: string[];
  isFirstVisit?: boolean;
  avatar?: string;
}

interface UserContextType {
  user: UserProfile | null;
  register: (name: string, email: string) => void;
  login: (identifier: string) => boolean;
  logout: () => void;
  addXp: (amount: number) => void;
  markCourseCompleted: (id: string) => void;
  xp: number;
  completedCourses: string[];
  level: number;
  league: { name: string; icon: string; color: string };
  isFirstVisit: boolean;
  completeFirstVisit: () => void;
  updateProfile: (newName: string, newAvatar: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sessionEmail = localStorage.getItem("agora_session");
    if (sessionEmail) {
      const userData = localStorage.getItem(`agora_user_${sessionEmail}`);
      if (userData) setUser(JSON.parse(userData));
    }
    setIsLoaded(true);
  }, []);

  const saveUserToDB = (updatedUser: UserProfile) => {
    const safeEmail = updatedUser.email.toLowerCase();
    localStorage.setItem(`agora_user_${safeEmail}`, JSON.stringify(updatedUser));
    
    // On garde une trace de l'email pour pouvoir le retrouver via le pseudo
    const allEmails = JSON.parse(localStorage.getItem("agora_all_emails") || "[]");
    if (!allEmails.includes(safeEmail)) {
      allEmails.push(safeEmail);
      localStorage.setItem("agora_all_emails", JSON.stringify(allEmails));
    }
    
    setUser(updatedUser);
  };

  const register = (name: string, email: string) => {
    const safeEmail = email.toLowerCase();
    const newUser: UserProfile = { 
      id: safeEmail, 
      name, 
      email: safeEmail, 
      xp: 0, 
      completedCourses: [], 
      isFirstVisit: true,
      avatar: "🦉" // Avatar par défaut
    };
    saveUserToDB(newUser); 
    localStorage.setItem("agora_session", safeEmail); 
  };

  const login = (identifier: string) => {
    const cleanId = identifier.trim().toLowerCase();
    
    // 1. On récupère tous les emails enregistrés sur cette machine
    const allEmails = JSON.parse(localStorage.getItem("agora_all_emails") || "[]");

    // 2. On scanne chaque compte pour voir si le pseudo ou le mail match
    for (const email of allEmails) {
      const data = localStorage.getItem(`agora_user_${email}`);
      if (data) {
        const potentialUser = JSON.parse(data) as UserProfile;
        if (
          potentialUser.email.toLowerCase() === cleanId || 
          potentialUser.name.toLowerCase() === cleanId
        ) {
          setUser(potentialUser);
          localStorage.setItem("agora_session", potentialUser.email.toLowerCase());
          return true; // Trouvé !
        }
      }
    }
    return false; // Pas trouvé
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agora_session");
    router.push("/connexion"); // Redirige vers ta page de connexion
  };

  const addXp = (amount: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, xp: prev.xp + amount };
      localStorage.setItem(`agora_user_${prev.email.toLowerCase()}`, JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const markCourseCompleted = (id: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.completedCourses.includes(id)) return prev;
      const updatedUser = { ...prev, completedCourses: [...prev.completedCourses, id] };
      localStorage.setItem(`agora_user_${prev.email.toLowerCase()}`, JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const currentXp = user?.xp || 0;
  const level = Math.floor(currentXp / 500) + 1;

  const getLeague = (lvl: number) => {
    if (lvl >= 10) return { name: "Diamant", icon: "💎", color: "text-cyan-500" };
    if (lvl >= 6) return { name: "Or", icon: "🥇", color: "text-yellow-500" };
    if (lvl >= 3) return { name: "Argent", icon: "🥈", color: "text-slate-400" };
    return { name: "Bronze", icon: "🥉", color: "text-amber-700" };
  };

  const league = getLeague(level);

  const completeFirstVisit = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, isFirstVisit: false };
      localStorage.setItem(`agora_user_${prev.email.toLowerCase()}`, JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateProfile = (newName: string, newAvatar: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, name: newName, avatar: newAvatar };
      localStorage.setItem(`agora_user_${prev.email.toLowerCase()}`, JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  if (!isLoaded) return null; 

  return (
    <UserContext.Provider value={{ 
      user, register, login, logout, addXp, markCourseCompleted, updateProfile,
      xp: currentXp,
      completedCourses: user?.completedCourses || [],
      level, 
      league,
      isFirstVisit: user?.isFirstVisit ?? false, 
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