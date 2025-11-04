import { FileText, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateNew: () => void;
}

export function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-32 h-32 bg-white border-4 border-white flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
        <FileText className="w-16 h-16 text-black" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider">
        No Knowledge Entries Yet
      </h3>
      <p className="text-sm text-white mb-8 max-w-sm font-medium">
        Start capturing valuable knowledge from the field. Create your first entry to get started.
      </p>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white hover:border-white transition-all duration-200 font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create First Entry
      </button>
    </div>
  );
}
