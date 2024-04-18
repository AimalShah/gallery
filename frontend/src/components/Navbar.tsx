import { Link } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const { user } = useUserStore();
  const fallback = user === null ? "PH" : user.substring(0, 2).toUpperCase();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate(0);
  };
  return (
    <div className="h-[10%] border-border border-b">
      <div className=" h-full container max-auto flex items-center justify-between">
        <h1 className="font-bold text-lg">
            <Link to="/">
            Gallery
            </Link>
            </h1>
        <div className="font-bold text-lg ">
          {user === null ? (
            <div className="flex gap-2">
              <Button variant="default" size="lg">
              <Link to="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <div className="mr-6">
                <Button className="mr-2" variant="ghost">Upload</Button>
             <DropdownMenu>
                <DropdownMenuTrigger>
                <Avatar>
                <AvatarImage
                  src=""
                  alt="@shadcn"
                />
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-6">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
