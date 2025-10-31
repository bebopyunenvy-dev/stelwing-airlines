'use client';

import { useRouter } from 'next/navigation';
import { DFLoginPage } from '../components/DFLoginPage';
import { useDFStore } from '../context/DFStoreContext';

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useDFStore(); // ✅ 新增：從 Context 取出登入控制

  return (
    <DFLoginPage
      onLoginSuccess={() => {
        setIsLoggedIn(true); // ✅ 設定登入狀態
        router.push('/dutyfree-shop/cart'); // ✅ 登入後自動導向購物車
      }}
      onLoginFailed={() => {
        console.log('登入失敗，請檢查輸入');
      }}
      onRegisterClick={() => {
        router.push('/dutyfree-shop/register'); // ✅ 可導向註冊頁（若還沒做可以先保留）
      }}
    />
  );
}
