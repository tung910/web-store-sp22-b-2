type Ioptions = {
	name: String;
	value: [String];
};
interface products {
	_id?: String;
	key?: React.Key;
	title: String;
	price: Number;
	saleoff: Number;
	options?: Ioptions[];
	image: String;
	albums?: String[];
	slug: String;
}
export default products;
