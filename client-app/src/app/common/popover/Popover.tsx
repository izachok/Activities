import React, { ReactElement, useRef, useState } from "react";

import { Overlay } from "react-bootstrap";

interface Props {
  mainComponent?: ReactElement;
  popoverComponent?: ReactElement;
}

export default function Popover({
  mainComponent,
  popoverComponent,
  ...props
}: Props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <span
        ref={target}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {mainComponent}
      </span>

      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            {popoverComponent}
          </div>
        )}
      </Overlay>
    </>
  );
}
