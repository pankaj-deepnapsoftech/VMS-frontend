

export const dateFormater = (iso) => {
    const date = new Date(iso);
    const options = { year: 'numeric', month: 'long' };
    const formatted = date.toLocaleDateString('en-IN', options);
    return formatted
}