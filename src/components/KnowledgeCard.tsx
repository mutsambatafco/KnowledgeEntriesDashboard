import { Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { KnowledgeEntry } from '../types';

interface KnowledgeCardProps {
  entry: KnowledgeEntry;
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
  onClick?: (entry: KnowledgeEntry) => void;
}

export function KnowledgeCard({ entry, onEdit, onDelete, onClick }: KnowledgeCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(entry);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(entry);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(entry.id);
  };

  return (
    <div
      className="bg-white border-2 border-black overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] transition-all duration-200 group cursor-pointer"
      onClick={handleCardClick}
    >
      {entry.image_url ? (
        <div className="aspect-video w-full overflow-hidden bg-black border-b-4 border-black">
          <img
            src={entry.image_url}
            alt={entry.title}
            className="w-full h-full object-cover group-hover:grayscale transition-all duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-black border-b-4 border-black flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-white" />
        </div>
      )}

      <div className="p-4 bg-white">
        <h3 className="text-lg font-bold text-black mb-2 line-clamp-1 uppercase tracking-wider">
          {entry.title}
        </h3>
        <p className="text-sm text-black mb-3 line-clamp-2 font-medium">
          {entry.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-black font-bold uppercase tracking-widest">
            {formatDate(entry.created_at)}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleEditClick}
              className="p-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-150"
              aria-label="Edit entry"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-150"
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
