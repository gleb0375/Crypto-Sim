import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { WalletProvider } from './contexts/WalletContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <WalletProvider>
                <App />
            </WalletProvider>
        </QueryClientProvider>
    </StrictMode>
);
