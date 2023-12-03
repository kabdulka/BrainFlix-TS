import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from './pages/Home/Home';
import VideoUpload from './pages/VideoUpload/VideoUpload';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import './App.scss'

// how long caching things
// as long as user is on a session saved in cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,// how long to cache things can be any number in ms
      cacheTime: Infinity // 
    },
  },
});

function App() {

  return (
    <BrowserRouter>
    {/* provides context for when we want to use use query later */}
      <QueryClientProvider client={queryClient}>
        {/* QueryClientProvider is a higher order component */}
        <div className="app__contant">
          <Header/>
        </div>
        <Routes>
          <Route path="/" element={<Home />}  /> 
          <Route path="/videos" element={<Home />}  />    
          <Route path="/:videoId" element={<Home />}  /> 
          <Route path="/upload" element={< VideoUpload />} />
        </Routes>
      </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
