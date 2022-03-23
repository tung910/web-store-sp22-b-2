import { create } from "../api/products";

const handleReducer = (state: any, action: any) => {
	switch (action.type) {
		case "LOADING":
			return { ...state, loading: action.payload };
		case "SET_DATA":
			return { ...state, [action.brand]: [...action.payload] };
		case "CHANGE_MULTI":
			return { ...state, [action.brand]: [...action.payload] };
		case "CHANGE":
			return { ...state, [action.brand]: [...action.payload] };
		case "SUBMIT":
			console.log({ action, state });
			const createProduct = async () => {
				await create(action.payload.data);
			};
			createProduct();
			return {
				...state,
				loading: action.loading,
				toggle: action.toggle,
				color: action.payload.color,
				size: action.payload.size,
			};
		case "TOGGLE":
			return { ...state, toggle: action.toggle };
		default:
			break;
	}

	return state;
};
export default handleReducer;