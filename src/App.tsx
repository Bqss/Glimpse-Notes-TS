import { useState } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import store from "./store";
import route from "./routes/web";
import CreateModal from "./views/components/modal/createNoteModal";
import TagModal from "./views/components/modal/tagModal";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={route} />
        <TagModal/> 
        <CreateModal/>
      </div>
    </Provider>
  );
}

export default App;
