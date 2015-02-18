# ComeSailAway
A Boilerplate project to get a web app and rest service running quickly. It uses Sails.js,
a modular AngularJS structure, CoffeeScript, Gulp, Zurb Foundation 5, Stylus, Jade templates, and Passport.

While its use might be highly specific, I spent days figuring out how to get the above technologies to work together.
## Installation

1. Download the zip
2. Extract to whatever location you chose
3. Run npm install inside directory
4. run bower install inside assets directory

## Usage

run "sails lift" inside project root to start application. That's it.

## Configuration

By default the app is ready to be used. I have provided links for confiuring the following:

### Authentication

This module uses passport which was generated using [Sails generate auth](https://github.com/kasperisager/sails-generate-auth)
Providers such as facebook and google can be added simply by installing the passport modules and adding strategies in passport.js
There are commented out examples in config/passport.js

### Creating a new Angular Module

The existing angular module was generated using [generator-frontend-boiler](https://github.com/jakegibson/generator-frontend-boiler). This allows
for a modular front end structure and makes creating new modules easy. You can view the documentation at the above link for more info.
I did change mod/index.js so that it outputs the module to the views directory.

To make this change for your project (assuming you have the generator installed via npm inside this project):
1. Open node_modules/generator-frontend-boiler/mod/index.js
2. Change the following lines to your views path
``` javascript
  this.dest.mkdir('views/components/' + this.name);
  this.destinationRoot('views/components/' + this.name);
```

After than generating a new modulue is as easy as running
```
  yo frontend-boiler:mod [modName]
```

### Routing
####Rest API
  All of the Sails default rest methods for models should be available by default. To expose custom methods, Just Add a route to config/routes.js
  and map it to your controller. For example:

  api/controllers/FooController:
  ```
    var FooController = {

      doCoolStuff: function (req, res) {
        return res.json(200,{value:"hello world"});
      }
    }
  ```
  Defines a controller method called doCoolStuff in Foo Controller

  config/routes.js:
   ```
     ...
     'post /foo/doCoolStuff': 'FooController.doCoolStuff'
     ...
   ```
  Exposes The controller method via [your_app_url]/foo/doCoolStuff

####Angular JS

  All angular JS routes are defined in views/routes.coffee, and follow the standard angular route provider pattern. The one thing to note is
  the access parameter on the route. This determines whether or not a user must be authenticated to access that route. That logic is
  based on this [tutorial](http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/)

## Contributing

Pull requests are more than welcome/ If you find something that's broken, or want to add a feature go ahead and fork it.

## Credits

Most of this work was done for me. I basically compiled code from many different sources into a project template.
Big thanks to the following users/repos for doing the real work for me:

[SailsJS](https://github.com/balderdashy/sails)
[sails-generate-auth](https://github.com/kasperisager/sails-generate-auth)
[generator-frontend-boiler](https://github.com/jakegibson/generator-frontend-boiler)
[blai/foundation (stylus version of foundation)](https://github.com/blai/foundation)
[sails-generate-gulp-bower] (https://www.npmjs.com/package/sails-generate-gulp-bower)
[sails-generate-views-jade](https://github.com/balderdashy/sails-generate-views-jade)

## License

MIT, Go Nuts
