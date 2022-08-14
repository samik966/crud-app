import 'assets/css/style.scss'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store'
import { AddPost, AllPosts, Navbar } from 'components'
function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<AllPosts/>} />
            <Route path='/add-post' element={<AddPost />} />
            <Route path='/edit-post/:id' element={<AddPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
