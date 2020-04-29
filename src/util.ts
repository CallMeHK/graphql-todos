const removeKey = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> =>
    (Object.entries(obj).reduce(
        (acc: Partial<T>, current) => ({
            ...acc,
            ...(current[0] !== 'b' && { [current[0]]: current[1] }),
        }),
        {}
    ) as unknown) as Omit<T, K>

const F = {
    removeKey,
}

export { F }
