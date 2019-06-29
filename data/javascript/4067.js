var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    addExercise(exercise) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_EXERCISE,
            exercise
        });
    },
    addProgram(program) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_PROGRAM,
            program
        });
    },
    addArticles(article) {
        AppDispatcher.handleViewAction({
            type: 'ADD_ARTICLE',
            article
        })
    },
    getArticles() {
        AppDispatcher.handleViewAction({
            type: 'GET_ARTICLE'
        })
    },
    getExercises() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_FULL_EXERCISES
        });
    },
    getExercise(id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_EXERCISE,
            id
        });
    },
    // getFoods() {
    //     AppDispatcher.handleViewAction({
    //         type: ActionTypes.GET_FOODS
    //     });
    // }
};