import "cropperjs/dist/cropper.css";

import { Cropper } from "react-cropper";
import React from "react";

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({
  imagePreview,
  setCropper,
}: Props) {
  return (
    <div>
      <Cropper
        src={imagePreview}
        onInitialized={(cropper) => setCropper(cropper)}
        initialAspectRatio={1}
        aspectRatio={1}
        style={{ width: 250, height: "100%" }}
        preview=".img-preview"
        guides={false}
        viewMode={1}
        autoCropArea={1}
        background={false}
      ></Cropper>
    </div>
  );
}
