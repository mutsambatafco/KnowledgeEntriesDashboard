import { supabase } from '../lib/supabase';
import { KnowledgeEntry, CreateKnowledgeEntry, UpdateKnowledgeEntry } from '../types';

export const knowledgeEntriesService = {
  async getAll(): Promise<KnowledgeEntry[]> {
    const { data, error } = await supabase
      .from('knowledge_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<KnowledgeEntry | null> {
    const { data, error } = await supabase
      .from('knowledge_entries')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(entry: CreateKnowledgeEntry): Promise<KnowledgeEntry> {
    const { data, error } = await supabase
      .from('knowledge_entries')
      .insert([entry])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, entry: UpdateKnowledgeEntry): Promise<KnowledgeEntry> {
    const { data, error } = await supabase
      .from('knowledge_entries')
      .update({ ...entry, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('knowledge_entries')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `knowledge-entries/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};
