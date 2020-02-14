const listHelper = require('../utils/list_helper.js');

test('dummy returns 1', () => {
    const blogs = [];

    const result = listHelper.dummy();
    expect(result).toBe(1);
});
