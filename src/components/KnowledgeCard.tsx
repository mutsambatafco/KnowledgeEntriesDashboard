import { Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { KnowledgeEntry } from '../types';

interface KnowledgeCardProps {
  entry: KnowledgeEntry;
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
}

export function KnowledgeCard({ entry, onEdit, onDelete }: KnowledgeCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {entry.image_url ? (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={entry.image_url}
            alt={entry.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-gray-300" />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {entry.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {entry.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {formatDate(entry.created_at)}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(entry)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
              aria-label="Edit entry"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
              aria-label="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
