import React, { ReactNode } from 'react';
import Modal, { Props } from 'react-modal';
import styled from 'styled-components';

interface ModalProps extends Props {
  children: ReactNode;
}

const StyledModal = styled(Modal)`
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9000;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    @media only screen and (min-width: 750px) {
      overflow: auto;
      padding-bottom: 100px;
    }
  }

  &__content {
    outline: none;
    overflow: auto;
    height: 100%;
    @media only screen and (min-width: 750px) {
      max-width: 655px;
      margin: 2vh auto 0;
      height: initial;
    }
  }
`;

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#__next');

const DefaultModal = ({ className, ...props }: ModalProps) => (
  <StyledModal {...props} />
);

export { DefaultModal };
