const { Food } = require('../../models');

const diaryAllFoodsSearch = async (req, res) => {
    try {
        const title = req.params.title;
        const page = 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const data = await Food.find({ title: { $regex: title, $options: 'i' } })
            .skip(offset)
            .limit(limit);
        return data;
    } catch (err) {
        console.error(err);
        throw new Error("Error searching food" + err.message)
    }
};

module.exports = diaryAllFoodsSearch;
