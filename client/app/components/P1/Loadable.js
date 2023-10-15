/**
 *
 * Asynchronously loads the component for P1
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
