import { QueryClient, QueryClientProvider} from 'react-query'

import Crawler from './components/crawler.jsx'
import './App.css'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Crawler />
    </QueryClientProvider>
  )
}

export default App
