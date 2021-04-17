import React from 'react';
import styled from 'styled-components';
import Portal from './Portal';
import { GrClose } from 'react-icons/gr';

interface IProps {
	children: React.ReactElement
	toggle: () => any
	on: boolean
}

const Modal: React.FC<IProps> = ({ children, toggle, on }) => {
	console.log(on);
	return (
		<Portal>
			{on && (
				<ModalWrapper on={on}>
					<div className='my-modal-card'>
						<GrClose className='close' onClick={toggle} />
						{children}
					</div>
					<div className='background' onClick={toggle} />
				</ModalWrapper>
			)}
		</Portal>
	);
};

export default Modal;

const ModalWrapper = styled.div<{ on: boolean }>`
	${({ on }) => {
		if (on) return `
		body {
			position: fixed;
			overflow: hidden;
		}`
	}}
  position: fixed;
  z-index: 11;
  top: 7vh;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
	.close {
		position: absolute;
    top: 2vh;
    right: 2vw;
		cursor: pointer;
		z-index: 1;
	}
  .my-modal-card {
    position: relative;
    background: #fff;
    // margin-top: 30%;
		padding: 2vw;
    height: fit-content;
    width: 85%;
    box-shadow: 0 9px 40px rgb(0, 0, 0, 0.5);
    border-radius: 1vw;
		display: flex;
		justify-content: center;
    z-index: 10;
  }
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
`;
