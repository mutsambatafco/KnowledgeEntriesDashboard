export interface KnowledgeEntry {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface CreateKnowledgeEntry {
  title: string;
  description: string;
  image_url?: string | null;
}

export interface UpdateKnowledgeEntry {
  title?: string;
  description?: string;
  image_url?: string | null;
  updated_at?: string;
}
