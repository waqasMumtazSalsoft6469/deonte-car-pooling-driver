import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.userId = null;
    this.userType = null; // 'user' or 'driver'
    this.connectionCallbacks = []; // Array of callbacks for connection state changes
  }

  // Register callback for connection state changes
  onConnectionChange(callback) {
    if (typeof callback === 'function') {
      this.connectionCallbacks.push(callback);
      // Return unsubscribe function
      return () => {
        const index = this.connectionCallbacks.indexOf(callback);
        if (index > -1) {
          this.connectionCallbacks.splice(index, 1);
        }
      };
    }
  }

  // Notify all registered callbacks of connection state change
  notifyConnectionChange(event, data) {
    this.connectionCallbacks.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('[SocketService] Error in connection callback:', error);
      }
    });
  }

  // Update connection state and sync with actual socket state
  updateConnectionState() {
    const wasConnected = this.isConnected;
    this.isConnected = this.socket && this.socket.connected;
    
    if (wasConnected !== this.isConnected) {
      console.log('[SocketService] Connection state changed:', {
        wasConnected,
        isConnected: this.isConnected,
        socketExists: !!this.socket,
        socketConnected: this.socket?.connected,
      });
    }
    
    return this.isConnected;
  }

  // Initialize socket connection
  connect(userId, userType, baseUrl) {
    // Check if socket exists and is actually connected (not just flag)
    const isActuallyConnected = this.socket && this.socket.connected && this.isConnected;
    
    // Check if credentials match existing connection
    const credentialsMatch = this.userId === userId && this.userType === userType;
    
    if (isActuallyConnected && credentialsMatch) {
      console.log('[SocketService] ⚠️ Socket already connected with same credentials, skipping new connection');
      return this.socket;
    }

    // If socket exists but disconnected or credentials changed, clean it up
    if (this.socket) {
      if (!credentialsMatch) {
        console.log('[SocketService] 🔄 Credentials changed, disconnecting old socket...');
        this.disconnect();
      } else if (!this.socket.connected) {
        console.log('[SocketService] 🔄 Socket exists but disconnected, cleaning up...');
        // Remove all listeners before creating new connection
        this.socket.removeAllListeners();
        this.socket = null;
        this.isConnected = false;
      }
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
      this.updateConnectionState();
      
      // Join user's room for receiving messages
      console.log('[SocketService] 🔵 Joining room for user:', userId);
      this.joinRoom(userId);
      
      // Notify callbacks
      this.notifyConnectionChange('connect', {
        socketId: this.socket.id,
        userId,
        userType,
      });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[SocketService] ❌ Socket disconnected:', reason);
      this.updateConnectionState();
      
      // Notify callbacks
      this.notifyConnectionChange('disconnect', { reason });
    });

    this.socket.on('connect_error', (error) => {
      console.error('[SocketService] ❌ Socket connection error:', error);
      this.updateConnectionState();
      
      // Notify callbacks
      this.notifyConnectionChange('connect_error', { error });
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('[SocketService] 🔄 Socket reconnected after', attemptNumber, 'attempts');
      this.updateConnectionState();
      
      // Join room again after reconnection
      this.joinRoom(userId);
      
      // Notify callbacks
      this.notifyConnectionChange('reconnect', {
        attemptNumber,
        socketId: this.socket.id,
        userId,
        userType,
      });
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('[SocketService] ❌ Socket reconnect error:', error);
      this.updateConnectionState();
      
      // Notify callbacks
      this.notifyConnectionChange('reconnect_error', { error });
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('[SocketService] 🔄 Reconnection attempt:', attemptNumber);
      this.notifyConnectionChange('reconnect_attempt', { attemptNumber });
    });

    return this.socket;
  }

  // Join user's room
  joinRoom(userId) {
    // Check both isConnected flag AND actual socket.connected state
    const isActuallyConnected = this.socket && this.socket.connected;
    
    if (isActuallyConnected) {
      // Update our state to match actual socket state
      this.isConnected = true;
      
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
      console.error('[SocketService] Socket connected:', this.socket?.connected);
      console.error('[SocketService] Is connected flag:', this.isConnected);
      
      // Update state to reflect reality
      this.updateConnectionState();
    }
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      // Remove all listeners before disconnecting
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('[SocketService] 🔌 Socket disconnected and cleaned up');
      
      // Notify callbacks
      this.notifyConnectionChange('disconnect', { reason: 'manual' });
    }
  }

  // Get socket instance
  getSocket() {
    // Update state before returning
    if (this.socket) {
      this.updateConnectionState();
    }
    return this.socket;
  }

  // Check if connected
  isSocketConnected() {
    // Always check actual socket state, not just flag
    if (this.socket) {
      this.updateConnectionState();
      return this.isConnected && this.socket.connected;
    }
    return false;
  }
}

// Export singleton instance
export default new SocketService();

