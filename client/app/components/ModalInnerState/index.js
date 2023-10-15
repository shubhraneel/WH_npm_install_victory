/**
 *
 * ModalInnerState
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icons from 'components/IconBox';
import H1 from 'components/H1';
import P1 from 'components/P1';
import history from 'utils/history';
import PrimaryButton from 'components/PrimaryButton';

const Container = styled.div`
  height: ${props => (props.height ? props.height : 'fit-content')} !important;
  width: ${props => (props.width ? props.width : '100%')} !important;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 20px;
  padding-bottom: ${props =>
    props.paddingbottom ? props.paddingbottom : '20'}px !important;
  margin-top: ${props =>
    props.margintop ? props.margintop : '0'}px !important;
`;

function ModalInnerState(props) {
  return (
    <Container
      height={props.height}
      width={props.width}
      paddingbottom={props.paddingbottom}
      margintop={props.margintop}
    >
      {props.icon ? <Icons src={props.icon} size="120px" /> : null}
      {props.heading ? (
        <H1
          textAlign="center"
          size={props.headingsize ? props.headingsize : '25'}
          margintop={props.headingmargintop ? props.headingmargintop : '40'}
          marginbottom={
            props.headingmarginbottom ? props.headingmarginbottom : '24'
          }
        >
          {props.heading}
        </H1>
      ) : null}
      {props.subheading ? (
        <P1
          textAlign="center"
          size={props.subheadingsize ? props.subheadingsize : '16'}
          marginbottom={
            props.subheadingmarginbottom ? props.subheadingmarginbottom : '0'
          }
          margintop={
            props.subheadingmargintop ? props.subheadingmargintop : '0'
          }
        >
          {props.subheading}
        </P1>
      ) : null}
      {props.link ? (
        <PrimaryButton onClick={() => history.replace(props.link)}>
          {props.btnText}
        </PrimaryButton>
      ) : null}
    </Container>
  );
}

ModalInnerState.propTypes = {
  height: PropTypes.string,
  paddingbottom: PropTypes.string,
  margintop: PropTypes.string,
  headingmargintop: PropTypes.string,
  subheadingmargintop: PropTypes.string,
  subheadingsize: PropTypes.string,
  headingmarginbottom: PropTypes.string,
  subheadingmarginbottom: PropTypes.string,
  subheading: PropTypes.string,
  headingsize: PropTypes.string,
  width: PropTypes.string,
  heading: PropTypes.string.isRequired,
  link: PropTypes.string,
  btnText: PropTypes.string,
  icon: PropTypes.any,
};

export default memo(ModalInnerState);
