import { useState, useEffect } from 'react';
import { Plus, BookOpen, Loader2, RefreshCw } from 'lucide-react';
import { KnowledgeEntry } from './types';
import { knowledgeEntriesService } from './services/knowledgeEntries';
import { KnowledgeCard } from './components/KnowledgeCard';
import { KnowledgeForm } from './components/KnowledgeForm';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';

function App() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadEntries = async () => {
    try {
      setError(null);
      const data = await knowledgeEntriesService.getAll();
      setEntries(data);
    } catch (err) {
      setError('Failed to load entries. Please try again.');
      console.error('Error loading entries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleCreateOrUpdate = async (data: {
    title: string;
    description: string;
    image_url?: string | null
  }) => {
    try {
      if (editingEntry) {
        await knowledgeEntriesService.update(editingEntry.id, data);
      } else {
        await knowledgeEntriesService.create(data);
      }
      await loadEntries();
      setIsFormOpen(false);
      setEditingEntry(null);
    } catch (err) {
      console.error('Error saving entry:', err);
      throw err;
    }
  };

  const handleEdit = (entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    setIsDeleting(true);
    try {
      await knowledgeEntriesService.delete(deletingId);
      await loadEntries();
      setDeletingId(null);
    } catch (err) {
      console.error('Error deleting entry:', err);
      setError('Failed to delete entry. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingEntry(null);
  };

  const handleNewEntry = () => {
    setEditingEntry(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Knowledge Base
              </h1>
            </div>
            <button
              onClick={handleNewEntry}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">New Entry</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <p className="text-sm text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <Plus className="w-5 h-5 rotate-45" />
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading entries...</p>
          </div>
        ) : entries.length === 0 ? (
          <EmptyState onCreateNew={handleNewEntry} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'} found
              </p>
              <button
                onClick={loadEntries}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {entries.map((entry) => (
                <KnowledgeCard
                  key={entry.id}
                  entry={entry}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {isFormOpen && (
        <KnowledgeForm
          entry={editingEntry}
          onSubmit={handleCreateOrUpdate}
          onClose={handleFormClose}
        />
      )}

      <DeleteConfirmModal
        isOpen={deletingId !== null}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}

export default App;
