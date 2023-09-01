import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Feed from './Feed';
import Widgets from './Widgets';
import User from './User';
import UpdatePost from './UpdatePost';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <SideBar />
        <Widgets />
        <Routes>
          <Route exact path="/" element={<Feed/>}></Route>
          <Route exact path="/users/:userId" element={<User/>}></Route>
          <Route exact path="/posts/edit/:postId" element={<UpdatePost/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
