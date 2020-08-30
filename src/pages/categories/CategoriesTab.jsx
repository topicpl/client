import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { event } from 'react-ga';

const Tab = ({ href, header, text, color, img }) => {
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

          {header === 'Live' ? null : (
            <img src={img} alt={header} class={'img img__' + href} />
          )}

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
  position: relative;

  -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Inner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .img {
    width: 130px;
    z-index: 1;
    position: absolute;

    &__art {
      width: 235px;
      top: 0;
      transform: rotate(-90deg);
      margin: -6px 0 0 -20px;
    }

    &__life {
      top: 0;
      margin: -12px 0 0 60px;
    }

    &__science {
      width: 100px;
      margin: -50px 0 0 80px;
    }

    &__sport {
      width: 130px;
      margin-left: 65px;
    }

    &__world {
      width: 150px;
      margin: -35px 0 0 45px;
    }

    &__null {
      display: none;
    }
  }

  ul {
    list-style: none;
    text-align: center;
    font-size: 13px;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    z-index: 2;

    li {
      margin: 2px 0;
    }
  }
`;
const Header = styled.span`
  z-index: 2;
  font-size: 40px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;
