/**
 *
 * Asynchronously loads the component for EventTimeline
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
