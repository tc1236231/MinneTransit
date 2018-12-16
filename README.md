# MinneTransit
MinneTransit is an IOS/Android application that helps the user in their Twin Cities Metro Transit experience. The App can be used to track busses for specific stops or routes. Additionally, the user can choose to send notifications to alert them whenever a bus is a certain time away from the chosen stop. This application will help a user know when they need to leave a location in order to make their bus.
This App was built using the ionic programming language and is compatible with any IOS or Android device.
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

