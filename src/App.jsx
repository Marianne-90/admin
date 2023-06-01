import './App.css'
import { AppRouter } from "./AppRouter/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./Context/MainProvider";


function App() {


  return (
    <div>
      <MainProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </MainProvider>
    </div>
  )
}

export default App
