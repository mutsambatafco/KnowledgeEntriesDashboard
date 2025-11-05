import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { KnowledgeEntry } from '../types';
import { knowledgeEntriesService } from '../services/knowledgeEntries';

interface KnowledgeFormProps {
  entry?: KnowledgeEntry | null;
  onSubmit: (data: { title: string; description: string; image_url?: string | null }) => Promise<void>;
  onClose: () => void;
}

export function KnowledgeForm({ entry, onSubmit, onClose }: KnowledgeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDescription(entry.description);
      setImageUrl(entry.image_url);
    }
  }, [entry]);

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await knowledgeEntriesService.uploadImage(imageFile);
      }

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        image_url: finalImageUrl
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg border-4 border-black max-h-[90vh] overflow-y-auto animate-slide-up shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)]">
        <div className="sticky top-0 bg-black border-b-4 border-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
            {entry ? 'Edit Entry' : 'New Entry'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-white text-black hover:bg-black hover:text-white border-2 border-white transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 pb-24 md:pb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
              Title <span className="text-black">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 border-2 bg-white text-black font-medium focus:ring-0 focus:border-black outline-none transition-all ${
                errors.title ? 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'border-black'
              }`}
              placeholder="ENTER A DESCRIPTIVE TITLE"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-black font-bold">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
              Description <span className="text-black">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border-2 bg-white text-black font-medium focus:ring-0 focus:border-black outline-none transition-all resize-none ${
                errors.description ? 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'border-black'
              }`}
              placeholder="PROVIDE DETAILED INFORMATION"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-black font-bold">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
              Image (Optional)
            </label>

            {imageUrl && (
              <div className="mb-4 relative border-4 border-black">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover grayscale"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl(null);
                    setImageFile(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <label className="flex items-center justify-center w-full h-32 border-4 border-dashed border-black cursor-pointer hover:bg-black hover:text-white transition-all bg-white">
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {imageFile ? imageFile.name : 'Click to upload image'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                entry ? 'Update' : 'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
