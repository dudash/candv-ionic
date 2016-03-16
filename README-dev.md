# CandV ('kand-ve) Mobile Development Notes
Some tips for developers

## WARNING!
Make sure that you NEVER commit any private keys into the github repo.  The following file(s) should be cleaned before commit:
* /www/fhconfig.js
* 

## Generating/Regenerating Assets
You can generate all the icon sizes for this app with the following commands
> ionic resources --splash
> ionic resources --icon

## Building
> ionic build

## Run in Emulator
> ionic emulate ios
> ionic emulate android

## Run in Labs via Browser (side by side)
> ionic serve --lab

## Run on Device
If you are building for iOS, you’ll need an Apple Developer account, open XCode from platforms/ios/ and do your testing.
> cd platforms/ios
> open candv-ionic.xcodeproj/

If building for Android plug it in, and run
> ionic run android

## Debugging
> ionic serve -c 

## Design/Architecture Diagrams
You can find them in the .design folder of this project.

## Screenshots
Take screenshots with fastlane put them in the .screens folder.  [See more here][1].


[1]: https://fastlane.tools/
