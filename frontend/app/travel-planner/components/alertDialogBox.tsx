'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';

// export interface AlertDialogBoxProps {}
// {}: AlertDialogBoxProps

export default function AlertDialogBox({ alert }) {
  return (
    <>
      <AlertDialog.Root open={alert.open}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-sm">
            <AlertDialog.Title className="text-lg font-semibold">
              {alert.title}
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-gray-600">
              {alert.description}
            </AlertDialog.Description>
            <div className="flex justify-end mt-4">
              <AlertDialog.Action
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                onClick={alert.onConfirm}
              >
                {alert.confirmText}
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
