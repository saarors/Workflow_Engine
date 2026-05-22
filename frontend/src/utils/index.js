import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge tailwind classes with clsx
 */
export function cn(...inputs) {
    return twMerge(clsx(...inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date, options = {}) {
    if (!date) return '-';
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options,
    };
    return new Date(date).toLocaleDateString('en-US', defaultOptions);
}

/**
 * Format datetime to readable string
 */
export function formatDateTime(date) {
    if (!date) return '-';
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date) {
    if (!date) return '-';
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now - then) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(date);
}

/**
 * Get status color based on status string
 */
export function getStatusColor(status) {
    const statusMap = {
        pending: 'warning',
        running: 'info',
        completed: 'success',
        failed: 'danger',
        approved: 'success',
        rejected: 'danger',
        active: 'success',
        inactive: 'default',
    };
    return statusMap[status?.toLowerCase()] || 'default';
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Capitalize first letter
 */
export function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate unique ID
 */
export function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Parse JSON safely
 */
export function safeJsonParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch {
        return fallback;
    }
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
    if (num === null || num === undefined) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get initials from name
 */
export function getInitials(name) {
    if (!name) return '';
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
