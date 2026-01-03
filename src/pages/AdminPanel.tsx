import Back from '@/components/back';
import Directive from '@/components/directive';
import IndexDropDown from '@/components/index-dropdown';
import { LinkIcon, QrCode, UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DefaultDialog from '@/components/default-dialog';

export const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutPrompt, setLogoutPrompt] =  useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    
    <div style={{display:"flex", border:"", height:"100svh"}}>
        <Back icon={<img src='/starboard-logo.png' style={{width:"2rem", border:""}}/>} fixed title={"StarBoard"} subtitle={"2.1"} noback extra={
        //     <Button style={{background:"crimson", color:"white"}} onClick={handleLogout} variant="ghost">
        //     Logout
        //   </Button>
        <IndexDropDown onLogout={()=>setLogoutPrompt(true)} onProfile={()=>navigate("/profile")}/>
          }
          />

        <div style={{border:"", display:"flex", width:"100%", justifyContent:"", alignItems:"flex-start", padding:"1rem", marginTop:"4rem", overflowY:"auto", flexFlow:"column", gap:"0.5rem"}}>
            <Directive width={"100%"} icon={<UsersIcon width={"1rem"}/>} title={"User Management"}/>
            <Directive width={"100%"} icon={<LinkIcon width={"1rem"}/>} title={"Quick Links"}/>
            <Directive width={"100%"} icon={<QrCode width={"1rem"}/>} title={"QR Generator"}/>
        </div>

      {/* <div className="max-w-4xl mx-auto space-y-6">
        <Button style={{background:"none"}} onClick={() => navigate('/dashboard')} variant="outline">
          <ChevronLeft/>
        </Button>
        
        <div className="bg-card p-8 rounded-lg shadow">
          <h2 className="text-3xl font-bold mb-2">Admin Panel</h2>
          <p className="text-muted-foreground mb-6">
            This page is only accessible to administrators
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Active Sessions</h3>
              <p className="text-3xl font-bold">89</p>
            </div>
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">System Status</h3>
              <p className="text-3xl font-bold text-green-600">Online</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Admin Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button style={{background:"none"}} variant="outline">Manage Users</Button>
              <Button style={{background:"none"}} variant="outline">View Logs</Button>
              <Button style={{background:"none"}} variant="outline">System Settings</Button>
              <Button style={{background:"none"}} variant="outline">Analytics</Button>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Admin</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div> */}
      <DefaultDialog open={logoutPrompt} title={"Confirm Logout?"} onOk={handleLogout} OkButtonText='Logout' onCancel={() => setLogoutPrompt(false)}/>
    </div>
  );
};
