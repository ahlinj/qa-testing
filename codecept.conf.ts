import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://martin-kregar.celtra.com',
      show: false,
      browser: 'chromium',
    }
  },
  include: {
    I: './steps_file'
  },
  multiple: {
    parallel: {
      browsers: [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' }
      ],
      chunks: 3
    }
  },
  name: 'qa-testing'
};