export default function convertTime(datetime) {
    return datetime.toLocaleDateString('cn', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}