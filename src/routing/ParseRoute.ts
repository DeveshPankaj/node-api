export interface Iurl {
	controller: string
	params: any
}

export function ParseRoute (uri: string): Iurl {
	return {
		controller: 'Login',
		params: {}
	}
}

