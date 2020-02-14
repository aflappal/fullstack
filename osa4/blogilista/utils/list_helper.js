const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const sumReducer = (sum, item) => sum + item;

    return blogs
        .map(b => b.likes)
        .reduce(sumReducer, 0);
};

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length == 0)
        return {};

    const favReducer = (fav, curr) => {
        return curr.likes > fav.likes ? curr : fav;
    };

    const favorite = blogs.reduce(favReducer, blogs[0]);

    // should these properties be removed at some earlier point already?
    delete favorite._id;
    delete favorite.__v;

    return favorite;
};

module.exports = { dummy, totalLikes, favoriteBlog };
