import { ArrowLeft, Calendar, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { KnowledgeEntry } from '../types';

interface KnowledgeDetailProps {
  entry: KnowledgeEntry;
  onBack: () => void;
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
}

export function KnowledgeDetail({ entry, onBack, onEdit, onDelete }: KnowledgeDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-0 bg-black border-b border-white z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 bg-white text-black border-2 border-black hover:bg-black hover:text-white hover:border-white transition-all font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image */}
        {entry.image_url ? (
          <div className="w-full aspect-video bg-black border-4 border-black mb-8 overflow-hidden">
            <img
              src={entry.image_url}
              alt={entry.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-video bg-black border-4 border-black mb-8 flex items-center justify-center">
            <ImageIcon className="w-24 h-24 text-white" />
          </div>
        )}

        {/* Title and Metadata */}
        <div className="bg-white border-0 border-black p-6 sm:p-8 mb-6 ">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4 uppercase tracking-wider">
            {entry.title}
          </h1>

          <div className="flex items-center text-sm text-black mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="font-bold uppercase tracking-wider">
              {formatDate(entry.created_at)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(entry)}
              className="inline-flex items-center px-6 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="inline-flex items-center px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white border-0 border-black p-6 sm:p-8 shadow-[0px_8px_0px_0px_rgba(0,0,0,0.3)]">
          <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wider">
            Description
          </h2>
          <p className="text-base text-black leading-relaxed font-medium whitespace-pre-wrap">
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  );
}
