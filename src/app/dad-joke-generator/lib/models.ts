export interface OpenAIModel {
  id: string;
  owned_by: string;
  isNew?: boolean;
  isRemoved?: boolean;
}

const STORAGE_KEY = 'openai-models';

export function getStoredModels(): OpenAIModel[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function updateStoredModels(newModels: OpenAIModel[]): OpenAIModel[] {
  const storedModels = getStoredModels();
  
  // Create maps for easier lookup
  const storedModelMap = new Map(storedModels.map(model => [model.id, model]));
  const newModelMap = new Map(newModels.map(model => [model.id, model]));
  
  // Process new models
  const updatedModels = newModels.map(model => ({
    ...model,
    isNew: !storedModelMap.has(model.id),
    isRemoved: false
  }));
  
  // Add removed models
  storedModels.forEach(storedModel => {
    if (!newModelMap.has(storedModel.id)) {
      updatedModels.push({
        ...storedModel,
        isNew: false,
        isRemoved: true
      });
    }
  });
  
  // Sort models: active first, then removed, alphabetically within each group
  updatedModels.sort((a, b) => {
    if (a.isRemoved !== b.isRemoved) {
      return a.isRemoved ? 1 : -1;
    }
    return a.id.localeCompare(b.id);
  });
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedModels));
  }
  
  return updatedModels;
} 