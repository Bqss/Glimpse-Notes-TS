import {createBrowserRouter} from "react-router-dom";
import {Home, AllNote, Archive, TaggedNotes, Trash} from "../views/pages";

const routes = [
  {
      path : '/',
      element: <Home/>,   
  },
  {
      path : "/notes",
      element : <AllNote/>
  },
  {
      path : "/archive",
      element : <Archive/>  
  },
  {
      path : "/tag/:tagname",
      element : <TaggedNotes/>
  },
  {
      path : "trash",
      element : <Trash/> 
  }

]

const route = createBrowserRouter(routes);


export {routes};
export default route;