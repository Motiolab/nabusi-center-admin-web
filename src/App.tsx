import ReduxProvider from './store/ReduxProvider';
import { AntdProvider } from './shared';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import { StrictMode } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (<>
    <StrictMode>
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <AntdProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </AntdProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </StrictMode>
    {/* <GoogleTagManager gtmId="GTM-5D7WNBLB" /> */}
  </>
  );
}

export default App;
