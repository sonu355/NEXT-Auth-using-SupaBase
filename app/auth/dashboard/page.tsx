"use client";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase";
import { myAppHook } from "@/context/AppUtils";
import { Toast,toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
    
interface ProductType{
  id?: number,
  title: string,
  content?: string,
  cost?: string,
  banner_image?: string | File | null
}

const formSchema = yup.object().shape({ 
  title: yup.string().required("title is required"),
  content: yup.string().required("description is required"),
  cost: yup.string().required("product cost is required")
})

export default function Dashboard(){

    const [previewImage, setPreviewImage] = useState<null>(null)
    const [products, setProducts] = useState<ProductType | null>(null)
    const[userId, setUserId] = useState<null>(null)

    const {setAuthToken, setIsLoggedin, isLoggedIn, setUserProfile} = myAppHook()
    const router = useRouter()

    const{ register, reset, setValue, handleSubmit, formState: {
      errors
    }} = useForm({
      resolver: yupResolver(formSchema)
    }) 

    useEffect(() => {
      const handleLoginSession = async () =>{
        const { data, error } = await supabase.auth.getSession();
        //  console.log("data",data)
        if(error){
          toast.error("failed to get data");
          router.push("/auth/login"); 
          return;
        }
        if(data.session?.access_token){
          setAuthToken(data.session?.access_token);
          setUserId(data.session?.user.id);
          localStorage.setItem("access_token", data.session?.access_token);
          setIsLoggedin(true);
          setUserProfile({
            name: data.session.user?.user_metadata.fullName,
            email: data.session.user?.user_metadata.email,
            gender: data.session.user?.user_metadata.gender,
            phone: data.session.user?.user_metadata.phone
          })
          //console.log("setUserProfile",setUserProfile)
          localStorage.setItem("user_profile", JSON.stringify(
            {
              name: data.session.user?.user_metadata.fullName,
              email: data.session.user?.user_metadata.email,
              gender: data.session.user?.user_metadata.gender,
              phone: data.session.user?.user_metadata.phone
            }
          ))
       //   toast.success("User logged in successfully")
        }
      }

      handleLoginSession()

      if(!isLoggedIn){
        router.push("/auth/login");
        return;
      }
    }, [])

      const uploadImageFile = async (file: File) => {
      const fileExtension = file.name.split(".").pop();
      const fileName = `${ Date.now() }.${ fileExtension }`;

      const { data, error } = await supabase.storage.from("product-images").upload(fileName, file)

      if(error){
        toast.error("failed to upload image")
        return null;
      }
      return supabase.storage.from("product-images").getPublicUrl(fileName).data.publicUrl;
    }

    const onFormSubmit = async (formData: any) => {
      console.log(formData)
      let imagePath = null;
      if(formData.banner_image instanceof File){
        imagePath = await uploadImageFile(formData.banner_image)
        if(!imagePath) return;
      }
      const { data, error } = await supabase.from("proucts").insert({
        ...formData,
        user_id : userId,
        banner_image : imagePath
      });
      if (error) {
        toast.error("failed to add product")
        console.log(error, "error")
      } else {
        toast.success("product has been created successfully")
      }
      reset();
    }
  
    return <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <h3>Add Product</h3>
            <form onSubmit={ handleSubmit(onFormSubmit) }>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" {...register("title")}/>
                <small className="text-danger">{ errors.title?.message }</small>
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea className="form-control" {...register("content")}></textarea>
                <small className="text-danger">{ errors.content?.message }</small>
              </div>
              <div className="mb-3">
                <label className="form-label">Cost</label>
                <input type="number" className="form-control" {...register("cost")}/>
                <small className="text-danger">{ errors.cost?.message }</small>
              </div>
              <div className="mb-3">
                <label className="form-label">Banner Image</label>
                <div className="mb-2">
                  {previewImage && (<img src={previewImage} alt="Preview" id="bannerPreview" width="100" height="100" />) 
                  }
                </div>
                <input type="file" className="form-control" onChange={ (event) => {
                  setValue("banner_image", event.target.files[0]);
                  setPreviewImage(URL.createObjectURL(event.target.files[0]))
                }} />
                <small className="text-danger"></small>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Add Product
              </button>
            </form>
          </div>
          <div className="col-md-7">
            <h3>Product List</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Cost</th>
                  <th>Banner Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products ? (
                    <tr>
                      <td>Sample Product</td>
                      <td>Sample Content</td>
                      <td>$100</td>
                      <td>
                        {/* <Image src="" alt="Sample Product" width="50" /> */}
                      </td>
                      <td>
                        <button className="btn btn-primary btn-sm">Edit</button>
                        <button className="btn btn-danger btn-sm" style={{marginLeft: "10px"}}>Delete</button>
                      </td>
                  </tr>
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">No products found.</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
}