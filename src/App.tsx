import { ThemeProvider } from "@/components/theme-provider"

import viteLogo from "/vite.svg";

import { Link, Outlet } from "react-router-dom";

import { ModeToggle } from "./components/mode-toggle";

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <div className=" bg-background h-screen w-screen overflow-hidden">
      <div className=" flex justify-around items-center w-full py-5 border-b-[1px] border-accent ">
        <Link to="/react-vite-supreme" >
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
        <nav className=" text-accent-foreground">
        <Link to="/react-vite-supreme/page1">Page1</Link>
        {" | "}
        <Link to="/react-vite-supreme/page2">Page2</Link>
        {" | "}
        <Link to="/react-vite-supreme/contact">Notfound</Link>
        </nav>
        <ModeToggle/>
      </div>
 

      

      <Outlet />
      <div className=" h-full w-screen bg-background flex items-center justify-center">
        <h1 className=" text-accent-foreground text-4xl "> This is Blank page on main directory</h1>
  
    </div>
    </div>
    </ThemeProvider>
  )
}



export default App
