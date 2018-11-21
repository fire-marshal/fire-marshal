# "Fire Marshal"

```
______ _           ___  ___               _           _
|  ___(_)          |  \/  |              | |         | |
| |_   _ _ __ ___  | .  . | __ _ _ __ ___| |__   __ _| |
|  _| | | '__/ _ \ | |\/| |/ _` | '__/ __| '_ \ / _` | |
| |   | | | |  __/ | |  | | (_| | |  \__ \ | | | (_| | |
\_|   |_|_|  \___| \_|  |_/\__,_|_|  |___/_| |_|\__,_|_|
```

_I'm still looking for better name for the project_

:palm_tree: :deciduous_tree: :fire: :deciduous_tree: :house_with_garden: :fire: :deciduous_tree: :deciduous_tree: :deciduous_tree: :running: :house: :deciduous_tree: :school: :blue_car: :deciduous_tree:  :fire_engine: :deciduous_tree: :deciduous_tree:  :palm_tree:

## What's new

:scroll: [changelog](/../../blob/master/CHANGELOG.md)

## About The project

The main project of NASA Space App Challenge [Spot That Fire!](https://2018.spaceappschallenge.org/challenges/volcanoes-icebergs-and-asteroids-oh-my/real-time-fire-app/details) 

I thought about that kind of project for long and I'm so happy that NASA proposed to implement it. 
And I hope it would be useful for the others and I'm always open for contribution to it.

# The Space App Challenge

**NASA:**
> Build a crowdsourcing tool for citizens to contribute to early detection, verification, tracking, visualization, and notification of wildfires.
[more](https://2018.spaceappschallenge.org/challenges/volcanoes-icebergs-and-asteroids-oh-my/real-time-fire-app/details)

# Author

- Eugene Krevenets ([@hyzhak](https://github.com/hyzhak))

## Plans
_sorted by priority_

- **Make app accessible for developers**
  - Provide a brief description of the app or solution goal and design – what does it do and how
  - Offer the description (a story) of why this app or solution is important and what insights or future capabilities it provides with regard to fighting wildfires
- **Make app mobile friendly**
  - web
  - mobile app (react native) [#18](/../../issues/18)
- **Track and visualize fire**
  - stream of fires near my [#4](/../../issues/4)
  - realtime map [#5](/../../issues/5)
  - realtime stream [#6](/../../issues/6)
- **Report a fire**
  - I see a fire (+ few categories of wildness) + location, text message, attach photo [#9](/../../issues/9)
  - send tweet with images, message and location about fire [#7](/../../issues/7)
  - send fb message (bot) [#8](/../../issues/8)
  - share from other sources 
- **Notify communities at risk**
  - subscribe on fire alarm near your [#10](/../../issues/10)
  - give API to subscribe to fire incidents
- **Build mashups**
  - merge with NASA data (Leverage NASA state-of-the-art technology, including: near-real-time fire database and satellite image processing APIs accessible through the NASA OpenNEX App Store) [#11](/../../issues/11)
  - add information about weather
  - listen twitter, instagram, fb and show related warnings
- **Community/Social**
  - create user's profile [#12](/../../issues/12)
  - like each other messages [#13](/../../issues/13)
  - ask to proof fire alerts if user is near
  - report on message
- **Verify and screen fire reports**
  - validate crowd data
- **Gamification**
  - scores for successful actions  [#14](/../../issues/14)
  - badges for reported fires, for saved people and etc
  - could become local "fire marshal" if one is good lifeguard
  - ask about fire activity near you and give rewards on help
- **Analysis and prediction**
  - analyze and predict fire based on other data (weather)
- **Other**
  - localization [#15](/../../../issues/15)
  
  
## Architecture

### Containers
- [docker, docker-compose](http://docker.io)
- [nginx](https://www.nginx.com/)
- [postgresql](https://www.postgresql.org/)

### Server
- [koa](https://koajs.com)
- [node.js](https://nodejs.org/)
- [standard.js](https://standardjs.com)

### Static
- [immutable.js](https://facebook.github.io/immutable-js/)
- [parcel](https://parceljs.org)
- [react](https://reactjs.org/)
- [redux](http://redux.js.org)
- [reselect](https://github.com/reduxjs/reselect) support of [reselect-tool](https://github.com/skortchmark9/reselect-tools)
- [standard.js](https://standardjs.com)

## Usage

### Bump project version

```bash

$ ./bin/bump-version.sh

```

## Contribution / How to help

If you would like to start somewhere there good [start point issues](https://github.com/fire-marshal/fire-marshal/labels/good%20first%20issue)

If you can't find anything there you can pick [something else](https://github.com/fire-marshal/fire-marshal/issues). 

### Steps to contribute

- choose issue
- try to understand issue
- ask questions in comments of chosen issue
- propose your solution (before implement it) in comments to issue
- once we agreed about it please clone project, create branch (`feature/<feature-id>-<feature-name>`), make commits there, push Pull Request (PR) and description there what and how have you solved
- ask me for review :)
- thank you for your help!
