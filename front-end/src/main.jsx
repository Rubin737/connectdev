import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  
  <div data-theme="dim">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>      
    </QueryClientProvider>
  </div>
)
