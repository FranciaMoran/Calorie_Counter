exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/calorie_counter';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test_calorie_counter';
exports.PORT = process.env.PORT || 3000;