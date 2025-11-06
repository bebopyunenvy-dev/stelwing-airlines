'use client';

import Header from './components/header';
import { useDFStore } from './dutyfree-shop/context/DFStoreContext';

export default function HeaderWithCart() {
  const { cart } = useDFStore();
  console.log('Header re-render:', cart.length);
  return (
    <div className="sticky top-0 z-50 w-full">
      <Header cartItemCount={cart.length} cartItems={cart} />
    </div>
  );
}
