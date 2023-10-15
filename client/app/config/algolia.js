import algoliasearch from 'algoliasearch';

const ALGOLIA_ID = '99S8RIU266';
const ALGOLIA_ADMIN_KEY = 'd10c0960a7dd27cc8e5ed12b8b20480e';

const algoliaClient = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

export default algoliaClient;
