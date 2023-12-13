import { pool } from "@/pages/_app";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
export default function Login(){
    const {LoggedIn , setLoggedIn} = useContext(pool);
    const {register , handleSubmit ,formState: {errors}} = useForm();
    const submit = async (data)=>{ 
        //console.log(data);
        const {Username , Password} = data;
        const response = await axios.post("/api/login",{Username , Password});
        const Resdata = response.data;
        console.log("message ",Resdata.Message , Resdata.LoggedIn);
        setLoggedIn(Resdata.LoggedIn);

    }


    return(
        <>
        <form className="text-black flex flex-col mt-10 p-5" onSubmit={handleSubmit(submit)}>
            <label className="font-semibold text-lg p-2" id="Username">Username</label>
            <input placeholder="Username" className="p-2 border-4 rounded-lg" {...register("Username" ,{required:"This feild is required"})}></input>
            {errors.Username && <h1>This feild is required</h1>}
            <label className="font-semibold text-lg p-2" id="Password">Password</label>
            <input type="password" className="p-2 border-4 rounded-lg" placeholder="Password" {...register("Password" ,{required:"This feild is required" , minLength:6})}></input>
            {errors.Password && <h1>This feild is required</h1>}
            <input className="bg-gray-400 p-1 text-lg font-semibold mt-3 cursor-pointer border-2 border-black rounded-2xl" type="submit"></input>
        </form>
        </>
    )
}