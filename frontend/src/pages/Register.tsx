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

const Register = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
        name,
        email,
        password
    }
    const formData = JSON.stringify(data)

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        {
          headers: { "content-type": "application/json" },
        }
      );
    
      if(response.data.error) {
        toast.error(response.data.error , {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        })
      } else {

        setName("");
        setEmail("");
        setPassword("");
        toast.success("Register successful , welcome" , {
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        })
        navigate('/login')
      }



    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form className="flex items-center justify-center mt-20 p-4" onSubmit={handleSubmit}> 
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
        Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name"
           type="text" 
           placeholder="m@example.com" 
           value={name}
           onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
           required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email"
           type="email" 
           placeholder="m@example.com" 
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
      <CardFooter>
        <Button className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
    </form>
  );
};

export default Register;
