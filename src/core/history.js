/**
 * @file history对象
 * @author mengchen <sisimengchen@gmail.com>
 */
import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

const historyMode = process.env.TARGET === 'githubpages' ? 'hashHistory' : 'browserHistory';

const gtag = 'UA-138570751-1';

const createHistory = historyMode === 'hashHistory' ? createHashHistory : createBrowserHistory;

const history = createHistory({
  getUserConfirmation: (message, callback) => callback(true),
  forceRefresh: false
});

const unlisten = history.listen((location, action) => {
  window.gtag &&
    window.gtag('config', gtag, {
      page_path: window.location.pathname,
      page_location: window.location.href
    });
  console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
  console.log(`The last navigation action was ${action}`);
});

const unblock = history.block((location, action) => '测试文案');

export default history;
