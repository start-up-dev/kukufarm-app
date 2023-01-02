//Socket connection
import {useEffect, useRef, useState} from 'react';

import {
  socketConnectSuccess,
  socketConnectFail,
  clearSocket,
} from 'store/reducers/socket';
import socketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SOCKET_ENDPOINT} from 'config/http';
import {useCustomDispatch, useCustomSelector} from 'store';
export const useSocketSubscribe = (eventName: any, eventHandler: any) => {
  // Get the socket instance
  const dispatch = useCustomDispatch();
  const {socket, error} = useCustomSelector(state => state.socket);
  const {token} = useCustomSelector(state => state.auth);

  const socketConnection = async () => {
    if (!socket) {
      let socketRef = socketIOClient(SOCKET_ENDPOINT, {
        auth: {
          socketAuthToken: token,
        },
        transports: ['websocket'],
      });

      socketRef?.on('connect', () => {
        console.log('My socket id is: %s', socketRef.id);
        dispatch(socketConnectSuccess({socket: socketRef}));
      });

      socketRef?.on('connect_error', error => {
        console.log('SOCKET CONNECT FAILED', error);
        dispatch(socketConnectFail({error}));
      });
    }
  };

  useEffect(() => {
    socketConnection();
  }, []);

  // when the component, *which uses this hook* mounts,
  // add a listener.
  useEffect(() => {
    console.log('SocketIO: adding listener', eventName);
    socket?.on(eventName, eventHandler);

    // Remove when it unmounts
    return () => {
      console.log('SocketIO: removing listener', eventName);
      socket?.off(eventName);
    };

    // Sometimes the handler function gets redefined
    // when the component using this hook updates (or rerenders)
    // So adding a dependency makes sure the handler is
    // up to date!
  }, []);
};

export const useSocketConnect = () => {
  const dispatch = useCustomDispatch();
  const {token} = useCustomSelector(state => state.auth);
  let socketRef = useRef(null);

  // useEffect(() => {
  //   const initializeUrl = async () => {
  //     const token = await AsyncStorage.getItem('Token');
  //     setToken(token);
  //   };
  //   initializeUrl();
  // }, []);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_ENDPOINT, {
      auth: {
        socketAuthToken: token,
      },
      transports: ['websocket'],
    });

    socketRef?.current?.on('connect', () => {
      console.log('SocketIO: Successfully Connected.');
      dispatch(socketConnectSuccess({socket: socketRef?.current}));
    });

    socketRef?.current?.on('error', msg => {
      console.error('SocketIO: Error', msg);
      dispatch(socketConnectFail({error}));
    });

    // Remove all the listeners and
    // close the socketRef when it unmounts
    return () => {
      if (socketRef && socketRef?.current) {
        socketRef?.current?.removeAllListeners();
        socketRef?.current?.close();
        dispatch(clearSocket());
      }
    };
  }, [token]);
};

// //Socket connection
// import {useEffect, useRef, useState} from 'react';

// import {
//   socketConnectSuccess,
//   socketConnectFail,
//   clearSocket,
// } from 'store/reducers/socket';
// import socketIOClient from 'socket.io-client';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {SOCKET_ENDPOINT} from 'config/http';
// import {useCustomDispatch, useCustomSelector} from 'store';

// export const useSocketSubscribe = (eventName, eventHandler) => {
//   // Get the socket instance
//   const dispatch = useCustomDispatch();

//   const {socket} = useCustomSelector(state => state.socket);
//   console.log('I M Socket connect id', socket?.id);
//   const socketConnection = async () => {
//     if (socket) return;
//     const token = await AsyncStorage.getItem('Token');

//     const socketRef = socketIOClient(SOCKET_ENDPOINT, {
//       auth: {
//         socketAuthToken: token,
//       },
//       transports: ['websocket'],
//     });

//     socketRef?.on('connect', () => {
//       console.log('My socket id is: %s', socketRef.id);
//       dispatch(socketConnectSuccess(socketRef));
//     });

//     socketRef?.on('connect_error', error => {
//       console.log(error);
//       dispatch(socketConnectFail(error));
//     });
//   };

//   useEffect(() => {
//     socketConnection();
//   }, []);

//   // when the component, *which uses this hook* mounts,
//   // add a listener.
//   useEffect(() => {
//     if (!socket?.id) return;
//     console.log('connected');
//     socket?.on('NEW_SPACE_MESSAGE_RECEIVED', data => {
//       console.log(data);
//     });

//     // Remove when it unmounts
//     // return () => {
//     //   console.log('SocketIO: removing listener', eventName);
//     //   socket?.off(eventName, eventHandler);
//     // };

//     // Sometimes the handler function gets redefined
//     // when the component using this hook updates (or rerenders)
//     // So adding a dependency makes sure the handler is
//     // up to date!
//   }, [socket?.id]);
// };

// export const useSocketConnect = () => {
//   const dispatch = useCustomDispatch();
//   const [token, setToken] = useState('');
//   const socketRef = useRef(null);

//   useEffect(() => {
//     const initializeUrl = async () => {
//       const token = await AsyncStorage.getItem('Token');
//       setToken(token);
//     };
//     initializeUrl();
//   }, []);

//   useEffect(() => {
//     socketRef.current = socketIOClient(SOCKET_ENDPOINT, {
//       auth: {
//         socketAuthToken: token,
//       },
//       transports: ['websocket'],
//     });
//     socketRef?.current?.on('connect', () => {
//       console.log('SocketIO: Connected and authenticated');
//       dispatch(socketConnectSuccess(socketRef.current));
//     });

//     socketRef?.current?.on('error', msg => {
//       console.error('SocketIO: Error', msg);
//       dispatch(socketConnectFail(msg));
//     });

//     socketRef?.current?.on('connect_error', msg => {
//       console.error('SocketIO: Connect Error', msg);
//       dispatch(socketConnectFail(msg));
//     });

//     // Remove all the listeners and
//     // close the socketRef when it unmounts
//     return () => {
//       if (socketRef && socketRef?.current) {
//         socketRef?.current?.removeAllListeners();
//         socketRef?.current?.close();
//         dispatch(clearSocket());
//       }
//     };
//   }, [token]);
// };
