import React from "react";
import logo from "../../images/casino.png";
import { Wrapper } from "../wrapper/Wrapper";
const Logo = () => {
  const logos = [
    {
      id: 1,
      logo: logo,
    },
    {
      id: 2,
      logo: logo,
    },
    {
      id: 3,
      logo: logo,
    },
    {
      id: 4,
      logo: logo,
    },
    {
      id: 5,
      logo: logo,
    },
    {
      id: 6,
      logo: logo,
    },
    {
      id: 7,
      logo: logo,
    },
  ];
  return (
    <Wrapper className={"flex justify-between items-center w-full"}>
        {logos.map((item) =>(
            <img  className="w-[100px]" src={item.logo} key={item.id} alt="" />
        ))}
    </Wrapper>
  );
};

export default Logo;
