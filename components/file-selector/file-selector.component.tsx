import { Carousel } from "@mantine/carousel";
import { ActionIcon, BackgroundImage, Button, FileButton, Stack } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

type FileUploaderProps = {
  media: string[];
  limit?: number;
  onRemove: (uri: string) => void;
  onSelect: (file: File) => void;
  size?: number;
}

export function FileSelector({ media = [], limit = 5, onRemove, onSelect, size = 85 }: FileUploaderProps) {
  const limit_exceeded = media.length >= limit;
  const transformed_height = size - 10;

  return (
    <Carousel slideSize={size} height={size - 10} align="start" slideGap="xs" dragFree withControls={false}>
      {media.map((media_uri) => (
        <Carousel.Slide key={media_uri}>
          <BackgroundImage src={media_uri} radius="sm" h={transformed_height} w={transformed_height}>
            <Stack align="flex-end" justify="flex-end" h="100%" p="xs">
              <ActionIcon variant="filled" size="sm" onClick={() => onRemove(media_uri)}>
                <IconTrash />
              </ActionIcon>
            </Stack>
          </BackgroundImage>
        </Carousel.Slide>
      ))}
      <Carousel.Slide>
        <FileButton onChange={onSelect} accept="image/png,image/jpeg,image/jpg">
          {(props) => (
            <Button {...props} variant="outline" disabled={limit_exceeded} style={{ width: transformed_height, height: transformed_height }}>
              <IconPlus />
            </Button>
          )}
        </FileButton>
      </Carousel.Slide>
    </Carousel>
  )
}