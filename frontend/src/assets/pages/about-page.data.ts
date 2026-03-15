import {AboutPageData} from '../../app/core/models/about-page.model';

export const ABOUT_PAGE_DATA: AboutPageData = {
  hero: {
    title: 'about.hero.title',
    subtitle: 'about.hero.subtitle'
  },

  mission: {
    title: 'about.mission.title',
    paragraphs: [
      'about.mission.p1',
      'about.mission.p2'
    ]
  },

  platform: {
    title: 'about.platform.title',
    paragraphs: [
      'about.platform.p1'
    ]
  },

  features: {
    title: 'about.features.title',
    items: [
      {
        title: 'about.features.grid.title',
        description: 'about.features.grid.desc'
      },
      {
        title: 'about.features.analytics.title',
        description: 'about.features.analytics.desc'
      },
      {
        title: 'about.features.research.title',
        description: 'about.features.research.desc'
      }
    ]
  },

  disclaimer: {
    title: 'about.disclaimer.title',
    paragraphs: [
      'about.disclaimer.p1'
    ]
  }
};
