# MinneTransit
MinneTransit is an IOS/Android application that helps the user in their Twin Cities Metro Transit experience. The App can be used to track busses for specific stops or routes. Additionally, the user can choose to send notifications to alert them whenever a bus is a certain time away from the chosen stop. This application will help a user know when they need to leave a location in order to make their bus.
This App was built using the ionic programming language and is compatible with any IOS or Android device.

## Features Available

### Home Page

This is where the user can put in a stop number and see the routes passing through that stop along with their schedules. For a stop, the user can filter for certain routes only, bookmark that stop for easy access and use later, and set notifications.

### Map Page

For orientation and stop search, the Map page features a map (centered on the user's physical location if location services is enabled) and queried bus stops as markers. The Map page is connected to a Search page, where the user can search for stops by their names. The results are then displayed as markers on the map, and users can tap on them for stop cards to be created for the corresponding stops in the Home page.

### Favorites Page

Similar to the Map page, the Favorites page allows for stop name searching via the Search page, and saves the results to a list of bookmarked stops. If any of the saved stops were selected, a card for it will be created in the Home page.

# Installation and Development Information
## Prerequisites
NodeJS (Use Mac): 
```
brew install npm
```

Ionic Cordova: 
```
npm install -g ionic cordova
```

## Installing
Clone the Repo and navigate to the newly created folder
```
git clone https://github.com/tc1236231/MinneTransit.git
```

```
cd MinneTransit
```

To install all the dependencies for the project run:

```
npm install
```

# Deploying

First, you will need to add the desired platform to the project. You can do this by running

```
ionic cordova platform add [platform]
```

Download and use Xcode 10

To build:

```
ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"
```

When building the app in XCode, go to the xcode_proj_file folder and refer to the build settings.

# Built with:
Ionic

Visual Studio Code

[MetroTransit API](http://svc.metrotransit.org)

# Authors
[Tom Ehrsam](https://github.com/tehrsam): tehrsam@macalester.edu

[Thy Nguyen](https://github.com/thytng): tnguye10@macalester.edu

[Richard Tian](https://github.com/tc1236231): ctian@macalester.edu

# Acknowledgements
Many thanks to [Brett Jackson](https://github.com/bretjackson) for his mentorship and support throughout this project.

