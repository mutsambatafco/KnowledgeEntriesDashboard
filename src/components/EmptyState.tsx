import { FileText, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateNew: () => void;
}

export function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FileText className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Knowledge Entries Yet
      </h3>
      <p className="text-sm text-gray-600 mb-6 max-w-sm">
        Start capturing valuable knowledge from the field. Create your first entry to get started.
      </p>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create First Entry
      </button>
    </div>
  );
}
