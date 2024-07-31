"use client";
import { env } from "@/env";
import { createContext, useEffect, useRef } from "react";

interface WebSocketsContextType {
  ws: WebSocket | null;
  sendMessage: (message: string) => void;
}

export const WebSocketsContext = createContext<WebSocketsContextType | null>(
  null,
);

export function WebSocketsProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // If this ever changes state it will break connection
    // TODO: make this Context preserve connection across rerenders
    ws.current = new WebSocket(env.EXPO_PUBLIC_WS_SERVER_URL);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    ws.current.onmessage = (e) => {
      console.log("ws event", e);
    };

    const wsCurrent = ws.current;
    return () => {
      wsCurrent?.close();
    };
  });

  function sendMessage(message: string) {
    ws.current?.send(message);
  }

  return (
    <WebSocketsContext.Provider value={{ ws: ws.current, sendMessage }}>
      {children}
    </WebSocketsContext.Provider>
  );
}
