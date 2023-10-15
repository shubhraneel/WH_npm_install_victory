/**
 *
 * Asynchronously loads the component for NewsCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
