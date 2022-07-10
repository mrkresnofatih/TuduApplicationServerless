export const generateTaskId = (): string => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()
    return `${9999 - year}${99 - month}${99 - date}${99 - hour}${99 - minute}${99 - second}`
}