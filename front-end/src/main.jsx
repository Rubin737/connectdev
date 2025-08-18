import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'stream-chat-react/dist/css/v2/index.css';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { themeStrore } from './store/appStore'
import { Provider } from 'react-redux'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  
  <div>
    <QueryClientProvider client={queryClient}>
      <Provider store={themeStrore}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>      
       </Provider>
      </QueryClientProvider>
    
  </div>
)
