import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { event } from 'react-ga';

const Tab = ({ href, header, text, color }) => {
  const dispatch = useDispatch();

  const save = () => {
    event({ category: 'category-selection', action: 'click', href });
    dispatch({ type: 'ADD_CATEGORY', category: href });
  };

  return (
    <Link to={href}>
      <Container onClick={() => save()} style={{ backgroundColor: color }}>
        <Inner>
          <Header>{header}</Header>
          <ul>
            {text.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </Inner>
      </Container>
    </Link>
  );
};

export default Tab;

const Container = styled.div`
  width: 300px;
  height: 150px;
  color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  padding: 0 20px;

  -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
`;
const Inner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    text-align: center;
    font-size: 13px;
    font-weight: ${({ theme }) => theme.font.weight.medium};

    li {
      margin: 2px 0;
    }
  }
`;
const Header = styled.span`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;
