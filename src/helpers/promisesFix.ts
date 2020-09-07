
export const resolveAwait = async (promise: Function) => {
    await promise()
    return await promise()
}


