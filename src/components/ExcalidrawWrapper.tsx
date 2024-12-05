"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState, ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = { userId: string };

const ExcalidrawWrapper = ({ userId }: Props) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const [sceneElements, setSceneElements] = useState<readonly ExcalidrawElement[]>([]);
  const appStateRef = useRef<AppState | null>(null);
  const handleChange = useCallback(
    (elements: readonly ExcalidrawElement[], appState: AppState) => {
      if (
        elements !== sceneElements
      ) {
        setSceneElements(
          elements
        );
      }
      appStateRef.current = appState;
    },
    [sceneElements]
  );

  const handleExcalidrawAPI = useCallback((api: ExcalidrawImperativeAPI) => { setExcalidrawAPI(api) }, []);

  return (
    <Excalidraw excalidrawAPI={handleExcalidrawAPI} onChange={handleChange} />
  );
};

export default ExcalidrawWrapper;