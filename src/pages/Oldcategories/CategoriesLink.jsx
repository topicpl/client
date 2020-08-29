import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link as Hyperlink } from 'react-router-dom';
import { event } from 'react-ga';

const Link = ({ Icon, text, href }) => {
  const dispatch = useDispatch();

  const save = () => {
    event({ category: 'category-selection', action: 'click', href });
    dispatch({ type: 'ADD_CATEGORY', category: href });
  };

  return (
    <Hyperlink to={href}>
      <Container onClick={() => save()}>
        <Inner>
          <Icon color="#141414" size="22px" />
          <Text>{text}</Text>
        </Inner>
        <Separator className="separator" />
      </Container>
    </Hyperlink>
  );
};

export default Link;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    .separator {
      display: none;
    }
  }
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Text = styled.span`
  margin: 25px 0 25px 32px;
`;
const Separator = styled.div`
  width: 70%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 54px;
`;
