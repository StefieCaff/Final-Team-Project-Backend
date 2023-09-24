const { Calculator } = require("../../models");

const saveCurrentCalculator = async (req) => {
  const { height,  age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType, originalWeight } = req.body;
  try {
 const stats = [height, age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType, originalWeight];
console.log(stats)
    
    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }

    const userId = req.session.userId;
    // Check for an existing diary add one if it doesn't exist yet
    const CalcFindRec = await Calculator.findOne({ userId });
    if (!CalcFindRec) {
     const newCal = new Calculator({
        userId,height, age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType, originalWeight: currentWeight  
      });
      await newCal.save();
      return 201
    }
    const origWeight = CalcFindRec.originalWeight
      const newCal = await new Calculator({
      userId, height, age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType, originalWeight: origWeight
      });
        await newCal.save();
        return 201
  } catch (err) {
    // Throw an error with a meaningful message
    console.error(err);
    throw new Error("Error Adding Calculator: " + err.message);
  }
};

module.exports = saveCurrentCalculator;