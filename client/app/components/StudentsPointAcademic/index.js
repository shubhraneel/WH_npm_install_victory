/* eslint-disable indent */
/**
 *
 * StudentsPointAcademic
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H1 from 'components/H1';
import TitleCard from 'components/TitleCard';
import DropdownSelector from 'components/DropdownSelector';

import PhysicsIcon from 'images/physicsIcon.png';
import ChemistryIcon from 'images/chemistryIcon.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 30px;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 20vw;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  align-items: center;
  justify-items: center;
  margin-top: 50px;
`;

function StudentsPointAcademic(props) {
  const [dept, setDept] = useState(undefined);

  useEffect(() => {
    props.getAcademicResources();
  }, []);

  useEffect(() => {
    if (dept) props.getAcademicResources(dept);
  }, [dept]);

  const departmentArray = [
    { name: 'Electrical', _id: 'Electrical' },
    { name: 'Computer Science', _id: 'Computer Science' },
    { name: 'Electronics', _id: 'Electronics' },
    { name: 'Chemical Engineering', _id: 'Chemical Engineering' },
    { name: 'Biotechnology', _id: 'Biotechnology' },
    { name: 'Aerospace', _id: 'Aerospace' },
  ];

  const semesters = ['3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <Container>
      <H1 size="32" lineheight="30px" marginbottom="30" gradienttext>
        First Year Study Material
      </H1>
      <CardsContainer>
        <a
          href={
            props.academicResources
              ? props.academicResources.filter(e => e.name === 'physics')[0]
                  .link
              : ''
          }
          target="_blank"
        >
          <TitleCard imageSrc={PhysicsIcon} title="Physics Semsester" />
        </a>
        <a
          href={
            props.academicResources
              ? props.academicResources.filter(e => e.name === 'chemistry')[0]
                  .link
              : ''
          }
          target="_blank"
        >
          <TitleCard imageSrc={ChemistryIcon} title="Chemistry Semester" />
        </a>
      </CardsContainer>
      <H1
        size="32"
        lineheight="30px"
        margintop="60"
        marginbottom="30"
        gradienttext
      >
        Department Wise Study Material
      </H1>
      <DropdownSelector
        options={departmentArray}
        placeholder="Choose department"
        onChange={setDept}
      />
      <GridContainer>
        {semesters.map(sem => {
          if (props.academicResources) {
            return (
              <a
                href={
                  props.academicResources.filter(e => e.name === sem)[0].link
                }
                target="_blank"
              >
                <TitleCard
                  height="150px"
                  width="150px"
                  background={!dept ? '#767373' : undefined}
                  title={`Semester ${sem}`}
                />
              </a>
            );
          }
          return (
            <TitleCard
              height="150px"
              width="150px"
              background={!dept ? '#767373' : undefined}
              title={`Semester ${sem}`}
            />
          );
        })}
      </GridContainer>
    </Container>
  );
}

StudentsPointAcademic.propTypes = {
  getAcademicResources: PropTypes.func.isRequired,
  academicResources: PropTypes.array,
};

export default memo(StudentsPointAcademic);
