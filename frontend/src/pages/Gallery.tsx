import useUserStore from "@/store/userStore"
import useImageStore from "@/store/imageStore";

export default function Gallery() {
    const {user } = useUserStore();
    const {data}  = useImageStore();
  
    

   
    if(!user){
        return (
            <div className="h-full flex flex-col justify-center items-center p-6">
            {/* <h1 className="text-xl">Please Login to Your Gallery</h1>
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
            </div> */}
            <div className="space-y-16">
            <img src="https://utfs.io/f/8aeb5653-8ebb-4ae1-ace8-6ef575d4232a-usx631.svg" alt=""  className="w-96 opacity-50"/>
            <p className="text-center text-xl text-primary/60 italic">Please Login to your account</p>
            </div>
            </div>
        )
    }
    if(user) {
      return (
        <div className="h-full container flex flex-wrap gap-6 justify-center">
        {
            data?.length === 0 ? (
                <div className="h-full flex items-center flex-col justify-center gap-6" >
                    <img src="https://utfs.io/f/2dd4f014-15f8-49e5-aadc-ad1f89399190-r0kkcg.svg" alt="" className="opacity-50 w-96" />
                    <h1 className="text-center text-primary/60 text-xl italic">
                        It looks like your gallery is empty upload some photos
                    </h1>
                </div>
            ) : (
                data?.map((img : any) => (
                    <div key={img._id}>
                    <div className="flex flex-col w-48"     >
                    <img src={img.imageURl} className="object-fit w-full h-full"/>
                    <h1 className="font-bold text-lg">{img.imageName}</h1>
                    </div>
                    </div>
                ))
            )
            
        }
        </div>
      )
    }
}
