"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState, ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { JWT } from "next-auth/jwt";
import { useCallback, useEffect, useState } from "react";

type Props = { user: JWT };

const ExcalidrawWrapper = ({ user }: Props) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const [sceneElements, setSceneElements] = useState<readonly ExcalidrawElement[]>([]);

  const handleChange = useCallback(
    (elements: readonly ExcalidrawElement[], appState: AppState) => {
      if (
        elements !== sceneElements
      ) {
        setSceneElements(
          elements
        );
      }
    },
    [sceneElements]
  );

  const handleExcalidrawAPI = useCallback((api: ExcalidrawImperativeAPI) => { setExcalidrawAPI(api) }, []);

  return (
    <Excalidraw excalidrawAPI={handleExcalidrawAPI} onChange={handleChange} />
  );
};

export default ExcalidrawWrapper;