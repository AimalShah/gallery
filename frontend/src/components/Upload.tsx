import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faFile,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading  , setLoading] = useState(false)

  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileRef = e.target.files?.[0];

    if (fileRef) {
      setFile(fileRef);
      console.log(fileRef);
    }
  };

  const handleSubmit = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const formData = new FormData()
    if(file){
      formData.append("image" , file)
    }

    try {
      const response = await axios.post("https://gallery-server-five.vercel.app/upload/imageupload" , 
        formData , {
          params: {
            localStorageData: token,
          },
        }
      )
      if(response.data){
        toast.success(`${response.data}` , {
          action : {
            label : "close",
            onClick : () => {}
          }
        })
        setLoading(false)
        setTimeout(() => {
          navigate(0)
        } , 500)
      }
      if(response.data.err){
        toast.success(`${response.data.err} , try again` , {
          action : {
            label : "close",
            onClick : () => {}
          }
        })
        setLoading(false);
      }
    } catch(err) {
      alert(err)
      setLoading(false)
    }
  }
  return (
    <Dialog>
      <DialogTrigger>Upload</DialogTrigger>
      <DialogContent className="">
        <DialogTitle className="text-2xl">Upload File</DialogTitle>
        {!file && (
          <div className="grid gap-2 p-8 border border-border rounded-lg bg-background">
            <Label htmlFor="file" className="flex flex-col items-center gap-6">
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              Choose File
            </Label>
            <Input
              id="file"
              type="file"
              placeholder="user@example.com"
              className="w-0 h-0 border-0"
              onChange={handleFileChange}
              required
            />
          </div>
        )}
        <div>
          {file && (
            <div className="flex justify-between items-center p-2 border border-border rounded-md hover:bg-border">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon icon={faFile} />
                {file.name}
              </div>
              <div>
                <FontAwesomeIcon
                  className="font-thin block"
                  onClick={() => setFile(null)}
                  icon={faXmark}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="">
          <div className="w-full">
            <Button className="w-full font-bold flex gap-4 " onClick={handleSubmit}>
              {
                loading ? (
                  <div className="size-8 border-2 border-t-black border-b-gray-400 border-l-gray-400 rounded-full animate-spin">

                  </div>
                ): "Upload"
              }
                </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
