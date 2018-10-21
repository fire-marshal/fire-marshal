import React from 'react'
import { connect } from 'react-redux'

import MainStreamItem from './main-stream-item'

const MainStream = ({ items }) => (
  <div className='container'>
    {items.map(item => <MainStreamItem key={item.id} item={item} />)}
  </div>
)

MainStream.displayName = 'MainStream'

export default connect(
  (state, props) => ({
    // TODO: should get from redux
    items: [{
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
      createdAt: new Date('Aug. 17, 2013'),
      power: 0.9,
      tags: ['rim fire', 'Stanislaus National Forest', 'California'],
      author: 'jez',
      location: {
        radius: 1,
        center: [38.25, -120]
      }
    }, {
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
      createdAt: new Date('September 2, 2018'),
      power: 0.8,
      tags: ['Museum'],
      author: 'Joalpe',
      location: {
        radius: 1,
        center: [-22.905833, -43.226111]
      }
    }]
  }),
  (dispatch, props) => ({})
)(MainStream)
