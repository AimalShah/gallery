import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false)

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true)

    const data = {
        email,
        password
    }
    const formData = JSON.stringify(data)

    try {
      const response = await axios.post(
        "https://gallery-server-five.vercel.app/auth/login",
        formData,
        {
          headers: { "content-type": "application/json" },
        }
      );

      localStorage.setItem("token" , response.data)
      console.log(response)
    
      if(response.data.error) {
        setLoading(false)
        toast.error(response.data.error , {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        })
      } else {

        setLoading(false)
        setEmail("");
        setPassword("");
        toast.success("Login successful , welcome back" , {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        navigate("/")
        window.location.reload();
      }



    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form className="h-full px-10 flex items-center justify-center" onSubmit={handleSubmit}> 
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email"
           type="email" 
           placeholder="user@example.com" 
           value={email}
           onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
           required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" 
          value={password}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required />
        </div>
      </CardContent>
      <CardFooter className="">
        <div className="w-full">
        <Button className="w-full">
        {
            loading ? (
              <div className="size-8 border-2 border-t-black border-b-gray-400 border-l-gray-400 rounded-full animate-spin">

              </div>
            ) : "Sign in"
          }
          </Button>
        <Button className="w-full mt-2" variant="outline">
          <Link to="/register">
          Register New Account
          </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
    </form>

  );
}

export default Login
