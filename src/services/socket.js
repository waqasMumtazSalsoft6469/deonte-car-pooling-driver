import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.userId = null;
    this.userType = null; // 'user' or 'driver'
  }

  // Initialize socket connection
  connect(userId, userType, baseUrl) {
    if (this.socket && this.isConnected) {
      console.log('[SocketService] ⚠️ Socket already connected, skipping new connection');
      return this.socket;
    }

    this.userId = userId;
    this.userType = userType;
    
    // Connect to your ngrok URL or server URL
    // Remove /api from base URL if present, and remove trailing slash
    let socketUrl = baseUrl.replace('/api', '');
    socketUrl = socketUrl.endsWith('/') ? socketUrl.slice(0, -1) : socketUrl;
    
    // According to documentation, socket URL should be same as API URL
    // Example: https://react.customdev.solutions:6066 (without /api)
    console.log('[SocketService] 🔌 Connecting to socket...');
    console.log('[SocketService] 📍 Base URL:', baseUrl);
    console.log('[SocketService] 📍 Socket URL:', socketUrl);
    console.log('[SocketService] 📍 User ID:', userId);
    console.log('[SocketService] 📍 User Type:', userType);
    
    this.socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      query: {
        userId: userId,
        userType: userType,
      },
    });

    // Connection events
    this.socket.on('connect', () => {
      console.log('[SocketService] ✅ Socket connected successfully!');
      console.log('[SocketService] 📍 Socket ID:', this.socket.id);
      console.log('[SocketService] 📍 User ID:', userId);
      console.log('[SocketService] 📍 User Type:', userType);
      console.log('[SocketService] 📍 Timestamp:', new Date().toISOString());
      this.isConnected = true;
      
      // Join user's room for receiving messages
      console.log('[SocketService] 🔵 Joining room for user:', userId);
      this.joinRoom(userId);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
      this.isConnected = false;
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
      this.isConnected = true;
      this.joinRoom(userId);
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('❌ Socket reconnect error:', error);
    });

    return this.socket;
  }

  // Join user's room
  joinRoom(userId) {
    if (this.socket && this.isConnected) {
      console.log('[SocketService] 🔵 Emitting joinRoom event...');
      console.log('[SocketService] 📍 Room ID (userId):', userId);
      console.log('[SocketService] 📍 Socket connected:', this.socket.connected);
      console.log('[SocketService] 📍 Socket ID:', this.socket.id);
      
      this.socket.emit('joinRoom', userId);
      console.log('[SocketService] ✅ joinRoom event emitted successfully');
      console.log('[SocketService] 👤 Joined room:', userId);
    } else {
      console.error('[SocketService] ❌ Cannot join room - socket not connected');
      console.error('[SocketService] Socket exists:', !!this.socket);
      console.error('[SocketService] Is connected:', this.isConnected);
    }
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('🔌 Socket disconnected');
    }
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }

  // Check if connected
  isSocketConnected() {
    return this.isConnected && this.socket && this.socket.connected;
  }
}

// Export singleton instance
export default new SocketService();

