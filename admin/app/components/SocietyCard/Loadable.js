/**
 *
 * Asynchronously loads the component for SocietyCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
