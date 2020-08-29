import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link as Hyperlink } from 'react-router-dom';
import { event } from 'react-ga';

const Tab = ({ href, header, text, color }) => {
  const dispatch = useDispatch();

  const save = () => {
    event({ category: 'category-selection', action: 'click', href });
    dispatch({ type: 'ADD_CATEGORY', category: href });
  };

  return (
    <Hyperlink to={href}>
      <Container onClick={() => save()}>
        <Inner>
          <Text>{header}</Text>
          <Text style={{ color }}>{text}</Text>
        </Inner>
      </Container>
    </Hyperlink>
  );
};

export default Tab;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Inner = styled.div``;
const Text = styled.span``;
