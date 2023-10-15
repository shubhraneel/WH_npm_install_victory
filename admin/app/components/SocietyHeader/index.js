/**
 *
 * SocietyHeader
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, Tag, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import H1 from 'components/H1';
import P1 from 'components/P1';

const { TextArea } = Input;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 4px 4px 12px rgba(123, 115, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  padding-right: 20px;

  .image-wrap {
    flex: 1;
    margin-right: 20px;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .title {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

function SocietyHeader(props) {
  const TagColors = {
    Technology: 'red',
    SocialAndCulture: 'blue',
    StudentWelfare: 'green',
    SportsAndGames: 'yellow',
  };

  const [editDescriptionActive, setEditDescriptionActive] = useState(false);
  const [newDescription, setNewDescription] = useState(undefined);

  return (
    <Container>
      <div className="image-wrap">
        <img src={props.coverImage} alt="Cover" />
      </div>
      <div className="title">
        <H1 size="24" marginbottom="15">
          {props.name}
        </H1>
        {!editDescriptionActive ? (
          <P1 marginbottom="15">{props.description}</P1>
        ) : (
          <TextArea
            rows={4}
            value={newDescription}
            autofocus
            autoSize={{ maxRows: 4 }}
            onChange={e => setNewDescription(e.target.value)}
            style={{ marginBottom: '15px' }}
          />
        )}
        {props.userRole === 'societyOfficial' ? (
          <Button
            type="dashed"
            shape="round"
            icon={<EditOutlined />}
            style={{ marginBottom: '20px' }}
            onClick={() => {
              if (!editDescriptionActive) {
                setEditDescriptionActive(true);
                setNewDescription(props.description);
              } else {
                props.updateDescription(newDescription);
                setEditDescriptionActive(false);
              }
            }}
          >
            {editDescriptionActive ? 'Save Description' : 'Edit Description'}
          </Button>
        ) : null}

        <Tag color={TagColors[props.category]}>{props.category}</Tag>
      </div>
    </Container>
  );
}

SocietyHeader.propTypes = {
  coverImage: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  userRole: PropTypes.string,
  updateDescription: PropTypes.func.isRequired,
};

export default memo(SocietyHeader);
