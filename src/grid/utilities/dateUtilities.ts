const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

const getMinForecastDateRaw = () => {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}

export const getMinForecastDateFormatted = () => {
    return formatDateToYyyyMmDd(getMinForecastDateRaw());
};

const formatDateToYyyyMmDd = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const minDateValidator = (value: string) => {
    if (!dateRegex.test(value)) {
        return false;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return false;
    }

    date.setHours(0, 0, 0, 0);
    const minDate = getMinForecastDateRaw();

    return date >= minDate;
};