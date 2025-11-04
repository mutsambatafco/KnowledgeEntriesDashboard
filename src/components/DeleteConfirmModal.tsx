import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, isDeleting, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black max-w-sm w-full p-8 animate-scale-in shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)]">
        <div className="flex items-center justify-center w-16 h-16 bg-black border-4 border-white mb-6">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-black mb-3 uppercase tracking-wider">
          Delete Entry?
        </h3>
        <p className="text-sm text-black mb-8 font-medium">
          Are you sure you want to delete this knowledge entry? This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
