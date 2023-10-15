/**
 *
 * Asynchronously loads the component for EmptyState
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
