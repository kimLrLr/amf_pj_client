const sizes = {
  largeScreen: "1920px",
  desktop: "1024px",
  tablet: "768px",
  mobile: "390px",
};

const media = {
  largeScreen: `(min-width: ${sizes.largeScreen})`,
  desktop: `(max-width: ${sizes.largeScreen}) and (min-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.desktop}) and (min-width: ${sizes.tablet})`,
  mobile: `(max-width: ${sizes.tablet}) and (min-width: ${sizes.mobile})`,
};

export default media;
