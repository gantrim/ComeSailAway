"use strict"
module.exports = (app)->
  app.factory "Home", ["$http", ($http) ->
    getMakes: ->
      $http.get("/api/Vehicle/findUniqueMakes")
      .success (response) ->
        return response

    getModelsForMake: (make) ->
      $http({
        url: "/api/Vehicle/findUniqueModelsByMake",
        method: "GET",
        params: {make: make}
      })
      .success (response) ->
        return response

    getYearsForMakeAndModel: (make, model) ->
      $http({
        url: "/api/Vehicle/findYearsByMakeAndModel",
        method: "GET",
        params: {make: make, model: model}
      })
      .success (response) ->
        return response

    getEndYears: (possibleYears, startYear) ->
      endYears = []
      intStartYear = parseInt(startYear)

      for yearObj in possibleYears
        intYear = parseInt(yearObj.year)
        if intYear >= intStartYear
          endYears.push yearObj
      return endYears

    findVehicles: (make, model, startYear, endYear)  ->
      $http({
        url: "/api/Vehicle/findVehicles",
        method: "GET",
        params: {make: make, model: model, startYear: startYear, endYear: endYear}
      })
  ]

