import { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4001"; // URL of your WebSocket server

const useGetBtcPrices = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socketInstance.on("newPrice", (data) => {
      console.log("[ws: price data received]", data);
      setPrices(data);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const currentPrice = useMemo(() => {
    return prices?.[0]?.rate_float || 0;
  }, [prices]);

  return { socket, prices, currentPrice };
};

export default useGetBtcPrices;
