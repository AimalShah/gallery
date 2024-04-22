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
import Upload from "./Upload";

export default function Navbar() {
  const { user } = useUserStore();
  const fallback = !user?.name  ? "PH" : user?.name.substring(0, 2).toUpperCase();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate(0);
  };
  return (
    <div className="h-20 border-border border-b">
      <div className="lg:container mx-auto h-full flex items-center justify-between p-4 lg:px-6">
        <h1 className="font-bold text-lg">
            <Link to="/" className="block">
            Gallery
            </Link>
            </h1>
        <div className="font-bold text-lg ">
          {user  ? (
            <div className="space-x-5">
                <Upload/>
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
                <DropdownMenuContent className="mr-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
            </div>
          ) : (
            <div className="space-x-2">
              <Button variant="secondary">
                <Link to="/register" className="block">
                  Sign Up
                </Link>
              </Button>
              <Button>
                <Link to="/login" className="block">
                  login
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
