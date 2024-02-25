import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {

  testDir: './tests',



  expect: {

    timeout: 10000

  },

  reporter: [ ['html', { open: 'on-failure'}], ['list'] ], //reporters

  use: {
    

    
    headless: false, //headed, test always opens in browser window

    trace: 'on-first-retry',
video: 'retain-on-failure' //for video in case Test case fails

  },

};

export default config;

