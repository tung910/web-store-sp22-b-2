type Iaction = {
	type: String;
	payload: {
		name: String;
		address: String;
		phone: Number;
		quantity: Number;
		buy: String;
		userId: String;
		price: Number;
		color: String;
		size: String;
	};
};
const initial = {
	status: true,
	value: [],
};
const orderReducer = (state = initial, action: Iaction) => {
	switch (action.type) {
		case "ADD_ORDER":
			const newOrder = { ...state, value: [...state.value] };
			return {
				...newOrder,
				value: [
					...newOrder.value,
					{
						name: action.payload.name,
						address: action.payload.address,
						phone: action.payload.phone,
						quantity: action.payload.quantity,
						buy: action.payload.buy,
						userId: action.payload.userId,
						price: action.payload.price,
						color: action.payload.color,
						size: action.payload.size,
					},
				],
			};

		default:
			return state;
	}
};
export default orderReducer;
