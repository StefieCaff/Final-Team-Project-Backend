const { Diary } = require("../../models");

const diaryGetDayEntries = async (req) => {
  try {
    const { date } = req.body;
    const userId = req.user._Id;

    const dayInfo = await Diary.findOne({
      userId,
      entries: {
        $elemMatch: { date },
      },
    });

    if (!dayInfo) {
      return 404;
    }

    const entry = dayInfo.entries.find((entry) => entry.date === date);
    return {
      date,
      dailyRate: entry.dailyRate,
      foodItems: entry.foodItems,
    };
  } catch (err) {
    console.log("Error getting diary", err);
  }
};

module.exports = diaryGetDayEntries;
