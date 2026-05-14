"use client";

import { useState, useEffect, useCallback } from "react";

export interface Comment {
  id: string;
  text: string;
  timestamp: number;
}

type CommentsMap = Record<string, Comment[]>;

const STORAGE_KEY = "ipai-project-comments";

function loadAll(): CommentsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: CommentsMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useComments(projectId: string) {
  const [comments, setComments] = useState<Comment[]>([]);

  // Load on mount
  useEffect(() => {
    const all = loadAll();
    setComments(all[projectId] ?? []);
  }, [projectId]);

  const addComment = useCallback(
    (text: string) => {
      const entry: Comment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text,
        timestamp: Date.now(),
      };
      const all = loadAll();
      const updated = [...(all[projectId] ?? []), entry];
      all[projectId] = updated;
      saveAll(all);
      setComments(updated);
    },
    [projectId]
  );

  const deleteComment = useCallback(
    (id: string) => {
      const all = loadAll();
      const updated = (all[projectId] ?? []).filter((c) => c.id !== id);
      all[projectId] = updated;
      saveAll(all);
      setComments(updated);
    },
    [projectId]
  );

  return { comments, addComment, deleteComment };
}
