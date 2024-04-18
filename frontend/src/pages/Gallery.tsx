import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore"
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Gallery() {
    const {user} = useUserStore();
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const mockImages = [
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",
        "https://utfs.io/f/90b79d9c-a528-4c92-ba4c-8b6613cbbcdd-1j9eeo.jpeg",

    ]

    const openDialog = () => {
        if(dialogRef.current) dialogRef.current.showModal();
    }
    const closeDialog = () => {
        if(dialogRef.current) dialogRef.current.close()
    }
    if(!user){
        return (
            <div className="h-fulltext-center flex flex-col items-center justify-center mt-48">
            <h1 className="text-xl">Please Login to Your Gallery</h1>
            <div>
            <Button className="mt-2 w-24">
                <Link to="/login">
                    Login
                </Link>
            </Button>
            <Button className="mt-2 mx-4 w-24"  variant="secondary">
                <Link to="/register">
                    Sign Up
                </Link>
            </Button>
            </div>
            </div>
        )
    }
    if(user) {
      return (
        <div className="container flex flex-wrap gap-6 justify-center">
        {
            mockImages.map((img) => (
                <div>
                <div className="flex flex-col h-72 w-72 p-4" onClick={openDialog}>
                <img src={img} className="object-fit w-full h-full"/>
                <h1 className="font-bold text-lg">aimal.png</h1>
                </div>

                <dialog ref={dialogRef} className="relative h-screen w-screen min-w-0 bg-background/60 border border-border overflow-x-hidden">

                   <div className="w-full h-full flex flex-col lg:flex-row gap-2">
                    <div className="flex-grow bg-white">
                   <img src={img} alt=""  className="h-full w-full object-fill"/>
                    </div>
                    <div className="w-96 flex-shrink-0 lg:border-l border-primary flex-col">
                        <h1 className="text-primary p-4 text-center border-b border-primary">aimal.png</h1>
                        <div className="text-primary p-4 border-b border-primary">
                            Uploaded By : 
                            <h1>Aimal Shah</h1>
                        </div>
                        <div className="text-primary p-4 border-b border-primary">
                            Uploaded at : 
                            <h1>{Date.now().toLocaleString()}</h1>
                        </div>
                    </div>
                    <Button className="absolute top-2 right-3" onClick={closeDialog}> 
                        x
                    </Button>
                   </div>

                </dialog>
                </div>

            ))
            
        }
        </div>
      )
    }
}
