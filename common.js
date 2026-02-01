// Backend API URL
// Backend API URL
const API_BASE_URL = 'https://leave-backend-24w1.onrender.com/api'; // Deployment URL
// const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Local Development URL

// Initialize data (Legacy: only used if offline/fallback, but generally we rely on DB now)
const initializeData = () => {
    // We can keep this for now to avoid errors on pages still using localStorage
    if (!localStorage.getItem('leaveApplications')) {
        localStorage.setItem('leaveApplications', JSON.stringify([]));
    }
};

// Notification system
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    ${message}
  `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Check Auth helper
const checkAuth = (role) => {
    let key = '';
    switch (role) {
        case 'student': key = 'currentStudent'; break;
        case 'advisor': key = 'currentAdvisor'; break;
        case 'hod': key = 'currentHod'; break;
        case 'management': key = 'currentManagement'; break;
        case 'admin': key = 'currentAdmin'; break;
    }

    // If we have a session, we return it
    const session = localStorage.getItem(key);
    try {
        return session ? JSON.parse(session) : null;
    } catch (e) {
        console.error('Error parsing session data', e);
        localStorage.removeItem(key); // Clear bad data
        return null;
    }
};

// Common logout functions
const logout = (role) => {
    let key = '';
    switch (role) {
        case 'student': key = 'currentStudent'; break;
        case 'advisor': key = 'currentAdvisor'; break;
        case 'hod': key = 'currentHod'; break;
        case 'management': key = 'currentManagement'; break;
        case 'admin': key = 'currentAdmin'; break;
    }
    localStorage.removeItem(key);
    // Reload page to show login form
    window.location.reload();
};
