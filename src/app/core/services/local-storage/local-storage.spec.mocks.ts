export const mockLocalStorage = () => {
	const getItemMock = jest.fn();
	const setItemMock = jest.fn();
	const removeItemMock = jest.fn();

	beforeEach(() => {
		Storage.prototype.getItem = getItemMock;
		Storage.prototype.setItem = setItemMock;

		Storage.prototype.removeItem = removeItemMock;
	});

	afterEach(() => {
		getItemMock.mockRestore();
		setItemMock.mockRestore();
		removeItemMock.mockRestore();
	});

	return { getItemMock, setItemMock, removeItemMock };
};
