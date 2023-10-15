/**
 *
 * QuickLinksPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import H1 from 'components/H1';
import TitleCard from 'components/TitleCard';
import { Row } from 'antd';
import Spinner from 'components/Spinner';

import KgpIcon from 'images/IIT_Kharagpur_Logo.png';
import MoodleIcon from 'images/moodleIcon.png';
import TsgIcon from 'images/tsgIcon.png';
import ApnadostIcon from 'images/IIT_Kharagpur_Logo.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectQuickLinksPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getQuicklinksStart } from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 50px 30px;

  .grid-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;

    div {
      width: 20%
      min-width: 20rem;
    }
  }

  @media (max-width: 900px) {
    .grid-box {
      width: 70%;
    }
  }

  @media (max-width: 650px) {
    .grid-box {
      width: 95%;
    }
  }
`;

export function QuickLinksPage(props) {
  useInjectReducer({ key: 'quickLinksPage', reducer });
  useInjectSaga({ key: 'quickLinksPage', saga });

  // const links = [
  //   { imageSrc: KgpIcon, title: 'KGP Official Website', link: '' },
  //   { imageSrc: TsgIcon, title: 'TSG Website', link: '' },
  //   { imageSrc: MoodleIcon, title: 'Moodle', link: '' },
  //   { imageSrc: ApnadostIcon, title: 'Aapna dost', link: '' },
  //   { imageSrc: KgpIcon, title: 'KGP Official Website', link: '' },
  //   { imageSrc: TsgIcon, title: 'TSG Website', link: '' },
  //   { imageSrc: MoodleIcon, title: 'Moodle', link: '' },
  //   { imageSrc: ApnadostIcon, title: 'Aapna dost', link: '' },
  // ];

  const { quicklinks, isQuicklinksLoading } = props.quickLinksPage;

  useEffect(() => {
    props.getQuicklinks();
  }, []);

  console.log(props.quickLinksPage);

  return (
    <div>
      <Helmet>
        <title>QuickLinksPage</title>
        <meta name="description" content="Description of QuickLinksPage" />
      </Helmet>
      <Container>
        <H1 size="32" lineheight="30px" marginbottom="60" gradienttext>
          Quick Links
        </H1>
        {isQuicklinksLoading ? (
          <Row justify="center">
            <Spinner />
          </Row>
        ) : (
          <div className="grid-box">
            {quicklinks.map(obj => (
              <a
                href={obj.link}
                target="_blank"
                style={{ width: 'fit-content' }}
              >
                <TitleCard imageSrc={obj.logo} title={obj.name} />
              </a>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

QuickLinksPage.propTypes = {
  // getQuicklinks: PropTypes.func.isRequired,
  // quickLinksPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  quickLinksPage: makeSelectQuickLinksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getQuicklinks: () => dispatch(getQuicklinksStart()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(QuickLinksPage);
