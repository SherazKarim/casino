import React from "react";
import { Wrapper } from "../wrapper/Wrapper";
import footer_logo from "../../images/footer-logo.svg";
const Footer = () => {
  return (
    <Wrapper className={""}>
      <img className="w-[130px]" src={footer_logo} alt="" />
      <div className="border-2 border-gray-400/[0.15] w-[100%] rounded-lg py-5 px-5 mt-4">
        <p className="text-[14px] text-gray-600 font-[400]">
         <span className="text-[#f0c651]">Roobet.com</span> is a brand name of Raw Entertainment B.V, Reg No 157205,
          having its registered address at Korporaalweg 10, Curacao, licensed to
          conduct online gaming operations by the Government of Curacao under
          license 8048/JAZ. Raw Entertainment Ltd, Reg No HE421735, having its
          registered address at Voukourestiou, 25, Neptune House, 1st Floor
          Flat/Office11, Zakaki, 3045, Limassol, Cyprus is a company of the
          Roobet group that acts as a paying and operational agent on behalf of
          Raw Entertainment B.V. 18+ to play.
        </p>
      </div>
    </Wrapper>
  );
};

export default Footer;
