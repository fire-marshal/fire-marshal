import Immutable from 'immutable'

import { createReducer } from './_helper'

import config from '../config'

import { fetchActionSimplified } from '../async-queue/fetch-action'

import { prepareUrl } from '../requests/api-url-processor'

export const APPEND_ALERT = 'ALERT:APPEND'
export const REMOVE_ALERT = 'ALERT:REMOVE'

export const EVIDENCES_REQEUST = 'EVIDENCES:REQUEST'
export const EVIDENCES_RECEIVED = 'EVIDENCES:RECEIVED'
export const EVIDENCES_ERROR = 'EVIDENCES:ERROR'

export const fetchEvidences = fetchActionSimplified({
  getUrl: ({ lat, long }) => prepareUrl(config.evidences.api_url, {
    lat, long
  }),

  actions: [EVIDENCES_REQEUST, EVIDENCES_RECEIVED, EVIDENCES_ERROR]
})

// TODO: data structure
// it would be better to store information about some bigger events or related (connected)
//
export default createReducer(
  // TODO: should replace it with empty list
  // source of data https://en.wikipedia.org/wiki/Conflagration

  Immutable.fromJS([{
    id: 2,
    title: 'Fire at Museu Nacional',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Fire_at_Museu_Nacional_05.jpg/640px-Fire_at_Museu_Nacional_05.jpg'
    },
    when: {
      exactlyAt: new Date('September 2, 2018')
      // TODO: we definitely could have not exact time here
      // "I see it half an hour ago"
    },
    details: 'nothing',
    createdAt: new Date('September 2, 2018'),
    power: 0.8,
    tags: ['Museum'],
    author: 'Joalpe',
    location: {
      radius: 1,
      center: [-22.905833, -43.226111]
    }
  }, {
    id: 3,
    title: 'Tubbs Fire',
    img: null,
    when: {
      exactlyAt: new Date('October 8, 2017')
      // TODO: we definitely could have not exact time here
      // "I see it half an hour ago"
    },
    details: 'The Tubbs Fire was the most destructive wildfire in California history,[4] burning parts of Napa, Sonoma, and Lake counties in Northern California during October 2017, and affecting the city of Santa Rosa the most. It was one of more than a dozen large fires that broke out in early October and were simultaneously burning in eight Northern California counties in what was called the "Northern California firestorm."[6] By the time of its containment on October 31, the fire was estimated to have burned 36,810 acres (149 km2),[7][8] and at least 22 people had been killed in Sonoma County by the fire.',
    createdAt: new Date('October 8, 2017'),
    power: 0.7,
    tags: ['California'],
    author: 'john don',
    location: {
      radius: 1,
      center: [38.25, -120]
    }
  }, {
    id: 1,
    title: 'The Rim Fire in the Stanislaus National Forest near in California began',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/The_Rim_Fire_in_the_Stanislaus_National_Forest_near_in_California_began_on_Aug._17%2C_2013-0004.jpg/640px-The_Rim_Fire_in_the_Stanislaus_National_Forest_near_in_California_began_on_Aug._17%2C_2013-0004.jpg'
    },
    when: {
      exactlyAt: new Date('Aug. 17, 2013')
      // TODO: we definitely could have not exact time here
      // "I see it half an hour ago"
    },
    details: 'nothing',
    createdAt: new Date('Aug. 17, 2013'),
    power: 0.9,
    tags: ['rim fire', 'Stanislaus National Forest', 'California'],
    author: 'jez',
    location: {
      radius: 1,
      center: [38.25, -120]
    }
  }]),
  {
    [APPEND_ALERT]: (state, action) => state,
    [REMOVE_ALERT]: (state, action) => state
  }
)
