
import './App.css'
import { CommentsProvider } from './context/comment-context'
import { CommentList } from './components/CommentList'
import { UserContextProvider } from './context/user-context'
import { Header } from './components/Header'


function App() {

  return (
    <div className="App">
      <UserContextProvider>
        <CommentsProvider>
          <Header />
          <CommentList />
        </CommentsProvider>
      </UserContextProvider>
    </div>
  )
}

export default App
