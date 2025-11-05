import { useState, useEffect } from 'react';
import { Plus, Loader2, RefreshCw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { VscHome, VscArchive, VscAccount, VscAdd } from 'react-icons/vsc';
import { KnowledgeEntry } from './types';
import { knowledgeEntriesService } from './services/knowledgeEntries';
import { KnowledgeCard } from './components/KnowledgeCard';
import { KnowledgeForm } from './components/KnowledgeForm';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { KnowledgeDetail } from './components/KnowledgeDetail';
import Dock from './components/Dock/Dock';
import StaggeredMenu from './components/StaggeredMenu/StaggeredMenu';
import PixelBlast from './components/PixelBlast/PixelBlast';
import logo from '/logo.png';

function App() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null);

  const loadEntries = async () => {
    try {
      setError(null);
      const data = await knowledgeEntriesService.getAll();
      setEntries(data);
    } catch (err) {
      const errorMessage = 'Failed to load entries. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
        toast.success('Entry updated successfully!');
      } else {
        await knowledgeEntriesService.create(data);
        toast.success('Entry created successfully!');
      }
      await loadEntries();
      setIsFormOpen(false);
      setEditingEntry(null);
    } catch (err) {
      const errorMessage = editingEntry
        ? 'Failed to update entry. Please try again.'
        : 'Failed to create entry. Please try again.';
      toast.error(errorMessage);
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
      toast.success('Entry deleted successfully!');
      await loadEntries();
      setDeletingId(null);
    } catch (err) {
      const errorMessage = 'Failed to delete entry. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error deleting entry:', err);
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

  const handleCardClick = (entry: KnowledgeEntry) => {
    setSelectedEntry(entry);
  };

  const handleBackToList = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#000',
            border: '1px solid #000',
          },
          success: {
            duration: 3000,
            style: {
              background: '#000',
              color: '#fff',
              border: '1px solid #fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#000',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#fff',
              color: '#000',
              border: '2px solid #000',
            },
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* StaggeredMenu - Fixed overlay navigation */}
      <div className="pointer-events-none" style={{ position: 'relative', zIndex: 1000 }} onClick={(e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link && link.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (href === '#new') {
            handleNewEntry();
          } else if (href === '#entries') {
            const main = document.querySelector('main');
            main?.scrollIntoView({ behavior: 'smooth' });
          } else if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (href === '#about') {
            toast('About section coming soon!', { icon: 'ℹ️' });
          }
        }
      }}>
        <StaggeredMenu
          position="right"
          items={[
            {
              label: 'Home',
              ariaLabel: 'Go to home page',
              link: '#'
            },
            {
              label: 'Entries',
              ariaLabel: 'View all knowledge entries',
              link: '#entries'
            },
            {
              label: 'New Entry',
              ariaLabel: 'Create a new entry',
              link: '#new'
            },
            {
              label: 'About',
              ariaLabel: 'Learn about Knowledge Base',
              link: '#about'
            }
          ]}
          socialItems={[
            { label: 'GitHub', link: 'https://github.com' },
            { label: 'Twitter', link: 'https://twitter.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' }
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          colors={['#1a1a1a', '#000000']}
          logoUrl={logo}
          accentColor="#fff"
          isFixed={true}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>

      <header className="bg-black border-b border-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-auto"
              draggable={false}
              width={110}
              height={24}
            />
            </div>
            <button
              onClick={handleNewEntry}
              className="inline-flex items-center px-6 py-3 bg-white text-black rounded-none border-2 border-black hover:bg-black hover:text-white hover:border-white transition-all duration-200 font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">New Entry</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </header>

      <div style={{ width: '100%', height: '100px', position: 'relative', backgroundColor: '#000' }} className="md:!h-[200px]">
        {/* PixelBlast component - may not render in all browsers */}
        {typeof window !== 'undefined' && (
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color="#FFF"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8">
        {selectedEntry ? (
          <KnowledgeDetail
            entry={selectedEntry}
            onBack={handleBackToList}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-white border-2 border-black flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                <p className="text-sm text-black font-semibold">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-black hover:text-white hover:bg-black border border-black p-1 transition-colors"
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
                <p className="text-white font-semibold">Loading entries...</p>
              </div>
            ) : entries.length === 0 ? (
              <EmptyState onCreateNew={handleNewEntry} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-white font-semibold uppercase tracking-wider">
                    {entries.length} {entries.length === 1 ? 'entry' : 'entries'} found
                  </p>
                  <button
                    onClick={loadEntries}
                    className="inline-flex items-center text-sm px-4 py-2 bg-white text-black border-2 border-black hover:bg-black hover:text-white hover:border-white transition-all font-bold uppercase tracking-wider"
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
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </>
            )}
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

      {/* Mobile Dock - Only visible on mobile devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[999]">
        <Dock
          items={[
            {
              icon: <VscHome size={20} color="#000000" />,
              label: 'Home',
              onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            },
            {
              icon: <VscAdd size={20} color="#000000" />,
              label: 'New Entry',
              onClick: handleNewEntry,
            },
            {
              icon: <VscArchive size={20} color="#000000" />,
              label: 'Entries',
              onClick: () => {
                const main = document.querySelector('main');
                main?.scrollIntoView({ behavior: 'smooth' });
              },
            },
            {
              icon: <VscAccount size={20} color="#000000" />,
              label: 'About',
              onClick: () => toast('About section coming soon!', { icon: 'ℹ️' }),
            },
          ]}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
}

export default App;
