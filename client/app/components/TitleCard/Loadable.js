/**
 *
 * Asynchronously loads the component for TitleCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
