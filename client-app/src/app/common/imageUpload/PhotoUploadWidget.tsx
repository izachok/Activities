import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { CheckLg, XLg } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";

import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <Row xs={3}>
      <Col>
        <h5>Step 1 - Add photo</h5>
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Col>
      <Col>
        <h5>Step 2 - Resize image</h5>
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Col>
      <Col>
        <h5>Step 3 - Preview & upload</h5>
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 250, overflow: "hidden" }}
            />
            <ButtonGroup className="w-100">
              <Button variant="outline-success" onClick={onCrop}>
                {loading ? "Loading..." : <CheckLg />}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => setFiles([])}
                disabled={loading}
              >
                <XLg />
              </Button>
            </ButtonGroup>
          </>
        )}
      </Col>
    </Row>
  );
}
