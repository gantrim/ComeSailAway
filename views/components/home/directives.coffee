module.exports = (app)->

  app.directive('homeBanner', ()->
    
    (scope,element, attrs) -> 
      element.bind 'load', ()->
        document.querySelector('.homeRight').style.height = document.querySelector('.yeti').offsetHeight + 'px'
     
  )