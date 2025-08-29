export default function extractDateFromISOString(isoString) {
    const months = ["jan", "feb", "mar", "april", "may", "jun", "july", "aug", "setp", "octo", "nov", "dec"]
    const date = new Date(isoString);

    const year = date.getUTCFullYear();
    const month = months[date.getUTCMonth()];
    const day = date.getDate();

    return `${day}-${month}-${year}`

}