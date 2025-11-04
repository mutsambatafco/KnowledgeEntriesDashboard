import { KnowledgeEntry, CreateKnowledgeEntry, UpdateKnowledgeEntry } from '../types';

const API_URL = 'http://localhost:3001/knowledge_entries';

export const knowledgeEntriesService = {
  async getAll(): Promise<KnowledgeEntry[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch entries');
    const data = await response.json();
    // Sort by created_at descending (newest first)
    return data.sort((a: KnowledgeEntry, b: KnowledgeEntry) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async getById(id: string): Promise<KnowledgeEntry | null> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch entry');
    }
    return response.json();
  },

  async create(entry: CreateKnowledgeEntry): Promise<KnowledgeEntry> {
    const newEntry = {
      ...entry,
      id: Date.now().toString(), // Simple ID generation
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    if (!response.ok) throw new Error('Failed to create entry');
    return response.json();
  },

  async update(id: string, entry: UpdateKnowledgeEntry): Promise<KnowledgeEntry> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...entry,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error('Failed to update entry');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete entry');
  },

  async uploadImage(file: File): Promise<string> {
    // Convert file to base64 data URL for mock implementation
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};
