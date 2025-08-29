export default function calculatePostTime(lastdata) {
    const pastDate = new Date(lastdata);
    const currentDate = Date.now();
    const timeDifference = currentDate - pastDate;

    const sec = Math.floor(timeDifference / 1000);
    const min = Math.floor(timeDifference / 60000);
    const hour = Math.floor(timeDifference / 3600000);
    const day = Math.floor(timeDifference / 86400000);

    if (day > 0) return `${day} day${day > 1 ? 's' : ''}`;
    if (hour > 0) return `${hour} hr${hour > 1 ? 's' : ''}`;
    if (min > 0) return `${min} min`;
    return `${sec} sec`;
}

