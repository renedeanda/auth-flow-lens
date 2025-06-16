
import { useState, useEffect } from 'react';
import { AuthFlow } from '@/types/auth';

export const useUrlState = (initialAuthFlow: AuthFlow) => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>(initialAuthFlow);

  // Load state from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const frontend = urlParams.get('frontend') as AuthFlow['frontend'];
    const auth = urlParams.get('auth') as AuthFlow['authProvider'];
    const backend = urlParams.get('backend') as AuthFlow['backend'];

    if (frontend || auth || backend) {
      setAuthFlow(prev => ({
        frontend: frontend || prev.frontend,
        authProvider: auth || prev.authProvider,
        backend: backend || prev.backend
      }));
    }
  }, []);

  // Update URL when state changes
  const updateAuthFlow = (newAuthFlow: AuthFlow) => {
    setAuthFlow(newAuthFlow);
    
    // Update URL without triggering a page reload
    const url = new URL(window.location.href);
    url.searchParams.set('frontend', newAuthFlow.frontend);
    url.searchParams.set('auth', newAuthFlow.authProvider);
    url.searchParams.set('backend', newAuthFlow.backend);
    
    window.history.replaceState({}, '', url.toString());
  };

  return { authFlow, setAuthFlow: updateAuthFlow };
};
