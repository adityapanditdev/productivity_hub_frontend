import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import NoteList from './components/noteList';
import TaskList from './components/taskList';
import UserList from './components/userList';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<NoteList />}/>
        <Route path='/tasks' element={<TaskList />}/>
        <Route path='/users' element={<UserList />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
