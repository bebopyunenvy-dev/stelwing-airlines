'use client';

import { useState } from 'react';
import AlertDialogBox from '../components/alertDialog/alertDialogBox';
import { useAlertDialog } from '../components/alertDialog/useAlertDialog';
import type { Trip } from '../types';
import { apiFetch } from '../utils/apiFetch';

export default function ChangeCoverButton({
  tripId,
  onUpdated,
}: {
  tripId: string;
  onUpdated: (newCoverUrl: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const { alert, showAlert } = useAlertDialog();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('cover', file);

      const data = await apiFetch<Trip>(
        `http://localhost:3007/api/plans/${tripId}/cover`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      showAlert({
        title: '封面更新成功',
        description: '封面圖片已完成更新',
        confirmText: '確認',
        onConfirm: () => onUpdated(data.coverImage),
      });
    } catch (err: any) {
      showAlert({
        title: '封面更新失敗',
        description: err.message || '請稍後再試',
        confirmText: '確認',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="sw-btn sw-btn--gold-square cursor-pointer">
        {uploading ? '上傳中...' : '從電腦中選擇圖片'}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {alert.open && <AlertDialogBox alert={alert} />}
    </div>
  );
}
