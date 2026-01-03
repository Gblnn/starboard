import Back from "@/components/back";
import Directive from "@/components/directive";
import RefreshButton from "@/components/refresh-button";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { Eye, LoaderCircle, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function Users(){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as User[];
                
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{padding:"", height:"100svh"}}>
            <Back fixed title={"Users"} extra={<RefreshButton/>}/>
            <div style={{border:"", display:"flex", width:"100%", justifyContent:"", alignItems:"flex-start", padding:"1rem", paddingTop:"5rem", overflowY:"auto", flexFlow:"column", gap:"0.5rem", height:"100svh"}}>
                {loading ? (
                    <div style={{ border:"",display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "2rem", height: "75svh" }}>
                        <LoaderCircle className="animate-spin" size={32} />
                    </div>
                ) : users.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "2rem", opacity: 0.5 }}>
                        <p>No users found</p>
                    </div>
                ) : (
                    users.map((user) => (
                        <Directive 
                            key={user.id}
                            width={"100%"}
                            title={user.name}
                            // id_subtitle={user.email}
                            icon={user.role === 'admin' ? <Eye size={20} color="salmon" /> : <UserIcon />}
                            // tag={user.role}
                            // subtext={user.id}
                        />
                    ))
                )}
            </div>
        </motion.div>
    )
}