import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area"
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import useUserStore from "./store/userStore";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import useImageStore from "./store/imageStore";


function App() {
  const { user , setUser } = useUserStore(); 
  const {setData} = useImageStore();
  const [loading  , setloading] = useState(true) 
  const [err , setErr] = useState<unknown  | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user) {
      axios.get("https://gallery-server-five.vercel.app/auth/profile", {
          params: {
            localStorageData: token,
          }, 
          headers : {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        })
        .then((response) => {
          if(response.data.err){
            setloading(false)
            setUser(null)
          } else {
            console.log(response.data)
            setUser(response.data.decoded)
            setData(response.data.logedinUserData)
            setloading(false);
          }
        }).catch((err : unknown) => {
          setloading(false)
          console.log(err)
          setErr(err);
        });
    }
  }, [user , setUser , setData]);

  
  if(err) {
    return <div className="h-screen w-screen grid place-items-center text-4xl italic ">Internal Server Error , try again</div>
  }
  return (
    <ThemeProvider defaultTheme="dark">
      <Toaster />
        <BrowserRouter>
        <div className="grid grid-rows-[auto , 1fr] gap-4">
        <Navbar />
      <ScrollArea className="">
        <div className="h-[80vh]">
          {
            loading ? (
              <div className="flex flex-wrap items-center h-full justify-center gap-2 p-4">
                <div className="w-20 h-20 border-2 border-b-primary border-t-primary  rounded-full animate-spin">

                </div>
              </div>
            ) : (
            <Routes>
            <Route path="/" element={<Home />} > 
            <Route path="" element={<Gallery />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
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
