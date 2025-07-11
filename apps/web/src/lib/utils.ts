export function notNullish<T>(
	value: T | null | undefined,
	name?: string,
): NonNullable<T> {
	if (value === null || value === undefined) {
		throw new Error(`${name ?? "Given value"} is ${value}`);
	}
	return value;
}
