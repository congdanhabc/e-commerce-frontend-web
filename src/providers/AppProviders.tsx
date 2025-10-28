// Import các component Provider
import AuthProvider from './auth/AuthProvider';
import CartProvider from './cart/CartProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}

