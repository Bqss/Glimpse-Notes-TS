import {Navbar, Sidebar} from "./";

interface props {
  children : React.ReactNode
}


const MainLayout = ({children}: props) => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <Navbar/>
        {children}  
      </div>
    </div>
  )
}

export default MainLayout;