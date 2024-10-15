const sizes = {
  largeScreen: "1920px",
  desktop: "1024px",
  tablet: "768px",
  mobile: "390px",
};

const media = {
  // 1. 1920px 이상 (큰 화면용)
  largeScreen: `(min-width: ${sizes.largeScreen})`,
  // 2. PC 사이즈 (1024px ~ 1920px)
  desktop: `(max-width: ${sizes.largeScreen}) and (min-width: ${sizes.desktop})`,
  // 3. 태블릿 사이즈 (768px ~ 1024px)
  tablet: `(max-width: ${sizes.desktop}) and (min-width: ${sizes.tablet})`,
  // 4. 모바일 사이즈 (390px ~ 768px)
  mobile: `(max-width: ${sizes.tablet}) and (min-width: ${sizes.mobile})`,
  // 5. 390px 이하 (소형 모바일)
  smallScreen: `(max-width: ${sizes.mobile})`,
};

export default media;
