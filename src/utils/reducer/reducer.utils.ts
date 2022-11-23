export type ActionWithPayload<T, P> = {
	type: T;
	payload: P;
};

export type Action<T> = {
	type: T;
};

// Function overloading - Making multiple function with the same name with diferent params

export function createAction<T extends string, P>(
	type: T,
	payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
	type: T,
	payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
	return { type, payload };
}
