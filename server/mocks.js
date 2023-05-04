import casual from "casual";

export const mocks = {
    Check: () => ({
        id: casual.uuid,
        name: () => casual.title,
        checked: () => casual.boolean,
    }),
    Task: () => ({
        id: casual.uuid,
        title: () => casual.title,
        checklist: [...new Array(casual.integer(1, 10))]
    }),
    TaskList: () => ({
        tasks: [...new Array(casual.integer(5, 10))]
    }),
};