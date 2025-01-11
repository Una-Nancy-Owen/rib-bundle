import styled, { keyframes } from "styled-components"

export const RollParagraph = ((props: { p1: string, p2: string, p3: string }) => {
  return (
    <>
      <AnimParagraphFirst>{props.p1}</AnimParagraphFirst>
      <AnimParagraphSecond>{props.p2}</AnimParagraphSecond>
      <AnimParagraphThird>{props.p3}</AnimParagraphThird>
    </>)
})



const AnimFirst = keyframes`
   0% {
     transform: translateY(0px) rotate3d(1, 0, 0, 0deg);
     opacity: 1;
   }
   30% {
     transform: translateY(0px) rotate3d(1, 0, 0, 0deg);
     opacity: 1;
     animation-timing-function: ease-in-out;
   }
   33% {
     transform: translateY(-46px) rotate3d(1, 0, 0, 120deg);
     opacity: 0;
   }
   63% {
     transform: translateY(-46px) rotate3d(1, 0, 0, 120deg);
     opacity: 0;
     animation-timing-function: ease-in-out;
   }
   66% {
     transform: translateY(46px) rotate3d(1, 0, 0, -120deg);
     opacity: 0;
   }
   96% {
     transform: translateY(46px) rotate3d(1, 0, 0, -120deg);
     opacity: 0;
     animation-timing-function: ease-in-out;
   }
   100% {
     transform: translateY(0px) rotate3d(1, 0, 0, 0deg);
     opacity: 1;
   }
 `

const AnimSecond = keyframes`
   0% {
     transform: translateY(0px) rotate3d(1, 0, 0, -120deg);
     opacity: 0;
   }
   30% {
     transform: translateY(0px) rotate3d(1, 0, 0, -120deg);
     opacity: 0;
     animation-timing-function: ease-in-out;
   }
   33% {
     transform: translateY(-46px) rotate3d(1, 0, 0, 0deg);
     opacity: 1;
   }
   63% {
     transform: translateY(-46px) rotate3d(1, 0, 0, 0deg);
     opacity: 1;
     animation-timing-function: ease-in-out;
   }
   66% {
     transform: translateY(-92px) rotate3d(1, 0, 0, 120deg);
     opacity: 0;
   }
   96% {
     transform: translateY(-92px) rotate3d(1, 0, 0, 120deg);
     opacity: 0;
     animation-timing-function: ease-in-out;
   }
   100% {
     transform: translateY(-92px) rotate3d(1, 0, 0, -120deg);
     opacity: 0;
   }
 `

const AnimThird = keyframes`
   0% {
     transform: translateY(0px) rotate3d(1, 0, 0, 120deg);
     opacity: 0;
   }
   30% {
     transform: translateY(0px) rotate3d(1, 0, 0, 120deg);
     opacity: 0;
     animation-timing-function: ease-in-out;
   }
   33% {
     transform: translateY(-46px) rotate3d(1, 0, 0, -120deg);
     opacity: 0;
   }
   63% {
     transform: translateY(-46px) rotate3d(1, 0, 0, -120deg);
     opacity: 0;
     animation-timing-function: ease-in-out;
   }
   66% {
     transform: translateY(-92px) rotate3d(1, 0, 0, 0deg);
     opacity: 1;
   }
   96% {
     transform: translateY(-92px) rotate3d(1, 0, 0, 0deg);
     opacity: 1;
     animation-timing-function: ease-in-out;
   }
   100% {
     transform: translateY(-138px) rotate3d(1, 0, 0, 120deg);
     opacity: 0;
   }   
`

const AnimParagraphFirst = styled.p`
animation: 30s infinite ${AnimFirst};
text-align: center;
`

const AnimParagraphSecond = styled.p`
animation: 30s infinite ${AnimSecond};
text-align: center;
`

const AnimParagraphThird = styled.p`
animation: 30s infinite ${AnimThird};
text-align: center;
`