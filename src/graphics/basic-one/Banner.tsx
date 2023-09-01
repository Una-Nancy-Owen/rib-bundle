import React, { useEffect, useState } from 'react';
import { RunnerGroup } from 'rib-bundle';
import styled from 'styled-components';
import { BannerImg, BorderedDivElement } from '../ui';

//#region Style

const BannerContainer = styled.div`
  margin: 5px 15px;
  width: 450px;
  height: 140px;
  display: flex;
  justify-content: center;
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
