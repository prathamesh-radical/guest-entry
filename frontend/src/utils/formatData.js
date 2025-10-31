export const formatDate = (datetime) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

export const formatTime = (datetime) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

export const formatDateTime = (datetime) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${hours}:${minutes}`;
};