import Home from './pages/Home'
import Book from './pages/Book'
import SavedBooks from './pages/SavedBooks'
import Header from './components/Header'
import {Route,Routes} from "react-router-dom"
import BookChapter from './pages/BookChapter'
import Auth from './pages/Authentication'


function App() { 

  return (
    <div>
      <Header />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/book/:id' element={<Book />} />
          <Route exact path = '/SavedBooks' element={<SavedBooks />} />
          <Route exact path='/book/:id/chapter/:number' element={<BookChapter />} />
          <Route exact path='/Authentication' element={<Auth />}/>
      </Routes>
     
    </div> 
    
  )
  
}

export default App;
