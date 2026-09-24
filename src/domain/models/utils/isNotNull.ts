export const isNotNull = (value: unknown): value is Record<string, unknown> => {
    return value != null;
};
