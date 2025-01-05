import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode,
}

const Portal: React.FC<PortalProps> = ({children}) => {
    return createPortal(children, document.getElementById('portal')!);
}

export default Portal;