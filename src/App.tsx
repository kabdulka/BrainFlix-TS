import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from './pages/Home/Home';
import VideoUpload from './pages/VideoUpload/VideoUpload';
import './App.scss'

export function getFormattedDate (timeStamp: number): string {

  const postedDate = new Date(timeStamp);
  postedDate.toLocaleDateString('en-US');
   
  let day = postedDate.getDate() + "";
  let month: any = postedDate.getMonth() + "";
  let year = postedDate.getFullYear() + "";
  let hoursInSeconds = postedDate.getHours()*3600;
  let minutesInSeconds = postedDate.getMinutes()*60;
  let seconds = postedDate.getSeconds();

  if (postedDate.getMonth()/10 < 1 ) {
      month++;
      month = "0" + month;
  }
  if (postedDate.getDate()/10 < 1 ) {
      day = "0" + day;
  }
  return `${month}/${day}/${year}`;
} // end getFormatedDate function

function App() {


  return (
    <BrowserRouter>

    <div className="app__contant">
      <Header/>
    </div>
    <Routes>
      <Route path="/" element={<Home />}  /> 
      <Route path="/videos" element={<Home />}  />    
      <Route path="/:videoId" element={<Home />}  /> 
      <Route path="/upload" element={< VideoUpload />} />
    </Routes>
  
  </BrowserRouter>
  )
}

export default App
