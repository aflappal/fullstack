const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const sumReducer = (sum, item) => sum + item;

    return blogs
        .map(b => b.likes)
        .reduce(sumReducer, 0);
};

module.exports = { dummy, totalLikes };
