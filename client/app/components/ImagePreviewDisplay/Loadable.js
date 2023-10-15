/**
 *
 * Asynchronously loads the component for ImagePreviewDisplay
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
