import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BannerImg } from '../ui';

//#region Style

const BannerContainer = styled.div`
  bottom: 10px;
  right: 10px;
  height: 80px;
  width: 250px;
  position: absolute;
  display: flex;
  object-fit: contain;
`;

//#endregion

export const Banner = React.memo(() => {
  const [bannerUrl, setBannerUrl] = useState<string>('');
  useEffect(() => {
    nodecg.Replicant('banner').on('change', (newVal) => {
      if (newVal == undefined) return;
      setBannerUrl(newVal);
    });
  }, []);
  if (bannerUrl == undefined || bannerUrl == '') {
    return (
      <>
        <BannerContainer></BannerContainer>
      </>
    );
  } else {
    return (
      <>
        <BannerContainer>
          <BannerImg src={bannerUrl} />
        </BannerContainer>
      </>
    );
  }
});
export default Banner;
