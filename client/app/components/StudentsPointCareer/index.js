/* eslint-disable indent */
/**
 *
 * StudentsPointCareer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import TitleCard from 'components/TitleCard';

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  align-items: center;
  justify-items: center;
  margin-top: 50px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 30px;
`;

function StudentsPointCareer(props) {
  useEffect(() => {
    props.getCareerResources();
  }, []);

  const fields = [
    'SDE',
    'Finance',
    'Quant',
    'Data Science',
    'Consulting',
    'ML',
    'Core',
    'Research',
  ];

  return (
    <Container>
      <H1 size="32" lineheight="30px" marginbottom="30" gradienttext>
        Field Wise Reference Material
      </H1>
      <GridContainer>
        {props.careerResorces
          ? fields.map(field => (
              <a
                href={
                  props.careerResorces.filter(e => e.name === field)[0].link
                }
                target="_blank"
              >
                <TitleCard height="150px" width="150px" title={field} />
              </a>
            ))
          : null}
      </GridContainer>
    </Container>
  );
}

StudentsPointCareer.propTypes = {
  getCareerResources: PropTypes.func.isRequired,
  careerResorces: PropTypes.array,
};

export default memo(StudentsPointCareer);
