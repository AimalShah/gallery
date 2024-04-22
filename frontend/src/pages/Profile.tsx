import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/userStore"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
    const {user , setName} = useUserStore()
    const navigate = useNavigate();
    const [nameInp , setNameInp] = useState(false)
    if(!user) {
        navigate("/")
    }
    const openNameInp = () => {
        setNameInp(!nameInp)
    }
  return (
    <div className="h-full flex items-center justify-center">
       {user && (
        <div className="flex flex-col ">
            <Avatar>
                <AvatarImage
                  src="https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg"
                  alt="@shadcn"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
        <div className="mt-10">Name : {user.name}
            <Button className="" variant="ghost" onClick={openNameInp} size="icon">🖊️</Button>
            <div className="h-10">
            {
                nameInp && <Input type="text" value={user.name} onChange={(e) => setName(e.target.value)}/>
            }
            </div>
        </div>
        <div>Email : {user.email}</div>
        </div>
       )}
    </div>
  )
}
