import styled from "styled-components";

export const DashboardCard = styled.div`
  width: 18vw;
  height: 85px;
  border-radius: 10px;
  background-color: white;
`;
export const DashboardCardContent = styled.div`
  margin: 15px 20px;
`;

export const DashboardCardDiv = styled.div`
  height: 19vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background-color: #9bbec8;
`;

export const CitizenDetailsCard = styled.div`
  height: 13vh;
  width: 15vw;
  border-radius: 5px;
  background-color: white;
  margin: 4vh 0vw 0vh 1vw;
  box-shadow: 11px 10px 5px -7px rgba(0, 0, 0, 0.75);
`;
export const CitizenDetailsCountLabel = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin: 15px 10px;
`;
export const CitizenDetailsCount = styled.p`
  font-size: 26px;
  font-weight: 700;
  margin: -5% 0% 0% 18%;
`;
export const Title = styled.p`
  font-size: 18px;
  font-family: revert;
  font-weight: 600;
`;
export const BloodCollectionCard = styled.div`
  background-color: white;
  border-radius: 5px;
  position: absolute;
  top: 20;
  margin: 0% 15% 0% 8%;
  width: 34vw;
  height: 10vh;
  box-shadow: 8px 8px 6px -7px rgba(0, 0, 0, 0.75);
`;
