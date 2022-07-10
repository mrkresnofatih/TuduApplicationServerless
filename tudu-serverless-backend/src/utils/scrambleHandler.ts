export const scramble = (data: string): string => {
    return `scramble!${data}`
}

export const compare = (data: string, scrambled: string): boolean => {
    const dataScrambled = scramble(data)
    return (dataScrambled === scrambled)
}
