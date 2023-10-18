const { Schema, model } = require('mongoose');

const calculatorInputsSchema = new Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
    },
    age: {
      type: Number,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    originalWeight: {
      type: Number,
    },
    currentWeight: {
      type: Number,
    },
    desiredWeight: {
      type: Number,
    },
    heightFeet: {
      type: Number,
    },
    heightInch: {
      type: Number,
    },
    currentWeightLbs: {
      type: Number,
    },
    desiredWeightLbs: {
      type: Number,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    unitOfMeasure: {
      type: String,
      required: true,
    },
  }
);

const calculatorEntrySchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    calculatorEntry: [calculatorInputsSchema],
  }
);

const calculatorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    calculatorEntries: [calculatorEntrySchema],
  },
  { versionKey: false, timestamps: true }
);

const Calculator = model('calculator', calculatorSchema);

module.exports = {
  Calculator,
};