import React from 'react';
import styled from 'styled-components';
import { Link as Hyperlink } from 'react-router-dom';

const Link = ({ Icon, text, urlKey }) => (
  <Hyperlink to={urlKey}>
    <Container>
      <Inner>
        <Icon color="#141414" size="22px" />
        <Text>{text}</Text>
      </Inner>
      <Separator />
    </Container>
  </Hyperlink>
);

export default Link;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
