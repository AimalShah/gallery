import useUserStore from "@/store/userStore"
import useImageStore from "@/store/imageStore";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog , DialogContent , DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropdownMenu , DropdownMenuContent , DropdownMenuItem , DropdownMenuLabel , DropdownMenuTrigger ,   DropdownMenuSeparator} from "@/components/ui/dropdown-menu";

export default function Gallery() {
    const {user } = useUserStore();
    const {data}  = useImageStore();
  
    

   
    if(!user){
        return (
            <div className="h-full flex flex-col justify-center items-center p-6">
            <div className="space-y-16">
            <img src="https://utfs.io/f/8aeb5653-8ebb-4ae1-ace8-6ef575d4232a-usx631.svg" alt=""  className="w-96 opacity-50"/>
            <p className="text-center text-xl text-primary/60 italic">Please Login to your account</p>
            </div>
            </div>
        )
    }


    if(user) {
      return (
        <div className="h-full container flex flex-wrap gap-4 items-start"> 
        {
            data?.length === 0 ? (
                <div className="h-full flex items-center flex-col justify-center gap-6" >
                    <img src="https://utfs.io/f/2dd4f014-15f8-49e5-aadc-ad1f89399190-r0kkcg.svg" alt="" className="opacity-50 w-96" />
                    <h1 className="text-center text-primary/60 text-xl italic">
                        It looks like your gallery is empty upload some photos
                    </h1>
                </div>
            ) : (
                data?.map((img ) => (
                    <Dialog>
                        <DialogTrigger>
                        <div key={img._id}>
                    <div className="flex flex-col w-48 cursor-pointer">
                    <AspectRatio ratio={1 / 1}>
                        <img src={img.imageURl} className="object-fit w-full h-full object-cover"/>
                    </AspectRatio>
                    <h1 className="text-lg font-light truncate overflow-hidden ">{img.imageName}</h1>
                    </div>
                    </div>
                        </DialogTrigger>
                        <DialogContent className="">
                            <img src={img.imageURl} alt="" className="w-full h-96 object-cover" />
                            <div className="flex justify-between items-center">
                            <h1>{img.imageName}</h1>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant={"ghost"} size={"icon"}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </Button> 
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Delete
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Download
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))
            )
            
        }
        </div>
      )
    }
}
