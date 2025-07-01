

export function EmptyFieldRemover(data) {
    const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );

    return cleanedData;
}