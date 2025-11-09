// js/api.js
class ApiService {
    constructor() {
        this.baseUrl = CONFIG.API_URL;
    }

    async makeRequest(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${this.baseUrl}?${queryString}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error || 'Request failed');
            }
            return data.data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Dashboard
    async getDashboardData() {
        return await this.makeRequest({ endpoint: 'dashboard' });
    }

    // Inventory
    async getInventory() {
        return await this.makeRequest({ endpoint: 'inventory', action: 'read' });
    }

    async getProduct(productId) {
        return await this.makeRequest({ 
            endpoint: 'inventory', 
            action: 'read', 
            productId: productId 
        });
    }

    async addProduct(productData) {
        return await this.makeRequest({
            endpoint: 'inventory',
            action: 'create',
            ...productData
        });
    }

    async updateProduct(productId, updates) {
        return await this.makeRequest({
            endpoint: 'inventory',
            action: 'update',
            productId: productId,
            ...updates
        });
    }

    async getLowStockProducts() {
        return await this.makeRequest({
            endpoint: 'inventory',
            action: 'low-stock'
        });
    }

    // Orders
    async getOrders() {
        return await this.makeRequest({ endpoint: 'orders', action: 'read' });
    }

    async getOrder(orderId) {
        return await this.makeRequest({
            endpoint: 'orders',
            action: 'read',
            orderId: orderId
        });
    }

    async createOrder(orderData) {
        return await this.makeRequest({
            endpoint: 'orders',
            action: 'create',
            ...orderData
        });
    }

    async updateOrderStatus(orderId, status) {
        return await this.makeRequest({
            endpoint: 'orders',
            action: 'update-status',
            orderId: orderId,
            status: status
        });
    }

    // Shipping
    async getShipping() {
        return await this.makeRequest({ endpoint: 'shipping', action: 'read' });
    }

    async getShippingByOrder(orderId) {
        return await this.makeRequest({
            endpoint: 'shipping',
            action: 'read',
            orderId: orderId
        });
    }

    // Customers
    async getCustomers() {
        return await this.makeRequest({ endpoint: 'customers', action: 'read' });
    }

    async addCustomer(customerData) {
        return await this.makeRequest({
            endpoint: 'customers',
            action: 'create',
            ...customerData
        });
    }
}

const apiService = new ApiService();
