// Utility functions for form validation and data formatting

export const validateCoordinates = {
    latitude: (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return 'La latitud debe ser un número válido';
        if (num < -90 || num > 90) return 'La latitud debe estar entre -90 y 90';
        return true;
    },

    longitude: (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return 'La longitud debe ser un número válido';
        if (num < -180 || num > 180) return 'La longitud debe estar entre -180 y 180';
        return true;
    },
};

export const validateDate = (value) => {
    if (!value) return 'La fecha es requerida';

    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        return 'La fecha debe ser hoy o posterior';
    }

    // Check if date is not too far in the future (e.g., 1 year)
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (selectedDate > oneYearFromNow) {
        return 'La fecha no puede ser superior a un año';
    }

    return true;
};

export const formatCoordinate = (value, decimals = 3) => {
    if (value === null || value === undefined) return 'N/A';
    return parseFloat(value).toFixed(decimals);
};

export const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        return dateString;
    }
};

export const formatTemperature = (temp) => {
    if (temp === null || temp === undefined) return 'N/A';
    return `${parseFloat(temp).toFixed(1)}°C`;
};

export const formatPercentage = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `${parseFloat(value).toFixed(0)}%`;
};

export const formatSpeed = (speed) => {
    if (speed === null || speed === undefined) return 'N/A';
    return `${parseFloat(speed).toFixed(1)} km/h`;
};

export const formatPressure = (pressure) => {
    if (pressure === null || pressure === undefined) return 'N/A';
    return `${parseFloat(pressure).toFixed(0)} hPa`;
};
