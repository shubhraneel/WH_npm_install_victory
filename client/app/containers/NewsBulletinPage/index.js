/**
 *
 * NewsBulletinPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Row } from 'antd';
import Spinner from 'components/Spinner';
import MasterHeaderBackground from 'components/MasterHeaderBackground';
import CommonHeader from 'components/CommonHeader';
import NewsCard from 'components/NewsCard';

import NewsBulletinIllustration from 'images/news-bulletin-header.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNewsBulletinPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getNewsStart } from './actions';

export function NewsBulletinPage(props) {
  useInjectReducer({ key: 'newsBulletinPage', reducer });
  useInjectSaga({ key: 'newsBulletinPage', saga });

  useEffect(() => {
    props.getNews();
  }, []);

  const { news, isNewsLoading } = props.newsBulletinPage;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: '2' }}>
      <Helmet>
        <title>NewsBulletinPage</title>
        <meta name="description" content="Description of NewsBulletinPage" />
      </Helmet>
      <MasterHeaderBackground secondary />
      <CommonHeader
        title="Latest News And Updates"
        description="Amet venenatis urna cursus eget. Sed euismod nisi porta lorem mollis
            aliquam ut porttitor. Neque laoreet suspendisse interdum consectetur
            libero. Tellus elementum sagittis vitae et leo duis ut. Vitae
            ultricies leo integer malesuada nunc vel risus commodo"
        imageSrc={NewsBulletinIllustration}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '30px',
          gap: '30px',
          marginTop: '150px',
        }}
      >
        {isNewsLoading ? (
          <Row
            justify="center"
            style={{ width: '100%', height: '50vh', paddingTop: '10vh' }}
          >
            <Spinner />
          </Row>
        ) : (
          news.map(obj => <NewsCard {...obj} />)
        )}
      </div>
    </div>
  );
}

NewsBulletinPage.propTypes = {
  getNews: PropTypes.func.isRequired,
  newsBulletinPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newsBulletinPage: makeSelectNewsBulletinPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNews: () => dispatch(getNewsStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewsBulletinPage);
