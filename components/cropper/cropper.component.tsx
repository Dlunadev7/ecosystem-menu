import { useEffect, useRef, useState } from "react";

import * as RCropper from "react-cropper";
import { IconArrowBack, IconCrop } from "@tabler/icons-react";
import { Button, Group, Stack } from "@mantine/core";

import "cropperjs/dist/cropper.css";

type CropperProps = {
  image: File;
  onFinish: (cropped_file: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export default function Cropper(props: CropperProps) {
  const { image, onFinish, onCancel, aspectRatio = 1/1 } = props;

  const [file, setFile] = useState<string | undefined>();
  const cropperRef = useRef<RCropper.ReactCropperElement>(null);

  const onRequestClose = () => {
    setFile(undefined);
    const cropper = cropperRef.current?.cropper;
    cropper?.clear();
    onCancel();
  }

  const onFinishCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const image = cropper?.getCroppedCanvas().toDataURL('jpeg') as string;
    onFinish(image);
    onRequestClose();
  };

  useEffect(() => {
    if (image) {
      const URI_FILE = URL.createObjectURL(image);
      setFile(URI_FILE);
    }
  }, [image])

  return (
    <Stack>
      <RCropper.Cropper
        ref={cropperRef}
        src={file}

        dragMode="move"
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        // background={false}
        aspectRatio={aspectRatio}
        modal={false}
        responsive

        viewMode={1}
      />
      <Group grow>
        <Button onClick={onRequestClose} variant="subtle" leftSection={<IconArrowBack />}>
          Cancelar
        </Button>
        <Button onClick={onFinishCrop} leftSection={<IconCrop />}>
          Recortar
        </Button>
      </Group>
    </Stack>
  )
}