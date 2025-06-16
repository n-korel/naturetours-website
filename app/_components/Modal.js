'use client';

import ReactDOM from 'react-dom';
import useClickOutside from './hooks/useClickOutside';
export default function Modal({ onClose, children }) {
	const ref = useClickOutside(onClose);

	return ReactDOM.createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
			<div ref={ref} className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
				>
					✕
				</button>
				{children}
			</div>
		</div>,
		document.body,
	);
}
