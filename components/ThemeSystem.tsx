"use client";

import { createContext, useContext, useEffect, useId, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "mint" | "sunset" | "midnight";
type Mode = "light" | "dark";
type Preferences = { theme: Theme; mode: Mode; setTheme:(value:Theme)=>void; toggleMode:()=>void };
const ThemeContext=createContext<Preferences|null>(null);
const isTheme=(value:unknown):value is Theme=>value==="mint"||value==="sunset"||value==="midnight";
const isMode=(value:unknown):value is Mode=>value==="light"||value==="dark";

export function ThemeProvider({children}:{children:React.ReactNode}){
  const [theme,setThemeState]=useState<Theme>("mint");
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    document.documentElement.dataset.mode="light";
    try{localStorage.setItem("medintel-mode","light");}catch{}
    setReady(true);
  },[]);
  useEffect(()=>{
    if(!ready)return;
    document.documentElement.dataset.theme=theme;
    document.documentElement.dataset.mode="light";
    try{localStorage.setItem("medintel-theme",theme);localStorage.setItem("medintel-mode","light");}catch{}
  },[theme,ready]);
  const setTheme=(value:Theme)=>setThemeState(value);
  const toggleMode=()=>{};
  return <ThemeContext.Provider value={{theme,mode:"light",setTheme,toggleMode}}>{children}</ThemeContext.Provider>;
}

export function ThemeControls(){
  return null;
}
