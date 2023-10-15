import React, { Component } from 'react';
import styled from 'styled-components';
import leftNavigation from 'images/left-arrow.svg';
import rightNavigation from 'images/right-arrow.svg';
import PropTypes from 'prop-types';
import Slide from './Slide';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;
  height: 40px;
  margin: 0 auto;
  width: 20%;
  margin-top: 1rem;
  justify-content: space-between;
  img {
    height: 100%;
  }
`;

const DEFAULT_GO_TO_SLIDE_DELAY = 200;

function mod(a, b) {
  return ((a % b) + b) % b;
}

class Carousel extends Component {
  state = {
    index: 0,
    goToSlide: null,
    prevPropsGoToSlide: 0,
    newSlide: false,
  };

  goToIn;

  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object,
      }),
    ).isRequired,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
    animationConfig: PropTypes.object,
    goToSlideDelay: PropTypes.number,
  };

  static defaultProps = {
    offsetRadius: 2,
    animationConfig: { tension: 120, friction: 14 },
    goToSlideDelay: DEFAULT_GO_TO_SLIDE_DELAY,
  };

  static getDerivedStateFromProps(props, state) {
    const { goToSlide } = props;

    if (goToSlide !== state.prevPropsGoToSlide) {
      return { prevPropsGoToSlide: goToSlide, goToSlide, newSlide: true };
    }

    return null;
  }

  componentDidUpdate() {
    const { goToSlideDelay } = this.props;
    const { index, goToSlide, newSlide } = this.state;
    if (typeof goToSlide === 'number') {
      if (newSlide) {
        this.handleGoToSlide();
      } else if (index !== goToSlide && typeof window !== 'undefined') {
        window.clearTimeout(this.goToIn);
        this.goToIn = window.setTimeout(this.handleGoToSlide, goToSlideDelay);
      } else if (typeof window !== 'undefined') {
        window.clearTimeout(this.goToIn);
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.clearTimeout(this.goToIn);
    }
  }

  modBySlidesLength = index => mod(index, this.props.slides.length);

  moveSlide = direction => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      index: this.modBySlidesLength(this.state.index + direction),
      goToSlide: null,
    });
  };

  getShortestDirection(from, to) {
    if (from > to) {
      if (from - to > this.props.slides.length - 1 - from + to) {
        return 1;
      }
      return -1;
    }
    if (to > from) {
      if (to - from > from + this.props.slides.length - 1 - to) {
        return -1;
      }
      return 1;
    }
    return 0;
  }

  handleGoToSlide = () => {
    if (typeof this.state.goToSlide !== 'number') {
      return;
    }

    const { index } = this.state;

    const goToSlide = mod(this.state.goToSlide, this.props.slides.length);

    if (goToSlide !== index) {
      const direction = this.getShortestDirection(index, goToSlide);
      const isFinished =
        this.modBySlidesLength(index + direction) === goToSlide;

      this.setState({
        index: this.modBySlidesLength(index + direction),
        newSlide: isFinished,
        goToSlide: isFinished ? null : goToSlide,
      });
    }
  };

  clampOffsetRadius(offsetRadius) {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides() {
    const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -offsetRadius; i < 1 + offsetRadius; i += 1) {
      presentableSlides.push(slides[this.modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  }

  render() {
    const { animationConfig, offsetRadius, showNavigation } = this.props;

    let navigationButtons = null;
    if (showNavigation) {
      navigationButtons = (
        <NavigationButtons>
          <img
            aria-hidden="true"
            src={leftNavigation}
            onClick={() => this.moveSlide(-1)}
            style={{ marginRight: '2rem' }}
            alt="Navigation"
          />

          <img
            aria-hidden="true"
            src={rightNavigation}
            onClick={() => this.moveSlide(1)}
            style={{ marginLeft: '2rem' }}
            alt="Navigation"
          />
        </NavigationButtons>
      );
    }
    return (
      <React.Fragment>
        <Wrapper>
          {this.getPresentableSlides().map((slide, presentableIndex) => (
            <Slide
              key={slide.key}
              content={slide.content}
              onClick={slide.onClick}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
              animationConfig={animationConfig}
            />
          ))}
        </Wrapper>
        {navigationButtons}
      </React.Fragment>
    );
  }
}

export default Carousel;
