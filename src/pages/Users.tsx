import Back from "@/components/back";
import Directive from "@/components/directive";
import { motion } from "framer-motion";


export default function Users(){

    

    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{padding:"", height:"100svh"}}>
            <Back fixed title={"Users"}/>
            <div style={{border:"", display:"flex", width:"100%", justifyContent:"", alignItems:"flex-start", padding:"1rem", paddingTop:"5rem", overflowY:"auto", flexFlow:"column", gap:"0.5rem"}}>
                <Directive width={"100%"}/>
            </div>
        </motion.div>
    )
}