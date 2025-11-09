// js/utils.js
class Utils {
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    static formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    static showLoading() {
        let loadingEl = document.getElementById('loading');
        if (!loadingEl) {
            loadingEl = document.createElement('div');
            loadingEl.id = 'loading';
            loadingEl.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading...</p>
                </div>
            `;
            loadingEl.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                color: white;
            `;
            document.body.appendChild(loadingEl);
        }
        loadingEl.style.display = 'flex';
    }

    static hideLoading() {
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    }

    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white;
            border-radius: 8px;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    static getStatusBadge(status) {
        const statusMap = {
            'Delivered': 'status-delivered',
            'Shipping': 'status-shipping', 
            'Pending': 'status-pending',
            'In Stock': 'status-in-stock',
            'Low Stock': 'status-low-stock',
            'Out of Stock': 'status-out-of-stock',
            'In Transit': 'status-shipping'
        };
        
        const statusClass = statusMap[status] || 'status-pending';
        return `<span class="status-badge ${statusClass}">${status}</span>`;
    }
}

// Add CSS for loading and notifications
const additionalStyles = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .loading-spinner {
        text-align: center;
        color: white;
    }
    
    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 4px solid white;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 10px;
    }
    
    .product-stock.in-stock {
        background: #ECFDF5;
        color: #059669;
        border: 1px solid #A7F3D0;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .product-stock.low-stock {
        background: #FFFBEB;
        color: #D97706;
        border: 1px solid #FDE68A;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .product-stock.out-of-stock {
        background: #FEF2F2;
        color: #DC2626;
        border: 1px solid #FECACA;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
