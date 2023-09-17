import { Socket } from "socket.io-client";

export type SocketRef = React.MutableRefObject<Socket | null>;
