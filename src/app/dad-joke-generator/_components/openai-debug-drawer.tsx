"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Code2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchModelsAction } from "../actions/models";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStoredModels, updateStoredModels, type OpenAIModel } from "../lib/models";

function ModelsCard() {
  const [models, setModels] = useState<OpenAIModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load initial models from localStorage
    setModels(getStoredModels());
  }, []);

  async function refreshModels() {
    setIsLoading(true);
    try {
      const availableModels = await fetchModelsAction();
      if (availableModels) {
        const updatedModels = updateStoredModels(availableModels);
        setModels(updatedModels);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Available Models <span className="text-xs text-green-500 align-middle">{"["}Development Only{"]"}</span></h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={refreshModels}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-1">
          {models.map(model => (
            <div 
              key={model.id} 
              className={`flex justify-between items-center py-1 px-2 rounded ${
                model.isRemoved ? 'bg-red-500/10' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {model.isNew && (
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                )}
                <span className={`font-mono text-xs ${
                  model.isRemoved ? 'line-through opacity-50' : ''
                }`}>
                  {model.id}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {model.owned_by}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

export interface OpenAIMetadata {
  model: string;
  temperature: number;
  maxTokens: number;
  category: string;
  jokeType: string;
  systemContent: string;
  timestamp: string;
  duration: number;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCost: number;
    projectId?: string;
    dailyUsage?: {
      totalTokens: number;
      totalCost: number;
    };
  };
}

interface OpenAIDebugDrawerProps {
  metadata: OpenAIMetadata | null;
}

export function OpenAIDebugDrawer({ metadata }: OpenAIDebugDrawerProps) {
  const isDev = process.env.NODE_ENV === 'development';

  // Public version of model name (hide internal names)
  const getPublicModelName = (model: string) => {
    console.log('Model:', model);
    if (model.includes('gpt-4o')) return model;
    if (model.includes('gpt-4o-mini')) return model;
    return model;
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4">
          <Code2 className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <div className="mx-auto w-full max-w-7xl h-full">
          <DrawerHeader>
            <DrawerTitle>AI Assistant Info</DrawerTitle>
            <DrawerDescription>Information about your generated joke</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="p-6 h-[calc(90vh-8rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Models List - Development Only */}
              {isDev && <ModelsCard />}

              {/* Current Request Info */}
              {metadata ? (
                <>
                  {/* Model Info */}
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">AI Model</h3>
                    <div className="text-sm space-y-1">
                      <p>Type: {getPublicModelName(metadata.model)}</p>
                    </div>
                  </Card>

                  {/* Joke Info */}
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Joke Details</h3>
                    <div className="text-sm space-y-1">
                      <p>Category: {metadata.category}</p>
                      <p>Type: {metadata.jokeType}</p>
                    </div>
                  </Card>

                  {/* Performance */}
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Performance</h3>
                    <div className="text-sm space-y-1">
                      <p>Generated at: {new Date(metadata.timestamp).toLocaleString()}</p>
                      <p>Response Time: {(metadata.duration / 1000).toFixed(2)}s</p>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="p-4 col-span-1 md:col-span-2">
                  <p className="text-sm text-muted-foreground">No information available yet. Generate a joke to see the details.</p>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 