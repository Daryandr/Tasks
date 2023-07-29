export type Task = {
    id: string,
    title: string,
    checklist: [Check]
}

export type Check = {
    id: string,
    name: string,
    checked: boolean
}