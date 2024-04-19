import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import useUserStore from "./store/userStore";
import Gallery from "./pages/Gallery";
import { ScrollArea } from "@/components/ui/scroll-area"
import SkeletonCard from "./components/SkeletonCard";

function App() {
  const { user , setUser } = useUserStore(); 
  const [loading  , setloading] = useState(true) 


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user) {
      axios
        .get("https://gallery-server-five.vercel.app/auth/profile", {
          params: {
            localStorageData: token,
          },
        })
        .then((response) => {
          if(response.data.err){
            console.log(response.data)
            setloading(false)
          }
          setUser(response.data.name)
          setloading(false);
        });
    }
  }, [user , setUser]);

  
  return (
    <ThemeProvider defaultTheme="dark">
      <Toaster />
        <BrowserRouter>
        <div className="h-screen grid-cols-1 grid-rows-[auto , 1fr]">
        <Navbar />
      <ScrollArea className="h-[90vh]">
        <div className="h-[90vh]">
          {
            loading ? (
              <div className="flex flex-wrap items-center h-full justify-center gap-2 p-4">
              <SkeletonCard/>
              <SkeletonCard/>
              <SkeletonCard/>
              </div>
            ) : (
            <Routes>
            <Route path="/" element={<Home />} > 
            <Route path="" element={<Gallery />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
          )
        }
        </div>
      </ScrollArea>
        </div>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
