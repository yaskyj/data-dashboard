'use strict';
angular.module('dataDashboard')
  .controller('KeywordCloudCtrl', ['$scope', 'Keyword',
    function($scope, Keyword) {
      //Initialize variables
      var keywordArr,
          keywordCount,
          keywordCountArr = [],
          keywordTopTen;
      var updateKeywords = function() {
        //Recreates the array with just the words in the message. This also strips all non word characters
        //from the string and makes everything lowercase in order to count properly later
        keywordArr = _.map(keywordArr, function(value) {
          return value.msg.replace(/[&\/\\#,+()$~%.'":*?<>_{}]/g,'').toLowerCase();
        });
        //Splits each string into individual words
        keywordArr = _.map(keywordArr, function(value) {
          return value.split(" ");
        });
        //Flattens the array to one level
        keywordArr = _.flatten(keywordArr);
        //Creates the object containing words by count
        keywordCount = _.countBy(keywordArr, function(value) {
          return value;
        });
        //Create sortable array of words
        _.forEach(keywordCount, function(value, key) {
          var tempObj = {};
          tempObj.text = key;
          tempObj.weight = value;
          keywordCountArr.push(tempObj);
        });
        //Descending sort of keywords by key word count
        keywordCountArr = keywordCountArr.sort(function(a, b) {
          return b.weight - a.weight;
        });
        //Creates an array of the top ten keywords by count
        keywordTopTen = keywordCountArr.slice(0, 10);
        //Creates the word cloud on the keyword-cloud div
        $('#keyword-cloud').jQCloud(keywordTopTen, {
          width: 1170,
          height: 350,
          steps: 8,
          autoResize: true
        });
      };
      //Query to get all keywords from API
      Keyword.query(function(data) {
        if (data) {
          keywordArr = data;
          updateKeywords();
        }
        else {
          console.log('There was an error!');
        }
      });

    }]);