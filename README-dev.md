# CandV ('kand-ve) Mobile Development Notes
Some tips for developers

## WARNING!
Make sure that you NEVER commit any private keys into the github repo.  The following file(s) should be cleaned before commit:
* /www/fhconfig.js

## About the Source Code
Here are some tips about working with this source code

### Using FH Sync API vs the CandV REST API
You can swap out the default use of the CandV REST API and utilize Feed Henry Sync API. 
This takes advantage of the features in the Red Hat Mobile Application Platform (MAP)
and eliminates the need to run a CandV server.  It also give the app an added benefit 
of [online/offline sync][2] support which doesn't exist when using the CandV REST API.

The steps are as follows:
 * TBD - still working on the code for this feature

## Generating/Regenerating Assets
You can generate (or regenerate) all the icon sizes for this app with the following commands
> ionic resources --splash
> ionic resources --icon

## Building
> ionic build

## Running

### Run in Emulator
> ionic emulate ios

> ionic emulate android

### Run in Labs via Browser (side by side)
> ionic serve --lab

### Run on Device
If you are building for iOS, you’ll need an Apple Developer account, open XCode from platforms/ios/ and do your testing.
> cd platforms/ios

> open candv-ionic.xcodeproj/

If building for Android plug it in, and run
> ionic run android

## Debugging
(Note that the cordova access to the clipboard doesn't work in the web browser - use emulators)

> ionic serve -c 

## Design/Architecture Diagrams
You can find them in the .design folder of this project.

## Screenshots
Take screenshots with fastlane put them in the .screens folder.  [See more here][1].


[1]: https://fastlane.tools/
[2]: http://docs.feedhenry.com/v3/guides/sync_service.html
