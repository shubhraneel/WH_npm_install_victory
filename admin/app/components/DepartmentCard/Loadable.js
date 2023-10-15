/**
 *
 * Asynchronously loads the component for DepartmentCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
