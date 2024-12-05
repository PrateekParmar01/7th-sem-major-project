"use client";
import * as excalidrawLib from "@excalidraw/excalidraw";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState, ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = { userId: string };
type Scene = {
  elements: readonly ExcalidrawElement[],
  appState: AppState
}
const ExcalidrawWrapper = ({ userId }: Props) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const [sceneElements, setSceneElements] = useState<readonly ExcalidrawElement[]>([]);
  // const [initialScene, setInitialScene] = useState<Scene | null>(null);
  const { id: noteId } = useParams();
  const lastSentRef = useRef<readonly ExcalidrawElement[] | null>(null);

  console.log(sceneElements);
  const appStateRef = useRef<AppState | null>(null);

  useEffect(() => {
    console.log("TRIGGER");
    
    let active = true;
    const fetchInitialScene = async () => {
      const { data } = await axios.get(`/api/notes/${userId}/note/${noteId}`);
      const { elements, appState } = data;
      appState.collaborators = [] // Temp hack bug in excalidraw
      excalidrawAPI?.updateScene({ elements, appState });
      // setInitialScene({ elements, appState });
      
    }
    fetchInitialScene().catch(err => {
      console.log("Error Initial Scene");
    })
    return () => {
      active = false;
    };
  }, [excalidrawAPI, noteId, userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sceneElements !== lastSentRef.current) {
        console.log("Saving");
        axios
          .patch(`/api/notes/${userId}/note/${noteId}`, { elements: sceneElements, appState: appStateRef.current })
          .then(() => {
            lastSentRef.current = sceneElements;
          })
          .catch((err) => {
            console.error("Error sending PATCH request:", err);
          });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [sceneElements, noteId, userId]);

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